import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
// MODELS
import { IEventWithImages, OkResponseLogin } from '../../models/response';
// PROVIDERS
import { TicketProvider } from '../../providers/ticket';
import { EventProvider } from '../../providers/event';
import { UserHeaderProvider } from '../../providers/user-header/user-header';
import { Utils } from '../../utils/utils';


@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

    dataUserLogged: OkResponseLogin;
    eventWithImages: IEventWithImages;
    imagePATH: string = 'assets/imgs/events/2.jpg'; // Default image

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl: ToastController,
                public eventProvider: EventProvider,
                public ticketProvider: TicketProvider,
                public userHeaderProvider: UserHeaderProvider,
                public utils: Utils) {
                    this.eventWithImages = navParams.data;
                    this.imagePATH = this.eventWithImages.eventImages[0].image;
    }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged(this.eventWithImages.event.name, true).then(userLogged => this.dataUserLogged = userLogged);
    }

    changeImage(imageSelected) {
        this.imagePATH = imageSelected;
    }

    buyTicket(typeticket: number) {
        this.ticketProvider.buyTypeTicketOfEvent(typeticket).subscribe((resp: string) => {
            this.showToast(resp);
        });
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
