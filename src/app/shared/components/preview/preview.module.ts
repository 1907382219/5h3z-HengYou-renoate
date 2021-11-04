import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { PreviewComponent } from './preview.component';



@NgModule({
    declarations: [
        PreviewComponent
    ],
    imports: [
        CommonModule,
        SwiperModule
    ]
})
export class PreviewModule { }
