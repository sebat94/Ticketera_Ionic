import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// STORAGE
import { Storage } from '@ionic/storage';
// CONSTANTS
import { SERVER, IMAGES_EVENT_DIRECTORY } from '../constants/constants';
// MODELS
import { OkResponseEvent, IEventWithImages, IFiltersResponse } from '../models/response';
// RXJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class EventProvider {

    constructor(public http: HttpClient,
                public storage: Storage) { }

    // OBTENEMOS TODOS LOS EVENTOS
    getAllEvents(): Observable<IEventWithImages[]> {
        return this.http.get(`${SERVER}event`)
        .map((resp: OkResponseEvent) => {
            if(resp.code !== 200) throw 'Error al listar los eventos';
            return resp.eventsWithImages;
        })
        .catch(error =>  Observable.throw(`Error al listar los eventos`));
    }
    // OBTENEMOS EVENTO POR 'ID'
    getEvent(idEvent): Observable<any> {
        return this.http.get(`${SERVER}event/${idEvent}`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al rescatar el evento';
            return resp.eventFull;
        })
        .catch(error =>  Observable.throw(`Error al listar los eventos`));
    }
    // OBTIENE EVENTOS CON LIMIT & OFFSET Y ADEMÁS CON OPCIONALES VALIDACIONES DE FECHA Y PRECIO
    getEventsByPageableAndOptionalFiltered(amount: number, from: number, filters: IFiltersResponse): Observable<any> {
        return this.http.post(`${SERVER}event/pageable/${amount}/${from}`, filters)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al rescatar los eventos';
            // AÑADIMOS LA CDN A LAS IMÁGENES
            console.log(JSON.stringify(resp));
            resp.eventsFull.forEach((eachEventFull, i) => eachEventFull.eventImages.forEach((element, j) =>  resp.eventsFull[i].eventImages[j].image = IMAGES_EVENT_DIRECTORY + element.image.split('.')[0]));
            return resp.eventsFull;
        })
        .catch(error =>  Observable.throw(`CATCH Error al listar los eventos: ${error}`));
    }
    // OBTIENE TODOS LOS EVENTOS DE UN BUILDING ESPECÍFICO POR 'ID'
    getEventsToSellByBuilding(idBuilding: number): Observable<any> {
        return this.http.get(`${SERVER}rrppbuilding/getBuildingsEvents/${idBuilding}`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al rescatar los eventos del building';
            resp.eventsFull.forEach((eachEventFull, i) => eachEventFull.eventImages.forEach((element, j) =>  resp.eventsFull[i].eventImages[j].image = IMAGES_EVENT_DIRECTORY + element.image.split('.')[0]));
            return resp.eventsFull;
        })
        .catch(error =>  Observable.throw(`CATCH: Error al listar los eventos`));
    }
    // OBTIENE TODOS LOS EVENTOS DE TODOS LOS BUILDINGS CREADOS POR UN PROMOTOR
    getEventsOfAllMyBuildings(): Observable<any> {
        return this.http.get(`${SERVER}event/getAllEventsPromotor`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al rescatar todos los eventos del promotor';
            return resp.events;
        })
        .catch(error =>  Observable.throw(`Error al listar todos los eventos del promotor`));
    }
    // CREAR EVENTO DE UN BUILDING POR PROMOTOR
    createEvent(newEvent: any): Observable<any> {
        return this.http.post(`${SERVER}event`, newEvent)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al crear el evento';
            return resp.events;
        })
        .catch(error =>  Observable.throw(`CATCH: Error al crear el evento`));
    }
    // OBTIENE TODOS LOS EVENTOS DEL BUILDING POR PROMOTOR
    getAllEventsOfBuildingByPromotor(idBuilding: number): Observable<any> {
        return this.http.get(`${SERVER}event/getEventsByBuilding/${idBuilding}`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al rescatar los eventos del building';
            return resp.events;
        })
        .catch(error =>  Observable.throw(`CATCH: Error al listar los eventos`));
    }
}
