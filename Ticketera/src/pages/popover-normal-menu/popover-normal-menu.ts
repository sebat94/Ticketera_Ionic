import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
// ENUMS
import { ActionMenuNormal } from '../../enums/enum-popover-normal-menu';


@IonicPage()
@Component({
    selector: 'page-popover-normal-menu',
    templateUrl: 'popover-normal-menu.html',
})
export class PopoverNormalMenuPage {

    constructor(public viewCtrl: ViewController) { }

    goEvents() {
        this.viewCtrl.dismiss(ActionMenuNormal.EVENTS);
    }

    goProfile() {
        this.viewCtrl.dismiss(ActionMenuNormal.PROFILE);
    }

    goMyTickets() {
        this.viewCtrl.dismiss(ActionMenuNormal.TICKETS);
    }

    logOut() {
        this.viewCtrl.dismiss(ActionMenuNormal.LOGOUT);
    }

}
