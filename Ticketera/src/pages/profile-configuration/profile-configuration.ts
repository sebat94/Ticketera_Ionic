import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
// MODELS
import { IUser } from '../../models/user';
// PROVIDERS
import { UserProvider } from '../../providers/user';
// NATIVE
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-profile-configuration',
  templateUrl: 'profile-configuration.html',
})
export class ProfileConfigurationPage {

    user: IUser;
    today = new Date().toISOString();

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public userProvider: UserProvider,
                public camera: Camera,
                public events: Events) {
                    this.user = Object.assign({}, navParams.data);
    }

    updateProfile() {
        this.userProvider.updateDataOfUserLogged(this.user).subscribe(newUserData => {
            this.user = newUserData;
            this.events.publish('page:changed', 'ProfilePage');
        });
    }

    takePhoto() {
        let options: CameraOptions = {
            targetWidth: 640, // max width 640px
            targetHeight: 640, // max height 640px
            allowEdit: true,
            destinationType: this.camera.DestinationType.DATA_URL, // Base64
        }
        this.getPicture(options);
    }

    pickFromGallery() {
        let options: CameraOptions = {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          targetWidth: 640,
          targetHeight: 640,
          allowEdit: true,
          destinationType: this.camera.DestinationType.DATA_URL
        }
        this.getPicture(options);
    }

    private getPicture(options: CameraOptions) {
        this.camera.getPicture(options).then((imageData) => {
            // If it's base64:
            this.user.image = 'data:image/jpeg;base64,' + imageData;
        }).catch((err) => {
            // Handle error
        });
    }

}
