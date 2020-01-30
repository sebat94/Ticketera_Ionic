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
export class CompanyProvider {

    constructor(public http: HttpClient,
                public storage: Storage) { }

    // OBTIENE TODAS LAS COMPANIES DEL RRPP LOGEADO             ---------------------------------------------------
    getAllCompanies(): Observable<any> {
        return this.http.get(`${SERVER}rrppbuilding/getCompanies`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al listar las Companies';
            return resp.companies;
        })
        .catch(error =>  Observable.throw(`Error al listar los buildings`));
    }
    // OBTIENE TODAS LAS COMPANIES DEL PROMOTOR LOGEADO
    getAllCompaniesOfLoggedPromotor(): Observable<any> {
        return this.http.get(`${SERVER}company/listCompanies`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al listar las Companies del PROMOTOR';
            return resp.companies;
        })
        .catch(error =>  Observable.throw(`Error al listar los Companies del PROMOTOR`));
    }
    // OBTIENE TODOS LOS BUILDINGS DE UNA COMPANY DEL USUARIO PROMOTOR
    GetAllBuildingsOfACompany(idCompany: number): Observable<any> {
        return this.http.get(`${SERVER}company/${idCompany}/getBuildings`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al listar los Buildings de la COMPANY';
            return resp.buildings;
        })
        .catch(error =>  Observable.throw(`Error al listar los Buildings de la COMPANY`));
    }
    // LIQUIDACIÓN DEL PROMOTOR
    getLiquidationOfPromotor(idBuilding: number): Observable<any> {
        return this.http.post(`${SERVER}promotor/liquidacion`, {idBuilding: idBuilding})
        .map((resp: any) => {
            if(resp.code !== 200) return null;
            else{
                delete resp.code;
                return resp;
            }
        })
        .catch(error =>  Observable.throw(`Error al obtener la liquidación del building`));
    }
    // CREAR UNA COMPANY CON USUARIO PROMOTOR
    createCompanyByPromotorLogged(company: any): Observable<any> {
        return this.http.post(`${SERVER}company/createCompany`, company)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al crear la Company';
            return resp.message;
        })
        .catch(error =>  Observable.throw(`Error al crear la Company`));
    }
    // OBTENER LISTA DE SOLICITUDES PARA CREAR COMPAÑÍA
    getAllCompaniesToRegister(): Observable<any> {
        return this.http.get(`${SERVER}backend/getNotActivatedCompanies`)
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al listar las Companies que solicitan darse de alta';
            return resp.companies;
        })
        .catch(error =>  Observable.throw(`Error al listar las Companies que solicitan darse de alta`));
    }
    // ACTIVAR COMPAÑÍA
    activateCompny(idCompany: number): Observable<any> {
        return this.http.post(`${SERVER}backend/activateCompany`, {idCompany: idCompany})
        .map((resp: any) => {
            if(resp.code !== 200) throw 'Error al activar la company';
            return resp.message;
        })
        .catch(error =>  Observable.throw(`Error al activar la company`));
    }

}
