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
export class StatisticsProvider {

    constructor(public http: HttpClient,
                public storage: Storage) { }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /*-- OBTENEMOS LAS VENTAS POR DÍAS DE TODOS LOS EVENTOS O UNO EN CONCRETO POR RRPP --*/
    getSellsByDayAndOptionalEvent(idEvent: number, days: number): Observable<any> {
        return this.http.get(`${SERVER}rrppbuilding/sts/getsellsbydaysandoptionalevent/${idEvent}/${days}`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al obtener las estadisticas del RRPP';
            return resp.sellsDates.sellsDate;
        })
        .catch(error =>  Observable.throw(`Error al obtener las estadisticas del RRPP`));
    }
    /*-- OBTENERMOS LAS VENTAS POR DÍAS DE DE UN BUILDING POR PROMOTOR --*/
    getSellsByBuildingAndDays(days: number, idBuilding?: number): Observable<any> {
        return this.http.post(`${SERVER}promotor/sts/getSellsByDate`, (idBuilding) ? {days: days, idBuilding: idBuilding} : {days: days})
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al obtener las estadisticas del PROMOTOR';
            return resp.sellsDates.sellsDate;
        })
        .catch(error =>  Observable.throw(`Error al obtener las estadisticas del PROMOTOR`));
    }
    /*-- OBTENEMOS LAS VENTAS DE TODOS LOS EVENTOS DE UN PROMOTOR --*/
    getSellsdByEvents(): Observable<any> {
        return this.http.get(`${SERVER}promotor/sts/getSelldByEvents`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al obtener las estadisticas del PROMOTOR';
            return resp.sellsByEvent;
        })
        .catch(error =>  Observable.throw(`Error al obtener las estadisticas del PROMOTOR`));
    }
    /*-- OBTENEMOS ESTADÍSTICAS POR EVENTO DE: GÉNERO, TIPO DE TICKET, VENTAS POR RRPP VS PLATAFORMA, y VENTAS POR FECHA --*/
    getFullEvent(idEvent: number): Observable<any> {
        return this.http.get(`${SERVER}promotor/sts/stsgetfullevent/${idEvent}`)
        .map((resp: any) => {
            if(resp.code !== 200 && resp.code !== 0) throw 'Error al obtener las estadisticas del evento por PROMOTOR';
            delete resp.code;
            return resp;
        })
        .catch(error =>  Observable.throw(`Error al obtener las estadisticas del evento por PROMOTOR`));
    }
    /*-- OBTENER VENTAS POR DÍA Y EVENTO --*/
    getsellsbydaysandoptionalevent(idEvent: number, days: number): Observable<any> {
        return this.http.get(`${SERVER}rrppbuilding/sts/getsellsbydaysandoptionalevent/${idEvent}/${days}`)
        .map((resp: any) => {
            console.log("OK: ", JSON.stringify(resp));
            if(resp.code !== 200) throw 'Error al obtener las ventas generales de todos los eventos del RRPP';
            return resp.sellsDates.sellsDate;
        })
        .catch(error =>  Observable.throw(`CATCH: Error al obtener las ventas generales de todos los eventos del RRPP`));
    }

}
