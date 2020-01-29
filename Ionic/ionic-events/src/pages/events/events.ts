import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
// CONSTANTS
import { IMAGES_EVENT_DIRECTORY } from '../../constants/static-content';
// PROVIDERS
import { AuthProvider } from '../../providers/auth/auth';
import { EventProvider } from '../../providers/event/event';
// MODELS
import { IEvent } from '../../models/event';
// PAGES
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  events: IEvent[] = [];
  imagePATH: string = IMAGES_EVENT_DIRECTORY;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider: AuthProvider,
              public eventProvider: EventProvider) { }

  ionViewWillEnter() {
    this.eventProvider.getAllEvents().subscribe(
      (resp) => {
        this.events = resp;
      },
      (error) => console.log('Error al obtener los eventos | ', error)
    );
  }

  ionViewCanEnter() {
    // LOGIN ACTIVATE GUARD
    this.authProvider.isLogged().subscribe(isLogged => {
      if (!isLogged) this.navCtrl.setRoot(LoginPage);
    });
  }

  refreshItems(refresh: Refresher) {
    this.eventProvider.getAllEvents().subscribe(
      (resp) => {
        this.events = resp;
        refresh.complete();
      },
      (error) => console.log('Error al refrescar los eventos | ', error)
    );
  }

  // GO EVENT DETAILS
  eventDetails(event: IEvent) {
    this.navCtrl.push('EventDetailsPage', event);
  }

  // GO USER PROFILE PAGE
  userProfile() {
    this.navCtrl.push('ProfilePage');
  }

  // GO NEW EVENT PAGE
  newEvent() {
    this.navCtrl.push('NewEventPage');
  }

  // Logout
  logOut() {
    this.authProvider.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
