import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
// ENUM
import { ActionMenuRrpp } from '../../enums/enum-popover-rrpp-menu';


@IonicPage()
@Component({
    selector: 'page-popover-rrpp-menu',
    templateUrl: 'popover-rrpp-menu.html',
})
export class PopoverRrppMenuPage {

    constructor(public viewCtrl: ViewController) { }

    goEvents() {
        this.viewCtrl.dismiss(ActionMenuRrpp.EVENTS);
    }

    goProfile() {
        this.viewCtrl.dismiss(ActionMenuRrpp.PROFILE);
    }

    goMyBuildings() {
        this.viewCtrl.dismiss(ActionMenuRrpp.BUILDINGS);
    }

    goLiquidation() {
        this.viewCtrl.dismiss(ActionMenuRrpp.LIQUIDATION);
    }

    goEstatistics() {
        this.viewCtrl.dismiss(ActionMenuRrpp.STATISTICS);
    }

    logOut() {
        this.viewCtrl.dismiss(ActionMenuRrpp.LOGOUT);
    }

}
