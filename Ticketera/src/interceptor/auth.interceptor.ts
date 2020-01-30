import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
// RXJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
// STORAGE
import { Storage } from '@ionic/storage';
// MODELS
import { OkResponseLogin } from '../models/response';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: Storage) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return Observable.fromPromise(this.storage.get('dataUserLogged')).switchMap((dataUserLogged: OkResponseLogin) => {
            if (dataUserLogged) {
                // Clone the request to add the new header.
                const authReq = req.clone({
                    headers: req.headers.set('Authorization', 'Bearer ' + dataUserLogged.authtoken)
                });
                // Pass on the cloned request instead of the original request.
                return next.handle(authReq);
            }
            return next.handle(req);
        });
    }
}
