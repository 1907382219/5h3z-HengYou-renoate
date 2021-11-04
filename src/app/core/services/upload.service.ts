import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpEvent, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_CONFIG } from '@shared/api';
import { fromEvent, Observable } from 'rxjs';
import { Base64Service } from './base64.service';

type HttpResponseType = HttpResponse<{ data: any }>;

interface InputEleOpts {
    accept?: string;
    multiple?: boolean;
}

export interface UploadProgressType {
    loaded?: number;
    total?: number;
    type?: 1 | 2 | 3;
}

export interface CustomFileOpts {
    uid: number;
    status: 'waiting' | 'uploading' | 'success';
    file?: File;
    buffer?: string | ArrayBuffer;
    response?: any;
}

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(
        private http: HttpClient,
        private base64Service: Base64Service,
        @Inject(DOCUMENT) private document: Document
    ) { }

    public present(config?: InputEleOpts): Promise<CustomFileOpts[]> {
        return new Promise((resolve, reject) => {
            const ele: HTMLInputElement = this.document.createElement('input');
            ele.type = 'file';
            ele.multiple = config?.multiple || false;
            ele.accept = config?.accept || '';
            this.document.body.appendChild(ele);
            ele.click();
            fromEvent(ele, 'change').subscribe(async (event: Event) => {
                const result: CustomFileOpts[] = [];
                for (const file of (event.target as any).files) {
                    const readerEvent = await this.base64Service.to(file);
                    result[result.length] = {
                        uid: parseInt(Math.random() * new Date().getTime() + '', 10),
                        status: 'waiting',
                        file,
                        buffer: readerEvent.target.result
                    };
                }
                resolve(result);
                this.document.body.removeChild(ele);
            })
        });
    }

    public upload(
        files: CustomFileOpts[]
    ): Observable<UploadProgressType & CustomFileOpts> {
        return new Observable(observe => {
            files.forEach(item => {
                if (item.status === 'success') {
                    return;
                }
                const formdata = new FormData();
                formdata.set('file', item.file);
                this.http.post(
                    API_CONFIG.upload,
                    formdata,
                    {
                        observe: 'events',
                        reportProgress: true
                    }
                )
                .subscribe((response: HttpProgressEvent | HttpResponseType) => {
                    if (response instanceof HttpResponse) {
                        item.status = 'success';
                        item.response = (<HttpResponseType>response).body.data;
                        observe.next(item);
                        if (files.every(({ status }) => status === 'success')) {
                            observe.complete();
                        }
                    } else if (response.type === 1) {
                        observe.next({
                            ...response,
                            uid: item.uid,
                            file: item.file,
                            status: 'uploading'
                        });
                    }
                });
            });
        });
    }
}
