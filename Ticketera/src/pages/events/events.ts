import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController , InfiniteScroll, Events } from 'ionic-angular';
// MODELS
import { IEventWithImages, OkResponseLogin, IFiltersResponse } from '../../models/response';
// PROVIDERS
import { EventProvider } from '../../providers/event';
import { UserHeaderProvider } from '../../providers/user-header/user-header';
import { Utils } from '../../utils/utils';


@IonicPage()
@Component({
    selector: 'page-events',
    templateUrl: 'events.html',
})
export class EventsPage {

    //events: IEventWithImages[] = [];      // FALTA AÑADIR ABAJO LA INTERFAZ COMPLETA
    dataUserLogged: OkResponseLogin;
    events: any[] = [];

    amount: number = 3;
    from: number = 0;
    finished: boolean = false;

    filters: IFiltersResponse = {};

    isLogged: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public eventProvider: EventProvider,
                public userHeaderProvider: UserHeaderProvider,
                public utils: Utils,
                public eventsPublishSubscribe: Events) { }

    ionViewWillEnter() {
        this.utils.getStoredDataUserLogged('Eventos', false).then(userLogged => this.dataUserLogged = userLogged);
        this.resetEventsLoaded();
        this.getEventsByPageableAndOptionalFiltered();
    }

    doRefresh(refresher){
        this.resetEventsLoaded();
        this.getEventsByPageableAndOptionalFiltered();
        refresher.complete();
    }

    doInfinite(infinite: InfiniteScroll) {
        this.getEventsByPageableAndOptionalFiltered(infinite);
    }

    private getEventsByPageableAndOptionalFiltered(infinite = null, filters = this.filters) {
        if(infinite) this.from += this.amount;
        this.eventProvider.getEventsByPageableAndOptionalFiltered(this.amount, this.from, filters).subscribe(result => {
            if(result.length === 0) return this.finished = true;
            for(let i in result) this.events.push(result[i])
            if(infinite) infinite.complete();
        }),
        (error) => console.log('Ha ocurrido un error | ', error);
    }

    private resetEventsLoaded() {
        this.events = [];
        this.from = 0;
        this.finished = false;
        this.filters = {};
    }

    openModal() {
        const modal = this.modalCtrl.create('ModalEventsFilterPage');
        modal.present();
        modal.onDidDismiss((filters: IFiltersResponse) => {
            if(filters){
                this.resetEventsLoaded();
                this.filters = filters;
                this.getEventsByPageableAndOptionalFiltered();
            }
        });
    }

    goEventInfo(event){
        this.eventsPublishSubscribe.publish('page:changed', 'EventInfoPage', event);
    }

}
