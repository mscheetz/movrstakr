import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoreService } from './core.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private coreSvc: CoreService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = this.coreSvc.getCookie();

        if(jwt) {
            // req = req.clone({
            //     setHeaders: { Authorization: `Bearer ${jwt}`}
            // });
        }
        
        return next.handle(req);
    }
}