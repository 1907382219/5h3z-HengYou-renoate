import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-renovate',
    templateUrl: './renovate.component.html',
    styleUrls: ['./renovate.component.scss'],
})
export class RenovateComponent implements OnInit {

    public segmentDefaultValue: 'apply' | 'logs';

    constructor(
        private router: Router
    ) {
        this.segmentDefaultValue = this.router.url.split('/').reverse()[0] as 'apply' | 'logs';
    }

    ngOnInit() {}

    public ionChange(event) {
        this.router.navigate([`/renovate/${event.detail.value}`]);
    }

}
