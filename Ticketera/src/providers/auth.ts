import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import { HttpErrorResponse } from '@angular/common/http/src/response';
// STORAGE
import { Storage } from '@ionic/storage';
// CONSTANTS
import { SERVER } from '../constants/constants';
// MODELS
import { OkResponseLogin } from '../models/response';
import { IUser } from '../models/user';


@Injectable()
export class AuthProvider {

    constructor(public http: HttpClient, public storage: Storage) { }

    login(user: IUser): Observable<{}> {
        return this.http.post(`${SERVER}user/login`, user)
            .flatMap((resp: OkResponseLogin) => {
                if(resp.code !== 200) throw 'Bad credentials';
                delete resp.code;
                return Observable.fromPromise(this.storage.set('dataUserLogged', resp));
            })
            .catch((response: HttpErrorResponse) => {
                if (response.status == 200) return Observable.throw(response.message);
                else
                    return Observable.throw('Bad credentials');
            })
    }

    // FALTA!!!
    isLogged(): Observable<boolean> {
        return Observable.fromPromise(this.storage.get('token'))
            .flatMap(token => {
                if (!token) return Observable.of(false);
                return this.http.get(`${SERVER}auth/token`)
                    .map((response: { ok: boolean }) => (response.ok ? true : false))
                    .catch(error => Observable.of(false));
                })
                .catch(error => {
                    return Observable.of(false);
                });
    }

}
