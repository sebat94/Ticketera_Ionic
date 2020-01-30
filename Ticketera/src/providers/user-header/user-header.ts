import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// RXJS
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// MODELS
import { IHeaderInfo } from '../../models/response';


@Injectable()
export class UserHeaderProvider {

    public headerInfo: BehaviorSubject<IHeaderInfo> = new BehaviorSubject({title:'Acceder', isLogged: false, rol: '', canGoBack: false});

    public setBehaviourSubject(data: IHeaderInfo) {
        this.headerInfo.next(data);
    }

}
