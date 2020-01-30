import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// MODELS
import { OkResponseLogin } from '../../models/response';
// PROVIDERS
import { BuildingProvider } from '../../providers/building';
import { StatisticsProvider } from '../../providers/statistics';
import { Utils } from '../../utils/utils';


@IonicPage()
@Component({
    selector: 'page-rrpp-event-statistics',
    templateUrl: 'rrpp-event-statistics.html',
})
export class RrppEventStatisticsPage {

    dataUserLogged: OkResponseLogin;

    legend: string = null;
    data: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public utils: Utils,
                public statisticsProvider: StatisticsProvider) {
    }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('Liquidación', true).then(userLogged => this.dataUserLogged = userLogged);
        this.statisticsProvider.getsellsbydaysandoptionalevent(-1, 15).subscribe(resp => this.data = resp.map(dailySales => new DateStatistics(dailySales.dateString, dailySales.sells)))
    }

}


// REFACTORIZAR
export class DateStatistics {

    private name;
    private value;

    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    public setName(name) {
        this.name = name;
    }

    public getName() {
        return this.name;
    }

    public setValue(value) {
        this.value = value;
    }

    public getValue() {
        return this.value
    }

}