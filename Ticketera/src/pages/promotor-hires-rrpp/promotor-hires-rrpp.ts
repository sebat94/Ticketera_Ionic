import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
// MODELS
import { OkResponseLogin } from '../../models/response';
// PROVIDERS
import { BuildingProvider } from '../../providers/building';
import { Utils } from '../../utils/utils';


@IonicPage()
@Component({
    selector: 'page-promotor-hires-rrpp',
    templateUrl: 'promotor-hires-rrpp.html',
})
export class PromotorHiresRrppPage {

    dataUserLogged: OkResponseLogin;
    rrpps: any = [];
    buildings: any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl: ToastController,
                public buildingProvider: BuildingProvider,
                public utils: Utils) {
    }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('Peticiones compañía', true).then(userLogged => this.dataUserLogged = userLogged);
        this.buildingProvider.getNotActivatedRrpps().subscribe(resp => {
            this.rrpps = resp.rrpps;
            this.buildings = resp.buildings;
        });
    }

    activateRrppToBuilding(idRrpp: number, idBuilding: number) {
        this.buildingProvider.activateRrppToBuilding(idRrpp, idBuilding).subscribe(message => {
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
