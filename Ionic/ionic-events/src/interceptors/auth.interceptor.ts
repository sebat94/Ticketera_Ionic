import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: Storage) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return Observable.fromPromise(this.storage.get('token')).switchMap(token => {
            if (token) {
                // Clone the request to add the new header.
                const authReq = req.clone({
                    headers: req.headers.set('Authorization', token) // 'Bearer ' + 
                });
                // Pass on the cloned request instead of the original request.
                return next.handle(authReq);
            }
            return next.handle(req);
        });
    }
}
