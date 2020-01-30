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
export class CityProvider {

    constructor(public http: HttpClient, public storage: Storage) { }

    /*-- OBTENEMOS TODAS LAS CIUDADES --*/
    getAllCities(): Observable<any>{
        return this.http.get(`${SERVER}city`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al obtener las cities';
            return resp.cities;
        })
        .catch((resp) =>  Observable.throw(resp));
    }

  }