import { NgModule } from '@angular/core';
/*-- GOOGLE MAPS --*/
import { AgmCoreModule } from '@agm/core';
import { GmapComponent } from './gmap/gmap.component';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDFWh2XOwDkgfE1xuT0DZ9GBgZB_N5-NHo'
    })
  ],
  declarations: [
    GmapComponent
  ],
  exports: [
    GmapComponent
  ]
})
export class SharedModule { }
