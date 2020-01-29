import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// MODELS
import { IEvent } from '../../models/event';
import { ResponseEvents, OkResponse } from '../../models/response';


@Injectable()
export class EventProvider {

    constructor(public http: HttpClient) { }

    /*-- OBTENEMOS TODOS LOS EVENTOS --*/
    getAllEvents(): Observable<IEvent[]> {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.get(`http://192.168.1.11:8080/events`, {headers: headers})
        .map((resp: ResponseEvents) => {
            if(resp.error) throw resp.errorMessage;
            return resp;
        })
        .catch((resp: HttpErrorResponse) => {
            if (resp.status === 200) {
                return Observable.throw(resp.message);
            }
            return Observable.throw(`Error al obtener los eventos, status: ${resp.status}, mensaje: ${resp.message}`);
        });
    }

    /*-- CREAMOS UN EVENTO --*/
    addEvent(newEvent): Observable<OkResponse> {
        
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.post(`http://192.168.1.11:8080/events`, newEvent, {headers: headers})
        .map((resp: ResponseEvents) => {
            return resp;
        })
        .catch((resp: HttpErrorResponse) => {
            if (resp.status === 200) {
                return Observable.throw(resp.message);
            }
            return Observable.throw(`Error al obtener los eventos, status: ${resp.status}, mensaje: ${resp.message}`);
        });
    }

    /*-- OBTENEMOS TODOS MIS EVENTOS CREADOS --*/
    getEventsOfUserById(idUser): Observable<IEvent[]> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.get(`http://192.168.1.11:8080/events/user/${idUser}`, {headers: headers})
        .map((resp: OkResponse) => {
            if(resp.error) throw resp.errorMessage;
            return resp;
        })
        .catch((resp: HttpErrorResponse) => {
            if (resp.status === 200) {
                return Observable.throw(resp.message);
            }
            return Observable.throw(`Error al obtener los eventos, status: ${resp.status}, mensaje: ${resp.message}`);
        });
    }

    /*-- OBTENEMOS TODOS LOS EVENTOS A LOS QUE VOY A ASISTIR --*/
    getEventsToAssistByUserLogged(): Observable<IEvent[]> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.get(`http://192.168.1.11:8080/events/attend`, {headers: headers})
        .map((resp: any) => {
            if(resp.error) throw resp.errorMessage;
            return resp.result.events;
        })
        .catch((resp: HttpErrorResponse) => {
            if (resp.status === 200) {
                return Observable.throw(resp.message);
            }
            return Observable.throw(`Error al obtener los eventos, status: ${resp.status}, mensaje: ${resp.message}`);
        });
    }


}