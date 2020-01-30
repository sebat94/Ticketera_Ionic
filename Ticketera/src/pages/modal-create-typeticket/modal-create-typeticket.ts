import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TicketProvider } from '../../providers/ticket';


@IonicPage()
@Component({
    selector: 'page-modal-create-typeticket',
    templateUrl: 'modal-create-typeticket.html',
})
export class ModalCreateTypeticketPage {

    ticket: {event: number, totalAmount: number, name: string, price: number} = {
        event: 0,
        totalAmount: 0,
        name: '',
        price: 0
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public ticketProvider: TicketProvider) {
                    this.ticket.event = navParams.data.event.id;
    }

    createTypeticket() {
        this.ticketProvider.createTypeTicket(this.ticket).subscribe((message: string) => {
            this.viewCtrl.dismiss(message);
        });
    }

    cancelCreateTypeticket() {
        this.viewCtrl.dismiss();
    }

}
