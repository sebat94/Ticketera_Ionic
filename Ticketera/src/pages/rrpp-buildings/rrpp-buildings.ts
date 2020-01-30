import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
// PROVIDERS
import { BuildingProvider } from '../../providers/building';
import { Utils } from '../../utils/utils';
// MODELS
import { OkResponseLogin } from '../../models/response';


@IonicPage()
@Component({
  selector: 'page-rrpp-buildings',
  templateUrl: 'rrpp-buildings.html',
})
export class RrppBuildingsPage {

    dataUserLogged: OkResponseLogin;
    buildings: any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public buildingProvider: BuildingProvider,
                public utils: Utils,
                public events: Events) { }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('Vender entradas', true).then(userLogged => this.dataUserLogged = userLogged);
        this.buildingProvider.getAllBuildingsOfRrppLogged().subscribe(buildings => {
            this.buildings = buildings;
        }, error => console.log("Error1: ", error));
    }

    showEventsOfBuilding(building) {
        this.events.publish('page:changed', 'RrppEventsBuildingPage', {building: building});
    }

}
