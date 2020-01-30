import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCompaniesPendingPage } from './admin-companies-pending';

@NgModule({
  declarations: [
    AdminCompaniesPendingPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCompaniesPendingPage),
  ],
})
export class AdminCompaniesPendingPageModule {}
