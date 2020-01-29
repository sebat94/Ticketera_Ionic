import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OptionsProfilePage } from './options-profile';

@NgModule({
  declarations: [
    OptionsProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(OptionsProfilePage),
  ],
})
export class OptionsProfilePageModule {}
