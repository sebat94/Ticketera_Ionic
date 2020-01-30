import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, ToastController } from 'ionic-angular';
// PROVIDERS
import { CompanyProvider } from '../../providers/company';
import { OkResponseLogin } from '../../models/response';
import { Utils } from '../../utils/utils';


@IonicPage()
@Component({
  selector: 'page-promotor-companies',
  templateUrl: 'promotor-companies.html',
})
export class PromotorCompaniesPage {

    dataUserLogged: OkResponseLogin;
    companies: any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public toastCtrl: ToastController,
                public companyProvider: CompanyProvider,
                public events: Events,
                public utils: Utils) {
    }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('My Companies', true).then(userLogged => this.dataUserLogged = userLogged);
        this.getCompaniesOfPromotor();
    }

    showBuildingsOfCompany(company: any) {
        this.events.publish('page:changed', 'PromotorBuildingsPage', company);
    }

    openModal() {
        const modal = this.modalCtrl.create('ModalCreateCompanyPage');
        modal.present();
        modal.onDidDismiss((message: any) => {
            if(message){
                const toast = this.toastCtrl.create({duration: 3500, message: message});
                toast.present();
                this.getCompaniesOfPromotor();
            }
        });
    }

    getCompaniesOfPromotor() {
        this.companyProvider.getAllCompaniesOfLoggedPromotor().subscribe(companies => {
            this.companies = companies;
        });
    }

}
