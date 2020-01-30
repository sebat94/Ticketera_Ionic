import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TicketProvider } from '../../providers/ticket';


@IonicPage()
@Component({
  selector: 'page-modal-rrpp-sell-tickets',
  templateUrl: 'modal-rrpp-sell-tickets.html',
})
export class ModalRrppSellTicketsPage {

    eventFull: any = {};

    ticketSold: {typeticket: number, userBuyer: string, dni: string} = {
        typeticket:0,
        userBuyer:'',
        dni:''
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public ticketProvider: TicketProvider) {
                    this.eventFull = this.navParams.data.eventFull;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ModalSellTicketsPage');
    }

    sellTicket() {
        // console.log(JSON.stringify(this.ticketSold));
        this.ticketProvider.sellTicketByRrpp(this.ticketSold).subscribe((resp: string) => {
            this.viewCtrl.dismiss(resp);
        });
    }

    cancelSellTicket() {
        this.viewCtrl.dismiss('Venta Cancelada!');
    }
    
}
