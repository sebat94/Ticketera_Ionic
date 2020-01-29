import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// MODELS
//import { ILocation } from '../../models/geolocation';
import { IEvent } from '../../models/event';
// NATIVE


@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  
  event: IEvent;
  lat: number = 38.4039418;
  lng: number = -0.5288701;
  zoom: number = 12;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.event = navParams.data;
  }

  ionViewWillEnter() {
    this.lat = this.event.lat;
    this.lng = this.event.lng;
  }

  goBack() {
    this.navCtrl.parent.parent.pop();
  }

}
