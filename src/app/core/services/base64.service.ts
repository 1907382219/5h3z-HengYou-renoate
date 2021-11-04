import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class Base64Service {

    constructor() { }

    public to(data: File): Promise<ProgressEvent<FileReader>> {
        const reader = new FileReader()
        reader.readAsDataURL(data);
        return fromEvent(reader, 'load').pipe(first()).toPromise() as Promise<ProgressEvent<FileReader>>;
        // reader.onload = (readerEvent: any) => {
        //     if (inFileList) {
        //         this.toastController.create({
        //             message: '文件已存在',
        //             position: 'bottom',
        //             color: 'dark',
        //             duration: 1500
        //         }).then(toast => {
        //             toast.present();
        //         });
        //         return;
        //     }
            // const file = {
            //     name: event.target.files[0].name,
            //     buffer: readerEvent.target.result,
            //     progress: '0%',
            //     url: ''
            // };
            // this.uploadedFileList.push(file);
            // this.request.post(
            //     this.path || API_CONFIG.uploadFile,
            //     {
            //         file: event.target.files[0]
            //     },
            //     {
            //         reportProgress: true,
            //         observe: 'events'
            //     }
            // ).subscribe(
            //     (res: HttpResponse<UploadFileResult> | UploadFileReport) => {
            //         if (res instanceof HttpResponse) {
            //             this.uploadedFileList[this.uploadedFileList.length - 1].id = res.body.id;
            //             this.uploadedFileList[this.uploadedFileList.length - 1].url = res.body[this.urlField];
            //             this.uploadedFileList[this.uploadedFileList.length - 1].progress = '100%';
            //             loading.dismiss();
            //             this.emitData();
            //         } else {
            //             const rate = (res.loaded / res.total * 100).toFixed(0)
            //             this.uploadedFileList[this.uploadedFileList.length - 1].progress = `${rate}%`;
            //         }
            //     }
            // );
        // };
    }
    
}