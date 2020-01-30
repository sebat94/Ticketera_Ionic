import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
// PROVIDERS
import { EventProvider } from '../../providers/event';
import { IEvent } from '../../models/event';
import { Utils } from '../../utils/utils';
// MODELS
import { OkResponseLogin } from '../../models/response';


@IonicPage()
@Component({
  selector: 'page-rrpp-events-building',
  templateUrl: 'rrpp-events-building.html',
})
export class RrppEventsBuildingPage {

    dataUserLogged: OkResponseLogin;
    building: any = {};
    eventsFull: any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl: ToastController,
                public modalCtrl: ModalController,
                public eventProvider: EventProvider,
                public utils: Utils) {
                    this.building = this.navParams.data.building;
    }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged(this.building.name, true).then(userLogged => this.dataUserLogged = userLogged);
        this.eventProvider.getEventsToSellByBuilding(this.building.id).subscribe(eventsFull => {
            this.eventsFull = eventsFull;
        });
    }

    sellTypeTickets(eventFull: any) {
        const modal = this.modalCtrl.create('ModalRrppSellTicketsPage', {eventFull: eventFull});
        modal.present();
        modal.onDidDismiss((message: string) => this.showToast(message));
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
