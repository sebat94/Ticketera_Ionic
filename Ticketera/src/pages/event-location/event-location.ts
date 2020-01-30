import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// MODELS
import { IEventWithImages } from '../../models/response';
// NATIVE
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';


@IonicPage()
@Component({
  selector: 'page-event-location',
  templateUrl: 'event-location.html',
})
export class EventLocationPage {

    eventWithImages: IEventWithImages;
    lat: number = 38.4039418;
    lng: number = -0.5288701;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private launchNavigator: LaunchNavigator) {
                    this.eventWithImages = navParams.data;
                    this.lat = this.eventWithImages.event.building.lat;
                    this.lng = this.eventWithImages.event.building.lon;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventLocationPage');
    }

    navigate() {
        let options: LaunchNavigatorOptions = {};
        this.launchNavigator.navigate([this.lat, this.lng], options).then(ok => console.log("Navigation launched!"));
    }

}
