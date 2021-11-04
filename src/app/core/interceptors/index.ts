import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthenticationInterceptor } from './authentication';
import { CompanyInterceptor } from './company';
import { ResponseInterceptor } from './response';

export const CRMInterceptors: Provider[] = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: CompanyInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ResponseInterceptor,
        multi: true
    }
];
