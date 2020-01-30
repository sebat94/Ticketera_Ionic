import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromotorCompaniesPage } from './promotor-companies';

@NgModule({
  declarations: [
    PromotorCompaniesPage,
  ],
  imports: [
    IonicPageModule.forChild(PromotorCompaniesPage),
  ],
})
export class PromotorCompaniesPageModule {}
