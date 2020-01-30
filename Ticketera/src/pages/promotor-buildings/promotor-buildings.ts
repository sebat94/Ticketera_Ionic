import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, ToastController } from 'ionic-angular';
// MODELS
import { OkResponseLogin } from '../../models/response';
// PROVIDERS
import { Utils } from '../../utils/utils';
import { CompanyProvider } from '../../providers/company';


@IonicPage()
@Component({
    selector: 'page-promotor-buildings',
    templateUrl: 'promotor-buildings.html',
})
export class PromotorBuildingsPage {

    dataUserLogged: OkResponseLogin;
    company: any;
    buildings: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public toastCtrl: ToastController,
                public companyProvider: CompanyProvider,
                public events: Events,
                public utils: Utils) {
                    this.company = navParams.data;
    }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('My Buildings', true).then(userLogged => this.dataUserLogged = userLogged);
        this.getBuildingsOfCompany();
    }

    showStatisticsByDateOfBuilding(building: any){
        this.events.publish('page:changed', 'PromotorBuildingStatisticsPage', building);
    }

    openModalCreateBuilding() {
        const modal = this.modalCtrl.create('ModalCreateBuildingPage');
        modal.present();
        modal.onDidDismiss((message: string) => {
            if(message){
                const toast = this.toastCtrl.create({duration: 3500, message: message});
                toast.present();
                this.getBuildingsOfCompany();
            }
        });
    }

    goEventsOfBuilding(building: any) {
        this.events.publish('page:changed', 'PromotorBuildingEventsPage', building);
    }

    getBuildingsOfCompany() {
        this.companyProvider.GetAllBuildingsOfACompany(this.company.id).subscribe(buildings => {
            this.buildings = buildings;
        });
    }

}
