import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
// CONSTANTS
import { IMAGES_USER_DIRECTORY } from '../../constants/static-content';
// MODELS
import { IUser } from '../../models/user';
// PROVIDERS
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: IUser;
  mine: Boolean = false;
  lat: number = 38.4039418;
  lng: number = -0.5288701;
  zoom: number = 12;
  imagePATH: string = IMAGES_USER_DIRECTORY;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              public modalCtrl: ModalController) {
     this.user = navParams.data;
     // POSITION
     this.lat = this.user.lat;
     this.lng = this.user.lng;
  }

  ionViewWillEnter() {
    if (Object.keys(this.user).length === 0 && this.user.constructor === Object)
        this.userProvider.getDataOfUserLogged().subscribe(result => {
          this.user = result.result.users[0];
          this.mine = true;
          // POSITION
          this.lat = this.user.lat;
          this.lng = this.user.lng;
        });
  }

  editProfile(user: IUser) {
    const modal = this.modalCtrl.create('EditProfilePage', { user: user });
    modal.present();
    modal.onWillDismiss(user => {
      if(user) this.user = user.userUpdated;
    });
  }

  goInfoUser() {
    this.navCtrl.push('OptionsProfilePage', this.user);
  }

}
