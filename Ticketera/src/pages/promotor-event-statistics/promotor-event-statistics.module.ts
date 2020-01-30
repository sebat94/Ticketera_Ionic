import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromotorEventStatisticsPage } from './promotor-event-statistics';
import { CommonModule } from '@angular/common';
// LIBRARIES
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    PromotorEventStatisticsPage
  ],
  imports: [
    IonicPageModule.forChild(PromotorEventStatisticsPage),
    NgxChartsModule
  ]
})
export class PromotorEventStatisticsPageModule {}
