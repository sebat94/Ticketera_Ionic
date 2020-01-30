import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverAdminMenuPage } from './popover-admin-menu';

@NgModule({
  declarations: [
    PopoverAdminMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverAdminMenuPage),
  ],
})
export class PopoverAdminMenuPageModule {}
