import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-renovate-detail',
    templateUrl: './renovate-detail.component.html',
    styleUrls: ['./renovate-detail.component.scss'],
})
export class RenovateDetailComponent implements OnInit {

    public type: '1' | '2' | '3';

    constructor(
        private active: ActivatedRoute
    ) {}

    async ngOnInit(): Promise<void> {
        const queryMap = await this.active.queryParamMap.pipe(first()).toPromise();
        this.type = queryMap.get('type') as '1' | '2' | '3';
    }

}
