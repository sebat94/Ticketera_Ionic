import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
// GMAPS
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    AgmCoreModule
  ],
})
export class ProfilePageModule {}
