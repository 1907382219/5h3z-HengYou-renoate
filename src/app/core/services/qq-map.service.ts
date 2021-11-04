import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { API_CONFIG } from '@shared/api';
import { QQMapResponseOpt, QQMapIpOpts, QQMapLocationOpts } from '@shared/interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class QQMapService {

    constructor(
        private http: HttpClient
    ) { }

    private ip: QQMapResponseOpt<QQMapIpOpts>;
    
    private location: QQMapResponseOpt<QQMapLocationOpts>;
    
    public async getIp(): Promise<QQMapResponseOpt<QQMapIpOpts>> {
        return this.ip || this.http.jsonp<QQMapResponseOpt<QQMapIpOpts>>(
            API_CONFIG.getIpByQQMap(environment.qqMapKey),
            'callback'
        )
        .pipe(
            tap(result => this.ip = result.status === 0 ? result : undefined)
        )
        .toPromise();
    }

    public getLocation(location: QQMapIpOpts['location']) {
        return this.location || this.http.jsonp<QQMapResponseOpt<QQMapLocationOpts>>(
            API_CONFIG.getLocationByQQMap(
                environment.qqMapKey,
                location
            ),
            'callback'
        )
        .pipe(
            tap(result => this.location = result.status === 0 ? result : undefined)
        )
        .toPromise()
    }
    
}