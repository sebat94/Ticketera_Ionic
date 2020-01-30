import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
// MODELS
import { OkResponseLogin } from '../../models/response';
// PROVIDERS
import { BuildingProvider } from '../../providers/building';
import { Utils } from '../../utils/utils';
// RXJS
import 'rxjs/add/operator/first';


@IonicPage()
@Component({
    selector: 'page-rrpp-liquidation',
    templateUrl: 'rrpp-liquidation.html',
})
export class RrppLiquidationPage {

    dataUserLogged: OkResponseLogin;
    buildings: any;
    eventsLiquidation: any[] = [];

    constructor(public navCtrl: NavController,
            public navParams: NavParams,
            public buildingProvider: BuildingProvider,
            public utils: Utils,
            public eventsPublishSubscribe: Events) { }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('Liquidación', true).then(userLogged => this.dataUserLogged = userLogged);
        (async () => {
            await this.buildingProvider.getAllBuildingsOfRrppLogged().first().toPromise().then(buildings => this.buildings = buildings);
            await this.buildings.forEach(eachBuilding => this.buildingProvider.getLiquidationOfRrpp(eachBuilding.id, this.dataUserLogged.id).first().toPromise().then(liquidation => { if(liquidation) this.eventsLiquidation = this.eventsLiquidation.concat(liquidation)} ));
        })();
    }

}
