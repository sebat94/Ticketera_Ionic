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
export class BuildingProvider {

    constructor(public http: HttpClient,
                public storage: Storage) { }

    // OBTIENE TODOS LOS BUILDINGS
    getAllBuildings() : Observable<any> {
        return this.http.get(`${SERVER}rrppbuilding/Buildings/all`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al listar los buildings';
            resp.buildings.forEach((eachBuilding, i) => { if(resp.buildings[i].image) resp.buildings[i].image = IMAGES_EVENT_DIRECTORY + eachBuilding.image.split('.')[0] });
            delete resp.code;
            return resp;
        })
        .catch(error =>  Observable.throw(`CATCH: Error al listar los buildings`));
    }
    // OBTIENE LOS BUILDINGS DEL RRPP LOGEADO
    getAllBuildingsOfRrppLogged(): Observable<any> {
        return this.http.get(`${SERVER}rrppbuilding/Buildings`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al rescatar los eventos del building';
            resp.buildings.forEach((eachBuilding, i) => { if(resp.buildings[i].image) resp.buildings[i].image = IMAGES_EVENT_DIRECTORY + eachBuilding.image.split('.')[0] });
            return resp.buildings;
        })
        .catch(error =>  Observable.throw(`Error al listar los eventos`));
    }
    // UN RRPP SOLICITA SER RRPP DE UN BUILDING
    sendRrppRequestToBuilding(idBuilding: number): Observable<any> {
        return this.http.post(`${SERVER}rrppbuilding`, {building: idBuilding})
        .map((resp: any) => {
            if(resp.code !== 200) throw resp.message;
            return resp.message;
        })
        .catch(error =>  Observable.throw(`Error al solicitar ser rrpp de un building`));
    }
    // OBTENER TODOS LOS BUILDINGS DEL PROMOTOR LOGEADO
    getAllBuildingsOfPromotorLogged(): Observable<any> {
        return this.http.get(`${SERVER}rrppbuilding/Buildings/Promotor`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al rescatar los buildings del promotor';
            resp.buildings.forEach((eachBuilding, i) => (eachBuilding.image !== null) ? resp.buildings[i].image = IMAGES_EVENT_DIRECTORY + eachBuilding.image.split('.')[0] : resp.buildings[i].image = 'assets/imgs/profiles/dog.png');// console.log("eachBuilding: ", JSON.stringify(eachBuilding), ", i: ", i)
            return resp.buildings;
        })
        .catch(error =>  Observable.throw(`Error al listar los buildings del promotor`));
    }
    // OBTENER TODOS LOS EVENTOS DE UN BUILDING POR RRPP LOGEADO            -----------------------------
    getAllEventsOfBuildingByRrpp(idBuilding: number): Observable<any> {
        return this.http.get(`${SERVER}rrppbuilding/getBuildingsEvents/${idBuilding}`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al rescatar los buildings del promotor';
            resp.buildings.forEach((eachBuilding, i) => resp.buildings[i].image = IMAGES_EVENT_DIRECTORY + eachBuilding.image.split('.')[0]);
            return resp.buildings;
        })
        .catch(error =>  Observable.throw(`Error al listar los buildings del promotor`));
    }
    // CREAR BUILDING DE UNA COMPANY POR PROMOTOR LOGEADO
    createBuildingOfCompanyByPromotor(building: any): Observable<any> {
        return this.http.post(`${SERVER}building/addBuilding`, building)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al crear el building de la company';
            return resp.message;
        })
        .catch(error =>  Observable.throw(`Error al crear el building de la company`));
    }
    // OBTENER LA LIQUIDACIÓN DE CADA EVENTO VENDIDO POR RRPP LOGEADO
    getLiquidationOfRrpp(idBuilding: number, idUser: number): Observable<any> {
        return this.http.get(`${SERVER}rrppbuilding/soldTicketsByBuildingAndRrpp/${idBuilding}/${idUser}`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al obtener las ventas de cada entrada por RRPP';
            return resp.eventTicketsSoldByTypeticketRrpp;
        })
        .catch(error =>  Observable.throw(`Error al obtener las ventas de cada entrada por RRPP`));
    }
    // OBTENER TODOS LOS RRPPS PENDIENTES DE ACEPTACIÓN
    getNotActivatedRrpps(): Observable<any> {
        return this.http.get(`${SERVER}rrppbuilding/getNotActivatedRrpps`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al obtener los RRPP pendientes de aceptación';
            delete resp.code;
            return resp;
        })
        .catch(error =>  Observable.throw(`Error al obtener las ventas de cada entrada por RRPP`));
    }
    // CONTRATAR RRPP EN UN BUILDING
    activateRrppToBuilding(idRrpp: number, idBuilding: number): Observable<any> {
        return this.http.post(`${SERVER}rrppbuilding/activateRrppToBuilding`, {idRrpp: idRrpp, idBuilding: idBuilding})
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al activar el RRPP en el Building';
            return resp.message;
        })
        .catch(error =>  Observable.throw(`Error al activar el RRPP en el Building`));
    }

}
