import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ResponseOpt } from '@shared/interfaces';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { API_CONFIG } from '@shared/api';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    constructor(
        private alertController: AlertController,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url === API_CONFIG.upload) {
            return next.handle(req);
        }
        return next.handle(req)
            .pipe(
                filter(response => response instanceof HttpResponse),
                filter((response: HttpResponse<ResponseOpt>) => {
                    if (response.body.status !== 1) {
                        this.errorHandler(response.body);
                    }
                    return response.body.status === 1;
                })
            );
    }

    private async errorHandler(body: ResponseOpt) {
        const alert = await this.alertController.create({
            header: '提示',
            message: body.info,
            buttons: ['确认']
        });
        alert.present();
        if (body.status === -1 && body.info.startsWith('token')) {
            await alert.onWillDismiss();
            this.router.navigate(['/login']);
        }
    }
}
