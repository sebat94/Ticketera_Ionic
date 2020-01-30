import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
// PROVIDERS
import { CompanyProvider } from '../../providers/company';


@IonicPage()
@Component({
    selector: 'page-modal-create-company',
    templateUrl: 'modal-create-company.html',
})
export class ModalCreateCompanyPage {

    company: {name: string, cif: string} = {
        name: '',
        cif: ''
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public companyProvider: CompanyProvider) {
    }

    createCompany() {
        this.companyProvider.createCompanyByPromotorLogged(this.company).subscribe((message: string) => {
            this.viewCtrl.dismiss(message);
        });
    }

    cancelCreateCompany() {
        this.viewCtrl.dismiss();
    }

}
