import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SwiperOptions } from 'swiper';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {

    constructor(
        public modalController: ModalController
    ) { }

    public config: SwiperOptions = {
        direction: 'horizontal'
    };

    @Input()
    public data: string[] = [];

    @Input()
    public activeIndex: number;
}
