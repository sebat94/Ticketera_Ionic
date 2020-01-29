import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
// CONSTANTS
import { IMAGES_USER_DIRECTORY } from '../../constants/static-content';
// MODULES
import { IUser } from '../../models/user';
// PROVIDERS
import { UserProvider } from '../../providers/user/user';
// NATIVE
import { Camera, CameraOptions } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  user: IUser = {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    avatar: ''
  };
  newAvatar: string = '';
  userUpdated: IUser;
  imagePATH: string = IMAGES_USER_DIRECTORY;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public userProvider: UserProvider,
              public toastCtrl: ToastController,
              public camera: Camera) {
    this.user = navParams.data.user;
    this.user.password = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  takePhoto() {
    let options: CameraOptions = {
      targetWidth: 640, // max width 640px
      targetHeight: 640, // max height 640px
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL // Base64
    }
    this.getPicture(options);
  }

  pickFromGallery() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 200,
      targetHeight: 200,
      destinationType: this.camera.DestinationType.DATA_URL // Base64
    }
    this.getPicture(options);
  }

  private getPicture(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // If it's base64:
      this.newAvatar = 'data:image/jpeg;base64,' + imageData;
    }).catch((err) => {
      // Handle error
    });
  }

  submitPerForm() {
    this.userProvider.updateUsernameAndEmail(this.user.name, this.user.email).subscribe(result => {
      if(!result.error){
        this.userUpdated = result.result.user;
        this.changesSuccessfully('Email and Username changed successfully');
      }
          
    });
  }

  submitPassForm() {
    this.userProvider.updatePassword(this.user.password).subscribe(result => {
      if(!result.error){
        console.log(result);
        this.userUpdated = result.result.user;
        this.changesSuccessfully('Password changed successfully');
      }
          
    });
  }

  submitImgForm() {
    this.userProvider.updateImage(this.newAvatar).subscribe(result => {
      if(!result.error){
        console.log(result);
        this.userUpdated = result.result.user;
        this.changesSuccessfully('Avatar changed successfully');
      }
          
    });
  }

  changesSuccessfully(messageInfo: string) {
    let toast = this.toastCtrl.create({
      message: messageInfo,
      duration: 2500,
      position: 'middle'
    });
    toast.present();
  }

  closeModal() {
    if(this.userUpdated)
        this.viewCtrl.dismiss({userUpdated: this.userUpdated});
    else
        this.viewCtrl.dismiss();
  }

}
