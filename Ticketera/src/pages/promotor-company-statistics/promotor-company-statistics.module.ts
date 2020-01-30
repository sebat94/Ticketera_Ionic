import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromotorCompanyStatisticsPage } from './promotor-company-statistics';
// LIBRARIES
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
    declarations: [
        PromotorCompanyStatisticsPage,
    ],
    imports: [
        IonicPageModule.forChild(PromotorCompanyStatisticsPage),
        NgxChartsModule
    ],
})
export class PromotorCompanyStatisticsPageModule {}
