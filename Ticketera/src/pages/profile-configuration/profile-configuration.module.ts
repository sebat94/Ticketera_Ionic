import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileConfigurationPage } from './profile-configuration';

@NgModule({
  declarations: [
    ProfileConfigurationPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileConfigurationPage),
  ],
})
export class ProfileConfigurationPageModule {}
