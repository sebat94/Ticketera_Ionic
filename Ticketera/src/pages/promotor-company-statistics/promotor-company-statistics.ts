import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
// MODELS
import { OkResponseLogin } from '../../models/response';
// PROVIDERS
import { StatisticsProvider } from '../../providers/statistics';
import { Utils } from '../../utils/utils';


@IonicPage()
@Component({
    selector: 'page-promotor-company-statistics',
    templateUrl: 'promotor-company-statistics.html',
})
export class PromotorCompanyStatisticsPage {

    dataUserLogged: OkResponseLogin;
    
    legend: string = null;
    data: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public statisticsProvider: StatisticsProvider,
                public events: Events,
                public utils: Utils) {
    }

    ionViewWillEnter() {
        const days = 15;
        this.utils.getStoredDataUserLogged('General Statistics', true).then(userLogged => this.dataUserLogged = userLogged);
        this.statisticsProvider.getSellsByBuildingAndDays(days).subscribe(sellsDate => {
            this.data = sellsDate.map(eachDate => new DateStatistics(eachDate.dateString, eachDate.sells));
        });
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
