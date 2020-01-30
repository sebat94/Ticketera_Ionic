import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCreateBuildingPage } from './modal-create-building';
// NATIVE
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    ModalCreateBuildingPage
  ],
  imports: [
    IonicPageModule.forChild(ModalCreateBuildingPage)
  ]
})
export class ModalCreateBuildingPageModule {}
