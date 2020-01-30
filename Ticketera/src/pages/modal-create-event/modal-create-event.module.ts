import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCreateEventPage } from './modal-create-event';

@NgModule({
  declarations: [
    ModalCreateEventPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCreateEventPage),
  ],
})
export class ModalCreateEventPageModule {}
