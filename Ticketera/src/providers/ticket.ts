import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// STORAGE
import { Storage } from '@ionic/storage';
// CONSTANTS
import { SERVER } from '../constants/constants';
// MODELS
import { ResponseTypeTickets, IBasicResponse } from '../models/response';
import { ITypeTicket } from '../models/type_ticket';
// RXJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class TicketProvider {

    constructor(public http: HttpClient,
                public storage: Storage) { }

    // COMPRAR UN TYPETICKET DESDE LA WEB CON UN USUARIO LOGEADO
    buyTypeTicketOfEvent(typeticket: number): Observable<string> {
        return this.http.post(`${SERVER}ticket`, {typeticket})
        .map((resp: IBasicResponse) => {
            if(resp.code !== 200) throw resp.message;
            return resp.message;
        }).catch(error => {
            return Observable.throw(`Error al comprar el ticket de un evento | ${error}`);
        });
    }
    // OBTIENE TODOS LOS EVENTOS DE TODOS LOS BUILDINGS EN LOS QUE ESTÉ DADO DE ALTA EL RRPP LOGEADO
    getTicketsToSellByRrpp(): Observable<any> {
        return this.http.get(`${SERVER}rrppbuilding/getEvents`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al obtener los eventos';
            return resp.eventsFull;
        }).catch(error => {
            return Observable.throw(`Error al obtener los tickets que puede vender el RRPP | ${error}`);
        });
    }
    // UN RRPP PUEDE VENDER UN TYPETICKET A UN USUARIO [NO REGISTRADO / REGISTRADO]       (data => typeticket, dni, userBuyer)
    sellTicketByRrpp(data): Observable<string> {
        return this.http.post(`${SERVER}rrppbuilding/sellTicket`, data)
        .map((resp: IBasicResponse) => {
            if(resp.code !== 200) throw resp.message;
            return resp.message;
        }).catch(error => {
            return Observable.throw(`Error al vender un RRPP un ticket | ${error}`);
        });
    }
    // OBTIENE LOS TICKETS COMPRADOS DEL USUARIO LOGEADO
    getMyTickets(): Observable<any> {
        return this.http.get(`${SERVER}ticket`)
        .map((resp: any) => {
            if(resp.code !== 200) throw resp.message;
            return resp.tickets;
        }).catch(error => {
            return Observable.throw(`Error al obtener los ticket | ${error}`);
        });
    }
    // OBTIENE EL QR DEL 'ID' DEL TICKET
    getTicketQR(idTicket: number): Observable<any> {
        return this.http.get(`${SERVER}ticket/${idTicket}/image/json`)
        .map((resp: any) =>  {
            if(resp.code !== 200) throw 'No se ha podido obtener el QR';
            return resp.qr;
        })
        .catch(error => Observable.throw(`Error al obtener el QR | ${JSON.stringify(error)}`));
    }
    // VALIDAMOS QR
    validateQR(idTicket: number, idEvent: number): Observable<any> {
        return this.http.get(`${SERVER}ticket/${idTicket}/${idEvent}`)
        .map((resp: any) =>  {
            if(resp.code !== 200) throw 'No se ha podido obtener el QR';
            return resp.ticket;
        })
        .catch(error => Observable.throw(`Error al validar el QR | ${JSON.stringify(error)}`));
    }
    // CREAMOS TIPO DE TICKET
    createTypeTicket(typeticket: any): Observable<any> {
        return this.http.post(`${SERVER}typeticket`, typeticket)
        .map((resp: any) =>  {
            if(resp.code !== 200) throw 'No se ha podido crear el tipo de ticket';
            return resp.message;
        })
        .catch(error => Observable.throw(`No se ha podido crear el tipo de ticket | ${JSON.stringify(error)}`));
    }

}
