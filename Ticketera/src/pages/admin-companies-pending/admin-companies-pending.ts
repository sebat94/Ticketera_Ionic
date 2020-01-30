import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
// MODELS
import { OkResponseLogin } from '../../models/response';
// PROVIDERS
import { CompanyProvider } from '../../providers/company';
import { Utils } from '../../utils/utils';


@IonicPage()
@Component({
    selector: 'page-admin-companies-pending',
    templateUrl: 'admin-companies-pending.html',
})
export class AdminCompaniesPendingPage {

    dataUserLogged: OkResponseLogin;
    companies: any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl: ToastController,
                public companyProvider: CompanyProvider,
                public utils: Utils) {
    }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('Peticiones compañía', true).then(userLogged => this.dataUserLogged = userLogged);
        this.companyProvider.getAllCompaniesToRegister().subscribe(companies => this.companies = companies);
    }

    activateCompany(company: any) {
        this.companyProvider.activateCompny(company.id).subscribe((message: string) => {
            this.companies.splice(this.companies.indexOf(company), 1);
            this.showToast(message);
        });
    }

    private showToast(message: string) {
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'middle'
        });
        toast.present();
    }

}
