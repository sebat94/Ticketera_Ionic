import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// INTERFACES
import { IUser } from '../../models/user';
// PROVIDERS
import { GeolocationProvider } from '../../providers/geolocation/geolocation.provider';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
// NATIVE
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    newUser: IUser = {
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        avatar: '',
        lat: 0,
        lng: 0
    };
    image: string = '';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public authProvider: AuthProvider,
                public userProvider: UserProvider,
                public camera: Camera) {
    }

    ionViewDidLoad(){
        GeolocationProvider.getLocation().then(position => {
            this.newUser.lat = (<Position>position).coords.latitude;
            this.newUser.lng = (<Position>position).coords.longitude;
        }).catch(error => {
            console.log('No se ha podido obtener la posición del usuario a registrar: ', error);
        });
    }

    ionViewCanEnter(){
        // LOGOUT ACTIVATE GUARD
        this.authProvider.isLogged().subscribe(isLogged => {
            if (isLogged) this.navCtrl.setRoot('EventsPage');
        });
    }

    register(){
        let errFormReg = <HTMLElement>document.getElementById('errorInfo');

        if(this.newUser.password !== this.newUser.repeatPassword)
            return errFormReg.innerText = 'Las contraseñas deben coincidir';

        this.userProvider.regNormalUser(this.newUser).subscribe(resp => {
            if(!resp.error)
                this.navCtrl.setRoot('EventsPage');
            else
                errFormReg.innerText = resp.errorMessage;
        }, error => console.log('Error al registrar el usuario: ', error));
    }

    takePhoto(){
        let options: CameraOptions = {
          targetWidth: 640, // max width 640px
          targetHeight: 640, // max height 640px
          allowEdit: true,
          destinationType: this.camera.DestinationType.DATA_URL // Base64
        }
        this.getPicture(options);
      }

    pickFromGallery(){
        const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            targetWidth: 200,
            targetHeight: 200,
            destinationType: this.camera.DestinationType.DATA_URL // Base64
        }
        this.getPicture(options);
    }

    private getPicture(options: CameraOptions){
        this.camera.getPicture(options).then((imageData) => {
            // If it's base64:
            this.newUser.avatar = 'data:image/jpeg;base64,' + imageData;
            this.image = 'data:image/jpeg;base64,' + imageData;
        }).catch((err) => {
            // Handle error
        });
    }

    goLogin(){
        this.navCtrl.pop();
    }

}
