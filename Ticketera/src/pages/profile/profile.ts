import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
// PROVIDERS
import { UserProvider } from '../../providers/user';
import { UserHeaderProvider } from '../../providers/user-header/user-header';
import { Utils } from '../../utils/utils';
// MODELS
import { IUser } from '../../models/user';
import { OkResponseLogin } from '../../models/response';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

    dataUserLogged: OkResponseLogin;
    user: IUser;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public userProvider: UserProvider,
                public userHeaderProvider: UserHeaderProvider,
                public utils: Utils,
                public events: Events) { }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('Perfil', true).then(userLogged => this.dataUserLogged = userLogged);
        this.userProvider.getDataOfUserLogged().subscribe(userLogged => {
            if(userLogged.image === null) userLogged.image = 'assets/imgs/profiles/dog.png';
            this.user = userLogged;
        });
    }

    // NORMAL
    goMyTickets() {
        this.events.publish('page:changed', 'MyTicketsPage');
    }

    // RRPP
    goSellTickets() {
        this.events.publish('page:changed', 'RrppBuildingsPage');
    }
    goRequestBuildings() {
        this.events.publish('page:changed', 'RrppRequestBuildingsPage');
    }

    // PROMOTOR
    goMyCompanies() {
        this.events.publish('page:changed', 'PromotorCompaniesPage');
    }

    // ADMINISTRADOR
    goPendingCompaniesRequested() {
        this.events.publish('page:changed', 'AdminCompaniesPendingPage');
    }
    goProfileConfig() {
        this.events.publish('page:changed', 'ProfileConfigurationPage', this.user);
    }

}
