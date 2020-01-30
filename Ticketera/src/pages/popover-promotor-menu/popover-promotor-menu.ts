import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
// ENUMS
import { ActionMenuPromotor } from '../../enums/enum-popover-promotor-menu';


@IonicPage()
@Component({
    selector: 'page-popover-promotor-menu',
    templateUrl: 'popover-promotor-menu.html',
})
export class PopoverPromotorMenuPage {

    constructor(public viewCtrl: ViewController) { }

    goEvents() {
        this.viewCtrl.dismiss(ActionMenuPromotor.EVENTS);
    }

    goProfile() {
        this.viewCtrl.dismiss(ActionMenuPromotor.PROFILE);
    }

    goMyCompanies() {
        this.viewCtrl.dismiss(ActionMenuPromotor.COMPANIES);
    }

    goMyEvents() {
        this.viewCtrl.dismiss(ActionMenuPromotor.MY_EVENTS);
    }

    goPendingRrpps() {
        this.viewCtrl.dismiss(ActionMenuPromotor.PENDING_RRPPS);
    }

    goLiquidation() {
        this.viewCtrl.dismiss(ActionMenuPromotor.LIQUIDATION);
    }

    goEstatistics() {
        this.viewCtrl.dismiss(ActionMenuPromotor.STATISTICS);
    }

    logOut() {
        this.viewCtrl.dismiss(ActionMenuPromotor.LOGOUT);
    }

}
