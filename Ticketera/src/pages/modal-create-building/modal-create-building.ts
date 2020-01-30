import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
// PROVIDERS
import { BuildingProvider } from '../../providers/building';
import { CityProvider } from '../../providers/city';
import { CompanyProvider } from '../../providers/company';
//import { GeolocationProvider } from '../../providers/geolocation';
// NATIVE
import { Geoposition } from '@ionic-native/geolocation';


@IonicPage()
@Component({
    selector: 'page-modal-create-building',
    templateUrl: 'modal-create-building.html',
})
export class ModalCreateBuildingPage {

    building: {company: number, address: string, lat: number, lon: number, name: string, city: number} = {
        company: 0,
        address: '',
        lat: 0,
        lon: 0,
        name: '',
        city: 0
    };

    companies: any = [];
    cities: any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public cityProvider: CityProvider,
                public companyProvider: CompanyProvider,
                public buildingProvider: BuildingProvider) {
    }
    // public geolocationProvider: GeolocationProvider

    ionViewWillEnter() {
        this.companyProvider.getAllCompaniesOfLoggedPromotor().subscribe(companies => this.companies = companies);
        this.cityProvider.getAllCities().subscribe(cities =>  this.cities = cities);
        // this.geolocationProvider.geolocate().then((geoposition: Geoposition) => {
        //     this.building.lat = geoposition.coords.latitude;
        //     this.building.lon = geoposition.coords.longitude;
        // });
    }

    createCompany() {
        this.buildingProvider.createBuildingOfCompanyByPromotor(this.building).subscribe((message: string) => {
            this.viewCtrl.dismiss(message);
        });
    }

    cancelCreateCompany() {
        this.viewCtrl.dismiss();
    }

}
