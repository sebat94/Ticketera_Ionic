import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
// PROVIDERS
import { TicketProvider } from '../../providers/ticket';
import { Utils } from '../../utils/utils';
// MODELS
import { OkResponseLogin } from '../../models/response';


@IonicPage()
@Component({
  selector: 'page-my-tickets',
  templateUrl: 'my-tickets.html',
})
export class MyTicketsPage {

    dataUserLogged: OkResponseLogin;
    tickets: any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public ticketProvider: TicketProvider,
                public utils: Utils) {
    }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('Entradas', true).then(userLogged => this.dataUserLogged = userLogged);
        this.ticketProvider.getMyTickets().subscribe(tickets => this.tickets = tickets);
    }

    showTicketQR(ticket: any) {
        this.openModal(ticket);
    }

    openModal(ticket: any) {
        const modal = this.modalCtrl.create('ModalTicketQrPage', {ticket: ticket});
        modal.present();
        modal.onDidDismiss(resp => {console.log("close modal QR")});
    }

}
