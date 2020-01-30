import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RrppEventsBuildingPage } from './rrpp-events-building';

@NgModule({
  declarations: [
    RrppEventsBuildingPage,
  ],
  imports: [
    IonicPageModule.forChild(RrppEventsBuildingPage),
  ],
})
export class EventsBuildingPageModule {}
