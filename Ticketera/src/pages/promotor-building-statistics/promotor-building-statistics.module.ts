import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromotorBuildingStatisticsPage } from './promotor-building-statistics';
// LIBRARIES
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    PromotorBuildingStatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(PromotorBuildingStatisticsPage),
    NgxChartsModule
  ],
})
export class PromotorBuildingStatisticsPageModule {}
