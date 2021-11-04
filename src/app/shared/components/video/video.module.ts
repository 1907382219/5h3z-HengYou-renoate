import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { VideoComponent } from './video.component';



@NgModule({
    declarations: [
        VideoComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        VideoComponent
    ]
})
export class VideoModule { }
