import { Injectable } from '@angular/core';
// STORAGE
import { Storage } from '@ionic/storage';
// MODELS
import { OkResponseLogin } from '../models/response';
// PROVIDERS
import { UserHeaderProvider } from '../providers/user-header/user-header';


@Injectable()
export class Utils {

    isLogged: boolean = false;

    constructor(public storage: Storage,
                public userHeaderProvider: UserHeaderProvider) { }

    getStoredDataUserLogged(title: string, canGoBack: boolean) {
        return this.storage.get('dataUserLogged').then(userLogged => {
            this.userHeaderProvider.setBehaviourSubject({title: title, isLogged: true, rol: userLogged.rol, canGoBack: canGoBack});
            return userLogged;
        }).catch(() => {
            this.userHeaderProvider.setBehaviourSubject({title: title, isLogged: false, rol: '', canGoBack: canGoBack})
            return null;
        });
    }

    checkIfItsTheSamePageBeforeNavigate(activePage: string, nextPage: string): boolean {
        return (activePage === nextPage) ? true : false;
    }

}