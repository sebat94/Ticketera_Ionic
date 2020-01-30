import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RrppEventStatisticsPage } from './rrpp-event-statistics';
// LIBRARIES
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    RrppEventStatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(RrppEventStatisticsPage),
    NgxChartsModule
  ],
})
export class RrppEventStatisticsPageModule {}
