import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventLocationPage } from './event-location';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    EventLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(EventLocationPage),
    SharedModule
  ],
})
export class EventLocationPageModule {}
