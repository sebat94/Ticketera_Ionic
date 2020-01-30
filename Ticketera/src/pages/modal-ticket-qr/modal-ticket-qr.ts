import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// PROVIDERS
import { TicketProvider } from '../../providers/ticket';


@IonicPage()
@Component({
  selector: 'page-modal-ticket-qr',
  templateUrl: 'modal-ticket-qr.html',
})
export class ModalTicketQrPage {

    ticket: any = {};
    QR: SafeResourceUrl = '';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public ticketProvider: TicketProvider,
                public sanitizer: DomSanitizer) {
                    this.ticket = this.navParams.data.ticket;
    }

    ionViewWillEnter() {
        this.ticketProvider.getTicketQR(this.ticket.id).subscribe((QR: string) => {
            this.QR = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${QR}`);
        });
    }

    closeModalTicketQR() {
        this.viewCtrl.dismiss();
    }

}
