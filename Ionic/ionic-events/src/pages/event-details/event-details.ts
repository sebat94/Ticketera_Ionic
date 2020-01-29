import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEvent } from '../../models/event';

/**
 * Generated class for the EventDetailsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html'
})
export class EventDetailsPage {

  infoRoot = 'InfoPage'
  locationRoot = 'LocationPage'
  attendRoot = 'AttendPage'

  event: IEvent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = navParams.data;
  }

}
