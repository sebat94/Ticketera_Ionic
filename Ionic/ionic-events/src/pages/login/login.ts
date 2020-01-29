import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// PROVIDERS
import { AuthProvider } from '../../providers/auth/auth';

// PAGES
import { RegisterPage } from '../register/register';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) { }

  ionViewDidLoad() {
    this.authProvider.isLogged();
  }

  ionViewCanEnter () {
    // LOGOUT ACTIVATE GUARD
    this.authProvider.isLogged().subscribe(isLogged => {
      if (isLogged) this.navCtrl.setRoot('EventsPage');
    });
  }

  login() {
    this.authProvider.login(this.email, this.password)
      .subscribe(
        () =>  this.navCtrl.setRoot('EventsPage'),
        (error) => console.log("Error al hacer login")
      );
  }

  goRegister(){
    this.navCtrl.push( RegisterPage );
  }


}
