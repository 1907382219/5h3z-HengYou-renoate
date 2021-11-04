import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { RenovateDetailComponent } from './renovate-detail.component';
import { VideoModule } from '@shared/components/video/video.module';



@NgModule({
    declarations: [
        RenovateDetailComponent
    ],
    imports: [
        SharedModule,
        VideoModule,
        RouterModule.forChild([
            {
                path: '',
                component: RenovateDetailComponent
            }
        ])
    ]
})
export class RenovateDetailModule { }
