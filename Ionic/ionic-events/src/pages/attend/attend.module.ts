import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendPage } from './attend';

@NgModule({
  declarations: [
    AttendPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendPage),
  ],
})
export class AttendPageModule {}
