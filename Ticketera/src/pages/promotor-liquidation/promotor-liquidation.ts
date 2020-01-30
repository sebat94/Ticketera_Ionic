import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
// MODELS
import { OkResponseLogin } from '../../models/response';
// PROVIDERS
import { BuildingProvider } from '../../providers/building';
import { Utils } from '../../utils/utils';
import { CompanyProvider } from '../../providers/company';
// RXJS
import 'rxjs/add/operator/first';


@IonicPage()
@Component({
    selector: 'page-promotor-liquidation',
    templateUrl: 'promotor-liquidation.html',
})
export class PromotorLiquidationPage {

    dataUserLogged: OkResponseLogin;
    buildings: any;
    liquidations: any[] = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public companyProvider: CompanyProvider,
                public buildingProvider: BuildingProvider,
                public utils: Utils,
                public eventsPublishSubscribe: Events) {
    }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('Liquidación', true).then(userLogged => this.dataUserLogged = userLogged);
        (async () => {
            await this.buildingProvider.getAllBuildingsOfPromotorLogged().first().toPromise().then(buildings => this.buildings = buildings);
            await this.buildings.forEach(eachBuilding => this.companyProvider.getLiquidationOfPromotor(eachBuilding.id).first().toPromise().then(liquidation => { if(liquidation) this.liquidations.push(liquidation) } ));
        console.log(this.buildings);
        console.log(this.liquidations);
        })();
    }

}
