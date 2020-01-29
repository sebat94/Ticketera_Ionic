import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { Storage } from '@ionic/storage';

// MODELS
import { OkResponse } from '../../models/response';

@Injectable()
export class AuthProvider {

    constructor(public http: HttpClient, public storage: Storage) { }

    login(email: string, password: string): Observable<{}> {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.post('http://192.168.1.11:8080/auth/login', { email: email, password: password }, { headers: headers })
            .catch((response: HttpErrorResponse) => {
                if (response.status == 200) return Observable.throw(response.message);
                else
                  return Observable.throw( `Unknown error: ${response.statusText} (${response.status})`);
            })
            .flatMap((json: OkResponse) => {
                if (json.error) throw json.errorMessage;
                return Observable.fromPromise(this.storage.set('token', json.result.token));
            });
    }

    isLogged(): Observable<boolean> {
        return Observable.fromPromise(this.storage.get('token'))
            .flatMap(token => {
                if (!token) return Observable.of(false);
                return this.http.get('http://192.168.1.11:8080/auth/token')
                    .map((response: { error: boolean }) => (response.error ? false : true))
                    .catch(error => Observable.of(false));
                })
                .catch(error => {
                    return Observable.of(false);
                });
    }

    logout() {
        this.storage.clear();
    }

}
