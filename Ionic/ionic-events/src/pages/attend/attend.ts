import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// CONSTANTS
import { IMAGES_USER_DIRECTORY } from '../../constants/static-content';
// MODELS
import { IEvent } from '../../models/event';
import { IUser } from '../../models/user';
// PROVIDERS
import { UserProvider } from '../../providers/user/user';



@IonicPage()
@Component({
  selector: 'page-attend',
  templateUrl: 'attend.html',
})
export class AttendPage {

  event: IEvent;
  users: IUser[] = [];
  imagePATH: string = IMAGES_USER_DIRECTORY;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
    this.event = navParams.data;
  }

  ionViewDidLoad() {
    this.userProvider.getUsersThatAssistToAnEvent(this.event.id).subscribe(result => {
      this.users = result.result.users;
    });
  }

  goProfile(user: IUser) {
    this.navCtrl.parent.parent.push('ProfilePage', user);
  }

  goBack() {
    this.navCtrl.parent.parent.pop();
  }

}
