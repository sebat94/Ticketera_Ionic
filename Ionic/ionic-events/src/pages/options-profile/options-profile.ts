import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// CONSTANTS
import { IMAGES_EVENT_DIRECTORY } from '../../constants/static-content';
// MODELS
import { IEvent } from '../../models/event';
// PROVIDERS
import { EventProvider } from '../../providers/event/event';
import { IUser } from '../../models/user';


@IonicPage()
@Component({
  selector: 'page-options-profile',
  templateUrl: 'options-profile.html',
})
export class OptionsProfilePage {

  user: IUser;
  typeOfSearch: string = 'mine';
  mine: IEvent[] = [];
  attend;  // Not Implemented
  imagePATH: string = IMAGES_EVENT_DIRECTORY;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventProvider: EventProvider) {
    this.user = this.navParams.data;
  }

  ionViewDidLoad() {
    this.eventProvider.getEventsOfUserById(this.user.id).subscribe(result => {
      console.log("IONIC: ",result);
      if( Object.keys(result.length > 0 ) ) this.mine = result;
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

}
