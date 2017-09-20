import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';     //http服务
import { MyApp } from './app.component';
import 'rxjs/Rx';                                                                        //引入rxJs
import {FormsModule} from '@angular/forms';                                              //双向绑定
import { MultiPickerModule } from 'ion-multi-picker';
import { CalendarModule } from "ion2-calendar";
//page
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CalendarPage } from '../pages/calendar/calendar';
import { SearchPage } from '../pages/search/search';
import { CityselPage } from '../pages/citysel/citysel';
//component
import { ContactItemComponent } from '../component/contactList/contactList.component';
import { CountComponent } from '../component/counter/counter.component';

//pipe
import { SexReformPipe } from '../pipe/sexReform.pipe';
//import { OrdinalPipe } from './pipe/ordinal.pipe';
import { ToNullPipe } from '../pipe/toNull.pipe';
//import { WeekPipe } from './pipe/week.pipe';

import { CabinPipe } from '../pipe/cabin.pipe';
import { OrderStatusPipe } from '../pipe/orderStatus.pipe';
import { OtherStatusPipe } from '../pipe/otherStatus.pipe';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CalendarPage,
    SearchPage,
    CityselPage,

    ContactItemComponent,
    CountComponent,
    SexReformPipe,
    //OrdinalPipe
    ToNullPipe,
    //WeekPipe
    CabinPipe,
    OrderStatusPipe,
    OtherStatusPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule,
    MultiPickerModule,
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CalendarPage,
    SearchPage,
    CityselPage,
    ContactItemComponent,
    CountComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
