import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewEventPage } from './new-event';

@NgModule({
  declarations: [
    NewEventPage,
  ],
  imports: [
    IonicPageModule.forChild(NewEventPage),
  ],
})
export class NewEventPageModule {}
