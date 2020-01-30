import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalTicketQrPage } from './modal-ticket-qr';

@NgModule({
  declarations: [
    ModalTicketQrPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalTicketQrPage),
  ],
})
export class ModalTicketQrPageModule {}
