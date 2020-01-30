import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCreateTypeticketPage } from './modal-create-typeticket';

@NgModule({
  declarations: [
    ModalCreateTypeticketPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCreateTypeticketPage),
  ],
})
export class ModalCreateTypeticketPageModule {}
