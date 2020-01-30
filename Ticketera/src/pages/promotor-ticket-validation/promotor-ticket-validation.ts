import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
// MODELS
import { OkResponseLogin } from '../../models/response';
// PROVIDERS
import { TicketProvider } from '../../providers/ticket';
import { Utils } from '../../utils/utils';
// NATIVE
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';


@IonicPage()
@Component({
    selector: 'page-promotor-ticket-validation',
    templateUrl: 'promotor-ticket-validation.html',
})
export class PromotorTicketValidationPage {

    dataUserLogged: OkResponseLogin;
    event: any;
    ticket: any;
    isValid: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public ticketProvider: TicketProvider,                 
                public utils: Utils,
                public events: Events,
                public barcodeScanner: BarcodeScanner) {
                    this.event = navParams.data.event;
    }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('Validar QR', true).then(userLogged => this.dataUserLogged = userLogged);
        this.isValid = false;
    }

    scanQR() {
        this.barcodeScanner.scan().then((scannerData: BarcodeScanResult) => {
            this.ticketProvider.validateQR(+scannerData.text, this.event.id).subscribe(resp => {
                this.ticket = resp;
                this.isValid = true;
            });
        }).catch(err => console.log('Error', err));
    }

    private optionsQR() {
        return {
            formats: 'QR_CODE',
            showTorchButton: true,
            showFlipCameraButton: true,
            disableAnimations: true,
            //resultDisplayDuration: 0
        }
    }

}
