import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
// ENUM
import { ActionMenuAdmin } from '../../enums/enum-popover-admin-menu';


@IonicPage()
@Component({
    selector: 'page-popover-admin-menu',
    templateUrl: 'popover-admin-menu.html',
})
export class PopoverAdminMenuPage {

    constructor(public viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PopoverAdminMenuPage');
    }

    goEvents() {
        this.viewCtrl.dismiss(ActionMenuAdmin.EVENTS);
    }

    goProfile() {
        this.viewCtrl.dismiss(ActionMenuAdmin.PROFILE);
    }

    goPendingCompanies() {
        this.viewCtrl.dismiss(ActionMenuAdmin.COMPANIES);
    }

    logOut() {
        this.viewCtrl.dismiss(ActionMenuAdmin.LOGOUT);
    }

}
