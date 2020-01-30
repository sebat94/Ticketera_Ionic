import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEventsFilterPage } from './modal-events-filter';
// LIBRARIES
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ModalEventsFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEventsFilterPage),
    NgbModule
  ],
})
export class ModalEventsFilterPageModule {}
