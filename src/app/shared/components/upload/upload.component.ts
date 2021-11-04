import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CustomFileOpts, UploadService } from '@core/services/upload.service';
import { ModalController } from '@ionic/angular';
import { PreviewComponent } from '../preview/preview.component';

type FileItemOpt = CustomFileOpts & {
    progress?: number;
};

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

    constructor(
        private uploadService: UploadService,
        private modalController: ModalController
    ) {}

    @Input()
    private multiple: boolean = true;

    @Input()
    private accept: string;

    @Input()
    public disabled: boolean | any;

    @Input()
    public set fileList(value: any[]) {
        if (this.fileList !== undefined || !Array.isArray(value)) {
            this.data = [];
            return;
        }
        this.data = [];
        value.forEach((item, index) => {
            this.data[index] = {
                status: 'success',
                response: item.response || item,
                uid: item.uid || new Date().getTime(),
            };
            item.response = item.response || item;
            item.uid = item.uid || new Date().getTime()
        });
    };

    @Input()
    public type: 'pictures' | 'files' = 'pictures';

    @Output()
    public onChange: EventEmitter<[FileItemOpt, FileItemOpt[], 'remove' | 'append']> = new EventEmitter();

    public data: FileItemOpt[];

    public remove(uid: string | number) {
        const index = this.data.findIndex(item => item.uid == uid);
        const [data] = this.data.splice(index, 1);
        this.onChange.next([data, this.data, 'remove']);
    }

    public async upload(): Promise<void> {
        const files = await this.uploadService.present({
            multiple: this.multiple,
            accept: this.accept
        });
        if (this.data === undefined) {
            this.data = [];
        }
        this.data.push(...files);
        this.uploadService.upload(files)
        .subscribe(result => {
            const data = this.data.find(item => item.uid === result.uid);
            if (result?.total) {
                data.progress = result.loaded / result.total;
            } else {
                data.progress = undefined;
                this.onChange.next([data, this.data, 'append']);
            }
        });
    }

    public async preview(activeIndex: number): Promise<void> {
        (await this.modalController.create({
            component: PreviewComponent,
            swipeToClose: true,
            componentProps: {
                data: this.data.map(item => item.response.url),
                activeIndex
            }
        })).present();
    }

}
