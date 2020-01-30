import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MyApp } from './app.component';

// INTERCEPTOR
import { AuthInterceptor } from '../interceptor/auth.interceptor';
// PAGES NO LAZYLOAD
import { AccessPage } from '../pages/access/access';
// PROVIDERS
import { AuthProvider } from '../providers/auth';
import { UserProvider } from '../providers/user';
import { EventProvider } from '../providers/event';
import { TicketProvider } from '../providers/ticket';
import { BuildingProvider } from '../providers/building';
import { CompanyProvider } from '../providers/company';
import { StatisticsProvider } from '../providers/statistics';
import { CityProvider } from '../providers/city';
import { Utils } from '../utils/utils';
// NATIVE
import { IonicStorageModule } from '@ionic/storage';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
//import { GeolocationProvider } from '../providers/geolocation';
// LIBRARIES
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserHeaderProvider } from '../providers/user-header/user-header';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    MyApp,
    AccessPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    NgxChartsModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccessPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider,
    EventProvider,
    TicketProvider,
    BuildingProvider,
    CompanyProvider,
    StatisticsProvider,
    CityProvider,
    UserHeaderProvider,
    //GeolocationProvider,
    BrowserAnimationsModule,
    Utils,
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    LaunchNavigator,
    Camera,
    BarcodeScanner,
    ScreenOrientation
  ]
})
export class AppModule {}
