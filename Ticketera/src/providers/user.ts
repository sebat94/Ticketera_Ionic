import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
// RXJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
// MODELS
import { IUserLogged, IBasicResponse } from '../models/response';
import { IUser } from '../models/user';
// CONSTANTS
import { SERVER } from '../constants/constants';
// STORAGE
import { Storage } from '@ionic/storage';


@Injectable()
export class UserProvider {

    constructor(public http: HttpClient, public storage: Storage) { }

    ///////////////////// FALTA RECOGER VALIDACIONES BACKEND PARA MANDARLAS AL ALERT
    /*-- REGISTRO USUARIO NORMAL --*/
    regNormalUser(registerJSON): Observable<string>{
        return this.http.post(`${SERVER}user/register`, registerJSON)
        .map((resp: IBasicResponse) => {
            if(resp.code !== 200) throw resp.message;
            return;
        })
        .catch((resp: IBasicResponse) =>  Observable.throw(resp));
    }
    /*-- REGISTRO USUARIO RRPP --*/
    regRrppUser(registerJSON): Observable<string>{
        return this.http.post(`${SERVER}user/registerRRPP`, registerJSON)
        .map((resp: IBasicResponse) => {
            if(resp.code !== 200) throw resp.message;
            return;
        })
        .catch((resp: IBasicResponse) => Observable.throw(resp));
    }
    /*-- REGISTRO USUARIO PROMOTOR --*/
    regPromotorUser(registerJSON): Observable<string>{
        return this.http.post(`${SERVER}user/registerPromotor`, registerJSON)
        .map((resp: IBasicResponse) => {
            if(resp.code !== 200) throw resp.message;
            return;
        })
        .catch((resp: IBasicResponse) => Observable.throw(resp))
    }
    /*-- OBTENER DATOS DEL USUARIO LOGEADO -- */
    getDataOfUserLogged(): Observable<IUser>{
        return this.http.get(`${SERVER}user/me`)
        .map((resp: IUserLogged) => {
            if(resp.code !== 200) throw resp.message;
            return resp.user;
        }).catch((resp: IUserLogged) => Observable.throw(resp.message));
    }
    /*-- ACTUALIZAR DATOS PERSONALES --*/
    updateDataOfUserLogged(user): Observable<IUser>{
        return this.http.put(`${SERVER}user/update`, user)
        .map((resp: IUserLogged) => {
            if(resp.code !== 200) throw resp.message;
            return resp.user;
        }).catch((resp: IUserLogged) => Observable.throw(resp.message));
    }

  }