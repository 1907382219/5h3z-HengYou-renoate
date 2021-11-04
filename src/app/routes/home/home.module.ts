import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SwiperModule } from 'ngx-swiper-wrapper';



@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        SharedModule,
        SwiperModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomeComponent
            }
        ])
    ]
})
export class HomeModule { }
