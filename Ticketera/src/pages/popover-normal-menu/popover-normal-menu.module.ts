import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverNormalMenuPage } from './popover-normal-menu';

@NgModule({
  declarations: [
    PopoverNormalMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverNormalMenuPage),
  ],
})
export class PopoverNormalMenuPageModule {}
