import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPage } from './location';
// GMAPS
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    LocationPage
  ],
  imports: [
    IonicPageModule.forChild(LocationPage),
    AgmCoreModule
  ]
})
export class LocationPageModule {}
