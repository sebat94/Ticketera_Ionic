import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
// NATIVE
//import { Geolocation, Geoposition } from '@ionic-native/geolocation';


@Injectable()
export class GeolocationProvider {

    // constructor(public platform: Platform,
    //             public geolocation: Geolocation) { }

    // geolocate(): Promise<Geoposition> {
    //     return this.platform.ready().then(() => this.geolocation.getCurrentPosition().then((position: Geoposition) => position));
    // }

}