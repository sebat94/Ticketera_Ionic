import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// MODELS
import { IEventWithImages } from '../../models/response';



@IonicPage()
@Component({
  selector: 'page-event-info',
  templateUrl: 'event-info.html'
})
export class EventInfoPage {

    eventDetailsRoot = 'EventDetailsPage'
    eventLocationRoot = 'EventLocationPage'

    event: IEventWithImages;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.event = navParams.data;
    }

}
