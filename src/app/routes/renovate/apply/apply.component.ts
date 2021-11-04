import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-apply',
    templateUrl: './apply.component.html',
    styleUrls: ['./apply.component.scss'],
})
export class ApplyComponent implements OnInit {

    public formGroup: FormGroup = new FormGroup({
        a: new FormControl(),
        b: new FormControl(),
        c: new FormControl(),
        d: new FormControl(),
        e: new FormControl(),
        f: new FormControl()
    });

    constructor() { }

    public ngOnInit() {}

}
