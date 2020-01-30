import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Popover, ViewController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PopoverController } from 'ionic-angular';
// PAGES
import { AccessPage } from '../pages/access/access';
// ENUM
import { ActionMenuNormal } from '../enums/enum-popover-normal-menu';
import { ActionMenuRrpp } from '../enums/enum-popover-rrpp-menu';
import { ActionMenuPromotor } from '../enums/enum-popover-promotor-menu';
import { Rol } from '../enums/enum-user-rol';
// MODELS
import { OkResponseLogin, IHeaderInfo, IEventWithImages } from '../models/response';
import { IUser } from '../models/user';
// STORAGE
import { Storage } from '@ionic/storage';
// PROVIDERS
import { UserHeaderProvider } from '../providers/user-header/user-header';
import { Utils } from '../utils/utils';
import { ActionMenuAdmin } from '../enums/enum-popover-admin-menu';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;
    rootPage: any = AccessPage;
    pages: Array<{title: string, component: any}>;

    headerData: IHeaderInfo;

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public storage: Storage,
                public popoverCtrl: PopoverController,
                public userHeaderProvider: UserHeaderProvider,
                public utils: Utils,
                public events: Events) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Access', component: AccessPage },
            { title: 'Events', component: 'EventsPage' },
            { title: 'Profile', component: 'ProfilePage' },
            { title: 'ProfileConfiguration', component: 'ProfileConfigurationPage' }
        ];

        // Cuando queremos cambiar una página desde cualquier parte de la aplicación enviamos la información a través del evento 'page:changed'
        // mediante un evento publicación-subscripción y al recibir la información ejecutamos el método que controla la acción de navegación de la app
        events.subscribe('page:changed', (page: string, paramData: IUser | IEventWithImages | any) => {
            // console.log('Welcome: ', page, " , paramData: ", paramData, " , typeof: ", typeof paramData);
            this.checkNavigationTypeAndPage(page, paramData);
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    /*-- HEADER --*/
    ngOnInit() {
        this.userHeaderProvider.headerInfo.subscribe((data: IHeaderInfo) => {
            this.headerData = data;
        });
    }

    presentPopover(e) {
        if(this.headerData.rol === Rol.NORMAL){
            let popover = this.popoverCtrl.create('PopoverNormalMenuPage');
            this.presentPopoverByRol(e, popover, this.popoverActionNormal);

        }else if(this.headerData.rol === Rol.RRPP){
            let popover = this.popoverCtrl.create('PopoverRrppMenuPage');
            this.presentPopoverByRol(e, popover, this.popoverActionRrpp);

        }else if(this.headerData.rol === Rol.PROMOTOR){
            let popover = this.popoverCtrl.create('PopoverPromotorMenuPage');
            this.presentPopoverByRol(e, popover, this.popoverActionPromotor);
            
        }else if(this.headerData.rol === Rol.ADMIN){
            let popover = this.popoverCtrl.create('PopoverAdminMenuPage');
            this.presentPopoverByRol(e, popover, this.popoverActionAdmin);
        }else{
            // USUARIO ANONIMO NO TIENE POPOVER
        }
    }

    private presentPopoverByRol(e: Event, popover: Popover, popoverAction: Function) {
        popover.present({ev: e});
        popover.onDidDismiss(page => {
            if(!page) return;
            const nextPage = popoverAction(page);
            this.checkNavigationTypeAndPage(nextPage);
        });
    }

    private checkNavigationTypeAndPage(nextPage: string | any, paramData = {}) {
        /**
         * El método comprueba primero si la página seleccionada en el 'popover' es la de salir o cualquier otra (si es la de salir, hará el logout),
         * en caso de ser cualquier otra comprobamos si la página actual y la página a la qe vamos son la misma, en caso de serlo, no creará otra págnina,
         * en caso de que la siguiente página sea distinta, comprobaremos si nos dirigimos a la página 'EVENTS(pág root)' o no (en caso afirmativo haremos un setRoot en lugar de un push)
         * en caso de que la página no sea, ni 'LOGOUT' ni 'LA MISMA', ni 'EVENTS(root)' entonces hacemos la última validación:
         * Si la página a la que nos dirigimos se encuentra en la pila de páginas en las que hemos ido haciendo push, entonces hacemos un popTo(), para volver destruyendo a nuestro paso las páginas intermedias,
         * y por último en caso de no contenerla el array, haremos un push hacia la página.
         * ---- Al hacer push enviamos el paramData opcional y en caso de que reciba valor se lo mandará a la página correspondiente ----
         */
        let pagesStack: Array<string> = [];
        this.nav.getViews().map(eachView => pagesStack.push(eachView.name)); 
        //console.log(JSON.stringify(pagesStack));

        // PODRIAMOS SUSTITUIRLOS A PELO el 'ActionMenuNormal.LOGOUT' por --> 'LOGOUT' y el 'ActionMenuNormal.EVENTS' por --> 'EventsPage'
        (nextPage !== ActionMenuNormal.LOGOUT) ? 
            ((!this.utils.checkIfItsTheSamePageBeforeNavigate(this.nav.getActive().name, nextPage)) ? 
                ((nextPage === ActionMenuNormal.EVENTS) ? this.nav.setRoot(nextPage) : 
                    (pagesStack.indexOf(nextPage) >= 0) ? this.nav.popTo(nextPage) : this.nav.push(nextPage, paramData))
            : null) 
        : this.logOut();
    }
    // null
    //console.log("PopTo(",nextPage,")")
    private popoverActionNormal(page) {
        let nextPage;
        switch(page){
            case ActionMenuNormal.EVENTS:
                nextPage = ActionMenuNormal.EVENTS;
            break;
            case ActionMenuNormal.PROFILE:
                nextPage = ActionMenuNormal.PROFILE;
            break;
            case ActionMenuNormal.TICKETS:
                nextPage = ActionMenuNormal.TICKETS;
            break;
            case ActionMenuNormal.LOGOUT:
                nextPage = ActionMenuNormal.LOGOUT;
            break;
            default: console.log('Acción no permitida en un usuario NORMAL');
        }
        return nextPage;
    }

    private popoverActionRrpp(page) {
        let nextPage;
        switch(page){
            case ActionMenuRrpp.EVENTS:
                nextPage = ActionMenuRrpp.EVENTS;
            break;
            case ActionMenuRrpp.PROFILE:
                nextPage = ActionMenuRrpp.PROFILE;
            break;
            case ActionMenuRrpp.BUILDINGS:
                nextPage = ActionMenuRrpp.BUILDINGS;
            break;
            case ActionMenuRrpp.LIQUIDATION:
                nextPage = ActionMenuRrpp.LIQUIDATION;
            break;
            case ActionMenuRrpp.STATISTICS:
                nextPage = ActionMenuRrpp.STATISTICS;
            break;
            case ActionMenuRrpp.LOGOUT:
                nextPage = ActionMenuRrpp.LOGOUT;
            break;
            default: console.log('Acción no permitida en un usuario RRPP');
        }
        return nextPage;
    }

    private popoverActionPromotor(page) {
        let nextPage;
        switch(page){
            case ActionMenuPromotor.EVENTS:
                nextPage = ActionMenuPromotor.EVENTS;
            break;
            case ActionMenuPromotor.PROFILE:
                nextPage = ActionMenuPromotor.PROFILE;
            break;
            case ActionMenuPromotor.COMPANIES:
                nextPage = ActionMenuPromotor.COMPANIES;
            break;
            case ActionMenuPromotor.MY_EVENTS:
                nextPage = ActionMenuPromotor.MY_EVENTS;
            break;
            case ActionMenuPromotor.PENDING_RRPPS:
                nextPage = ActionMenuPromotor.PENDING_RRPPS;
            break;
            case ActionMenuPromotor.LIQUIDATION:
                nextPage = ActionMenuPromotor.LIQUIDATION;
            break;
            case ActionMenuPromotor.STATISTICS:
                nextPage = ActionMenuPromotor.STATISTICS;
            break;
            case ActionMenuPromotor.LOGOUT:
                nextPage = ActionMenuPromotor.LOGOUT;
            break;
            default: console.log('Acción no permitida en un usuario PROMOTOR');
        }
        return nextPage;
    }

    private popoverActionAdmin(page) {
        let nextPage;
        switch(page){
            case ActionMenuAdmin.EVENTS:
                nextPage = ActionMenuAdmin.EVENTS;
            break;
            case ActionMenuAdmin.PROFILE:
                nextPage = ActionMenuAdmin.PROFILE;
            break;
            case ActionMenuAdmin.COMPANIES:
                nextPage = ActionMenuAdmin.COMPANIES;
            break;
            case ActionMenuAdmin.LOGOUT:
                nextPage = ActionMenuAdmin.LOGOUT;
            break;
            default: console.log('Acción no permitida en un usuario ADMINISTRADOR');
        }
        return nextPage;
    }

    private initHeaderData() {
        this.headerData = {
            title:'Acceder',
            isLogged: false,
            rol: '',
            canGoBack: false
        }
    }

    private goAccess() {
        this.checkNavigationTypeAndPage(AccessPage);    // Refactorizar, tenemos un any para poder navegar a AccessPage
    }

    private goEvents() {
        this.checkNavigationTypeAndPage('EventsPage');
    }

    private goProfile() {
        this.checkNavigationTypeAndPage('ProfilePage');
    }

    private goMyBuildings() {
        this.checkNavigationTypeAndPage('RrppBuildingsPage');
    }

    private goMyLiquidation() {
        this.checkNavigationTypeAndPage('PromotorLiquidationPage');
    }

    private goMyGeneralStatistics() {
        this.checkNavigationTypeAndPage('PromotorCompanyStatisticsPage');
    }

    private goPendingCompanies() {
        this.checkNavigationTypeAndPage('AdminCompaniesPendingPage');
    }

    private logOut() {
        this.storage.clear();
        this.initHeaderData();
        this.nav.setRoot(AccessPage);
    }

    private goBack() {
        this.nav.pop();
    }
    
}
