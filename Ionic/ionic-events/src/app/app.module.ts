import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

// INTERCEPTOR
import { AuthInterceptor } from '../interceptors/auth.interceptor';

// PROVIDERS
import { UserProvider } from '../providers/user/user';
import { AuthProvider } from '../providers/auth/auth';
import { EventProvider } from '../providers/event/event';

// PAGES
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

// NATIVE
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';

// GMAPS
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDFWh2XOwDkgfE1xuT0DZ9GBgZB_N5-NHo'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    HttpClientModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AuthProvider,
    EventProvider,
    Camera
  ],
  exports: [
    AgmCoreModule
  ]
})
export class AppModule {}
