import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem(environment.tokenStorageKey);
        if (req.url.endsWith('/login')) {
            return next.handle(req);
        }
        return next.handle(
            req.clone({
                params: req.params.append('token', token)
            })
        );
    }
}
