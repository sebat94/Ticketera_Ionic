import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { OkResponse } from '../../models/response';
import { Storage } from '@ionic/storage';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

    constructor(public http: HttpClient, public storage: Storage) { }

    /*-- REGISTRO USUARIO DESDE EMAL --*/
    regNormalUser(registerJSON): Observable<OkResponse>{
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.post('http://192.168.1.11:8080/auth/register', registerJSON, {headers: headers})
        .map((resp: OkResponse) => {
            if(resp.error) throw resp.errorMessage;
            return resp;
        })
        .catch((resp: HttpErrorResponse) => {
            if(resp.status === 200) {
                return Observable.throw(resp.message);
            }
            return Observable.throw(`Error al registrar el usuario, status: ${resp.status}, mensaje: ${resp.message}`);
        });
    }

    /*-- USUARIOS QUE ASISTEN A UN EVENTO EN CONCRETO -- */
    getUsersThatAssistToAnEvent(idEvent): Observable<OkResponse>{
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        
        return this.http.get(`http://192.168.1.11:8080/users/event/${idEvent}`, {headers: headers})
        .map((resp: OkResponse) => {
            if(resp.error) throw resp.errorMessage;
            return resp;
        }).catch((resp: HttpErrorResponse) => {
            if(resp.status === 200) {
                return Observable.throw(resp.message);
            }
            return Observable.throw(`Error al registrar el usuario, status: ${resp.status}, mensaje: ${resp.message}`);
        });

    }

    /*-- OBTENER DATOS DEL USUARIO LOGEADO -- */
    getDataOfUserLogged(): Observable<OkResponse>{
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        
        return this.http.get(`http://192.168.1.11:8080/users/me`, {headers: headers})
        .map((resp: OkResponse) => {
            if(resp.error) throw resp.errorMessage;
            return resp;
        }).catch((resp: HttpErrorResponse) => {
            if(resp.status === 200) {
                return Observable.throw(resp.message);
            }
            return Observable.throw(`Error al registrar el usuario, status: ${resp.status}, mensaje: ${resp.message}`);
        });

    }

    /*-- ACTUALIZAR DATOS PERFIL - CAMBIAR NOMBRE Y EMAIL -- */
    updateUsernameAndEmail(name: string, email: string): Observable<OkResponse>{
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        
        return this.http.put(`http://192.168.1.11:8080/users/me`, {name: name, email: email}, {headers: headers})
        .map((resp: OkResponse) => {
            if(resp.error) throw resp.errorMessage;
            return resp;
        }).catch((resp: HttpErrorResponse) => {
            if(resp.status === 200) {
                return Observable.throw(resp.message);
            }
            return Observable.throw(`Error al registrar el usuario, status: ${resp.status}, mensaje: ${resp.message}`);
        });

    }

    /*-- ACTUALIZAR DATOS PERFIL - CAMBIAR CONTRASEÑA -- */
    updatePassword(password: string): Observable<OkResponse>{
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        
        return this.http.put(`http://192.168.1.11:8080/users/me/password`, {password: password}, {headers: headers})
        .map((resp: OkResponse) => {
            if(resp.error) throw resp.errorMessage;
            return resp;
        }).catch((resp: HttpErrorResponse) => {
            if(resp.status === 200) {
                return Observable.throw(resp.message);
            }
            return Observable.throw(`Error al registrar el usuario, status: ${resp.status}, mensaje: ${resp.message}`);
        });

    }

    /*-- ACTUALIZAR DATOS PERFIL - CAMBIAR AVATAR -- */
    updateImage(avatar: string): Observable<OkResponse>{
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        
        return this.http.put(`http://192.168.1.11:8080/users/me/avatar`, {avatar: avatar}, {headers: headers})
        .map((resp: OkResponse) => {
            if(resp.error) throw resp.errorMessage;
            return resp;
        }).catch((resp: HttpErrorResponse) => {
            if(resp.status === 200) {
                return Observable.throw(resp.message);
            }
            return Observable.throw(`Error al registrar el usuario, status: ${resp.status}, mensaje: ${resp.message}`);
        });

    }


  }