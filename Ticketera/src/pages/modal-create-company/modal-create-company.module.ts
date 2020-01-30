import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCreateCompanyPage } from './modal-create-company';

@NgModule({
  declarations: [
    ModalCreateCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCreateCompanyPage),
  ],
})
export class ModalCreateCompanyPageModule {}
