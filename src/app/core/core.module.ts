import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule,
        IonicModule.forRoot()
    ],
    exports: [
        BrowserModule,
        HttpClientModule,
        IonicModule,
        HttpClientJsonpModule
    ]
})
export class CoreModule {

    constructor(
        @SkipSelf()
        @Optional()
        parent: CoreModule
    ) {
        if (!!parent) {
            throw new Error('CoreModule被重复导入！');
        }
    }

}
