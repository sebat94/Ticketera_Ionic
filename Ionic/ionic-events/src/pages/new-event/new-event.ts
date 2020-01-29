import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// MODELS
import { IEvent } from '../../models/event';
// PROVIDERS
import { GeolocationProvider } from '../../providers/geolocation/geolocation.provider';
import { AuthProvider } from '../../providers/auth/auth';
import { EventProvider } from '../../providers/event/event';
// PAGES
import { LoginPage } from '../login/login';
// NATIVE
import { Camera, CameraOptions } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {

  newEvent: IEvent = {
    title: '',
    description: '',
    image: '',
    date: '',
    price: 0,
    lat: 0,
    lng: 0
  };
  image: string = '';
  today = new Date().toISOString();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider: AuthProvider,
              public eventProvider: EventProvider,
              public camera: Camera) { }

  ionViewDidLoad() {
    GeolocationProvider.getLocation().then(position => {
      this.newEvent.lat = (<Position>position).coords.latitude;
      this.newEvent.lng = (<Position>position).coords.longitude;
    }).catch(error => {
        console.log('No se ha podido obtener la posición del usuario a registrar: ', error);
    });
  }

  ionViewCanEnter(){
    // LOGOUT ACTIVATE GUARD
    this.authProvider.isLogged().subscribe(isLogged => {
      if (!isLogged) this.navCtrl.setRoot(LoginPage);
    });
  }

  addEvent() {
    let errFormNewEvt = <HTMLElement>document.getElementById('mensajeError');

    this.eventProvider.addEvent(this.newEvent).subscribe(resp => {
        if(!resp.error)
            this.navCtrl.setRoot('EventsPage');
        else
          errFormNewEvt.innerText = resp.errorMessage;
    }, error => console.log('Error al registrar el usuario: ', error));
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
        this.newEvent.image = 'data:image/jpeg;base64,' + imageData;
        this.image = 'data:image/jpeg;base64,' + imageData;
    }).catch((err) => {
        // Handle error
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

}
