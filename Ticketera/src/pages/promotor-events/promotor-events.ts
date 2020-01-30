import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, ToastController } from 'ionic-angular';
import { EventProvider } from '../../providers/event';
// MODELS
import { OkResponseLogin } from '../../models/response';
// PROVIDERS
import { Utils } from '../../utils/utils';


@IonicPage()
@Component({
    selector: 'page-promotor-events',
    templateUrl: 'promotor-events.html',
})
export class PromotorEventsPage {

    dataUserLogged: OkResponseLogin;
    events: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public toastCtrl: ToastController,
                public eventProvider: EventProvider,
                public utils: Utils,
                public eventsPublishSubscribe: Events) {
    }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('Mis eventos', true).then(userLogged => this.dataUserLogged = userLogged);
        this.eventProvider.getEventsOfAllMyBuildings().subscribe(resp => this.events = resp);
    }

    showEventStatistics(event: any) {
        this.eventsPublishSubscribe.publish('page:changed', 'PromotorTicketValidationPage', {event: event});
    }

}
