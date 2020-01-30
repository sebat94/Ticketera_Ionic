import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
// MODELS
import { IUser } from '../../models/user';
// PROVIDERS
import { AuthProvider } from '../../providers/auth';
import { UserProvider } from '../../providers/user';
import { Observable } from 'rxjs/Observable';
// LIBRARIES
import * as shajs from 'sha.js';


@Component({
  selector: 'page-access',
  templateUrl: 'access.html'
})
export class AccessPage {

    // SEGMENT
    authentication: string = 'login';
    // FORM LOGIN
    user: IUser = {
        email: '',
        password: ''
    };
    // FORM REGISTER
    newUser: IUser = {
        email: '',
        password: '',
        repeatPassword: ''
    }
    // TYPE USER
    userType: string = 'normal';
    // LOADER
    showSpinner: boolean = false;
    // VALIDATIONS
    regExpEmail: RegExp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    regExpPassword: RegExp = /^(?=.*[a-zA-Z])(?=.*[0-9])/;  // Debe contener al menos letras y números

    constructor(public navCtrl: NavController,
                public authProvider: AuthProvider,
                public userProvider: UserProvider,
                private alertCtrl: AlertController) { }

    // GUARD
    ionViewCanEnter(){
        // this.authProvider.isLogged().subscribe(ok => {
        //     if(ok) this.navCtrl.setRoot('EventsPage');
        // });
    }

    // LOGIN
    login(){
        this.showSpinner = true;
        
        let resp = this.validationLogin();
        if(!resp.ok){
            this.showSpinner = false;
            return this.customAlert(resp.errorMessage).present();
        }

        this.user.password = this.encryptSha512(this.user.password);

        this.authProvider.login(this.user)
        .subscribe(
            () => this.navCtrl.setRoot('EventsPage'),   // No es necesario que emita al app.component si es setRoot()
            (error) => {
                this.showSpinner = false;
                this.customAlert(error).present();
            },
            () => this.showSpinner = false
        );
    }

    // REGISTER
    register(){
        this.showSpinner = true;

        let resp = this.validationRegister();
        if(!resp.ok){
            this.showSpinner = false;
            return this.customAlert(resp.errorMessage).present();
        }

        this.newUser.password = this.encryptSha512(this.newUser.password);
        
        let registerType: Observable<string>;
        switch(this.userType){
            case 'normal':   registerType = this.userProvider.regNormalUser(this.newUser); break;
            case 'rrpp':     registerType = this.userProvider.regRrppUser(this.newUser); break;
            case 'promotor': registerType = this.userProvider.regPromotorUser(this.newUser); break;
        }

        registerType.subscribe(
            (ok) => this.authentication = 'login',  // Falta vaciar formulario de registro
            (error) => {
                this.showSpinner = false;
                this.customAlert("PASAA POR AQUI"+JSON.stringify(error)).present();
            },
            () => this.showSpinner = false
        );

    }

    // VALIDATION LOGIN
    validationLogin(){
        // error message
        let errorMessageGeneric = 'Bad credentials';
        // valid email
        if(this.user.email){
            let res = this.regExpEmail.test(this.user.email);
            if(!res) return this.validationResponse(false, errorMessageGeneric);
        }else
            return this.validationResponse(false, errorMessageGeneric);
        // valid password
        if(this.user.password){
            let res = this.regExpPassword.test(this.user.password);
            if(!res) return this.validationResponse(false, errorMessageGeneric);
        }else
            return this.validationResponse(false, errorMessageGeneric);
        // ALL OK!
        return this.validationResponse(true, '');
    }

    // VALIDATION REGISTER
    validationRegister(){
        // error messages
        let errorMessageEmail = 'Fill the email field';
        let errorMessageEmailValid = 'Write a valid email';
        let errorMessagePassword = 'Fill the password fields';
        let errorMessagePasswordMatch = 'Passwords do not match';
        let errorMessagePasswordRequeriments = 'The password must have at least 8 characters, with at least 1 number, 1 uppercase and 1 small';
        // valid email
        if(this.newUser.email){
            let res = this.regExpEmail.test(this.newUser.email);
            if(!res) return this.validationResponse(false, errorMessageEmailValid);
        }else
            return this.validationResponse(false, errorMessageEmail);
        // valid passwords
        if(this.newUser.password && this.newUser.repeatPassword){
            if (this.newUser.password === this.newUser.repeatPassword){
                let res = this.regExpPassword.test(this.newUser.password);
                if(!res) return this.validationResponse(false, errorMessagePasswordRequeriments);
            }else
                return this.validationResponse(false, errorMessagePasswordMatch);
        }else
            return this.validationResponse(false, errorMessagePassword);
        // Set Default User Type
        /*if(this.userType !== 'normal' && this.userType !== 'rrpp' && this.userType !== 'promotor')
            this.userType = 'normal';*/
        // ALL OK!
        return this.validationResponse(true, '');
    }
    
    // VALIDATION RESPONSE FROM LOGIN/REGISTER
    validationResponse(ok: boolean, errorMessage: string){
        return <{ok: boolean, errorMessage: string}> {
            ok: ok,
            errorMessage: errorMessage
        };
    }

    // ALERT ERROR MESSAGE
    customAlert(subtitle: string) {
        return this.alertCtrl.create({
          title: 'Error',
          subTitle: subtitle,
          buttons: ['OK']
        });
    }

    private encryptSha512(password: string) {
        return shajs('sha512').update(password).digest('hex').slice(64);
    }

}
