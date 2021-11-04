import { Component, OnInit } from '@angular/core';
import { SwiperConfig } from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    public swiperConfig: SwiperConfig = {
        direction: 'horizontal',
        autoHeight: true,
        assign: () => {}
    };

    constructor() { }

    ngOnInit() {}

}
