import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, ToastController } from 'ionic-angular';
// MODELS
import { OkResponseLogin } from '../../models/response';
// PROVIDERS
import { EventProvider } from '../../providers/event';
import { Utils } from '../../utils/utils';


@IonicPage()
@Component({
    selector: 'page-promotor-building-events',
    templateUrl: 'promotor-building-events.html',
})
export class PromotorBuildingEventsPage {

    dataUserLogged: OkResponseLogin;
    building: any;
    events: any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public toastCtrl: ToastController,
                public eventProvider: EventProvider,
                public eventsPublishSubscribe: Events,
                public utils: Utils) {
                    this.building = navParams.data;
    }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('Building Events', true).then(userLogged => this.dataUserLogged = userLogged);
        this.eventProvider.getAllEventsOfBuildingByPromotor(this.building.id).subscribe(events => this.events = events);
    }

    openModalCreateEvent() {
        const modal = this.modalCtrl.create('ModalCreateEventPage', {idBuilding: this.building.id});
        modal.present();
        modal.onDidDismiss((message: any) => {
            if(message){
                const toast = this.toastCtrl.create({duration: 3500, message: message});
                toast.present();
                this.eventProvider.getAllEventsOfBuildingByPromotor(this.building.id).subscribe(events => this.events = events);
            }
        });
    }

    goEventStatistics(event) {
        this.eventsPublishSubscribe.publish('page:changed', 'PromotorEventStatisticsPage', { event: event });
    }

    openModalCreateTypeTicket(event) {
        const modal = this.modalCtrl.create('ModalCreateTypeticketPage', {event: event});
        modal.present();
        modal.onDidDismiss((message: any) => {
            if(message){
                const toast = this.toastCtrl.create({duration: 3500, message: message});
                toast.present();
                this.eventProvider.getAllEventsOfBuildingByPromotor(this.building.id).subscribe(events => this.events = events);
            }
        });
    }

    // getEventsOfBuilding() {
    //     this.eventProvider.getAllEventsOfBuildingByPromotor(this.building.id).subscribe(events => this.events = events);
    // }

}
