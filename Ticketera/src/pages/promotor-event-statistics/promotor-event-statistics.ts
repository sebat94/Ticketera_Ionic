import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// MODELS
import { OkResponseLogin } from '../../models/response';
// PROVIDERS
import { Utils } from '../../utils/utils';
import { StatisticsProvider } from '../../providers/statistics';


@IonicPage()
@Component({
    selector: 'page-promotor-event-statistics',
    templateUrl: 'promotor-event-statistics.html',
})
export class PromotorEventStatisticsPage {

    dataUserLogged: OkResponseLogin;
    event: any;

    // Slide 1 - Pie Chart
    legendSlide1: string = null;
    dataSlide1: any;
    // Slide 2 - Number Cards Chart
    dataSlide2: any;
    // Slide 3 - Number Cards
    dataSlide3: any;
    // Slide 4 - Vertical Bar Chart
    legendSlide4: string = null;
    dataSlide4: any;
    // data: {name: string, value: number}[];


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public utils: Utils,
                public statisticsProvider: StatisticsProvider) {
                    this.event = navParams.data.event;
    }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('Stadísticas', true).then(userLogged => this.dataUserLogged = userLogged);
        this.statisticsProvider.getFullEvent(this.event.id).subscribe(resp => {
            // Slide 1
            this.dataSlide1 = resp.sellsByGender.map(eachSellsByGender => new DateStatistics(eachSellsByGender.gender, eachSellsByGender.sells));
            // Slide 2
            this.dataSlide2 = resp.sellsByTypeticket.map(eachSellsByTypeTicket => new DateStatistics(`Ventas: ${eachSellsByTypeTicket.sells}`, `Tcikets: ${eachSellsByTypeTicket.typeticket.name}`));
            // Slide 3
            this.dataSlide3 = [new DateStatistics('Plataforma', resp.sellsByRrppvsPlatform.sellsByPlatform), new DateStatistics('RRPP', resp.sellsByRrppvsPlatform.sellsByRrpp)];
            // Slide 4
            this.dataSlide4 = resp.sellsDate.map(eachSellsByDate => new DateStatistics(eachSellsByDate.dateString, eachSellsByDate.sells));
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