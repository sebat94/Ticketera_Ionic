import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// CONSTANTS
import { IMAGES_EVENT_DIRECTORY } from '../../constants/static-content';
// MODELS
import { IEvent } from '../../models/event';



@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  event: IEvent;
  imagePATH: string = IMAGES_EVENT_DIRECTORY;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

  goBack() {
    this.navCtrl.parent.parent.pop();
  }

}
