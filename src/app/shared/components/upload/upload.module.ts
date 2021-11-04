import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PreviewModule } from '../preview/preview.module';
import { UploadComponent } from './upload.component';



@NgModule({
    declarations: [
        UploadComponent
    ],
    imports: [
        SharedModule,
        PreviewModule
    ],
    exports: [
        UploadComponent
    ]
})
export class UploadModule { }
