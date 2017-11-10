import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';                                                 
import { MyApp } from './app.component';
import 'rxjs/Rx';                                                                        
import { FormsModule, ReactiveFormsModule } from '@angular/forms';                                             
import { MultiPickerModule } from 'ion-multi-picker';
import { CalendarModule } from 'ion2-calendar';
//ngrx
import { StoreModule } from '@ngrx/store';
import { AduCounterReducer,ChdCounterReducer } from '../store/counter/counter.reducer';
//page
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { FlightqueryPage } from '../pages/flightquery/flightquery';
import { FlightdetailPage } from '../pages/flightdetail/flightdetail';
import { AddpassengerPage } from '../pages/addpassenger/addpassenger';
import { OrderflightPage } from '../pages/orderflight/orderflight';
import { RefundrulePage } from '../pages/refundrule/refundrule';
import { LoginPage } from '../pages/login/login';
import { UserCenterPage } from '../pages/usercenter/usercenter';
import { CityPage } from '../pages/city/city';

//component
import { CountComponent } from '../components/counter/counter';
import { FlightTabComponent } from '../components/flighttab/flighttab';
import { FieldComponent } from '../components/field/field.component';
import { MsgTipComponent } from '../components/msgtip/msgtip';
import { MsgTipBdComponent } from '../components/msgtipbd/msgtipbd';
import { MsgIconComponent } from '../components/msgicon/msgicon';
import { FlightFilterComponent } from '../components/flightfilter/flightfilter';
import { ModalComponent } from '../components/modal/modal';
import { FlightInfoComponent } from '../components/flightinfo/flightinfo';
import { TranscityComponent } from '../components/transcity/transcity';
import { DisCountComponent } from '../components/discount/discount';
//pipe
import { AirportPipe, CabinPipe, OrderStatusPipe, OtherStatusPipe, MinuesPipe } from '../pipe/';
//serice
import { AirportService, Contacts, HttpService, UtilsService } from '../service/';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage,
    FlightqueryPage,
    FlightdetailPage,
    AddpassengerPage,
    OrderflightPage,
    RefundrulePage,
    LoginPage,
    UserCenterPage,
    CityPage,
    CountComponent,
    FlightTabComponent,
    FieldComponent,
    MsgTipComponent,
    MsgTipBdComponent,
    MsgIconComponent,
    FlightFilterComponent,
    FlightInfoComponent,
    ModalComponent,
    TranscityComponent,
    DisCountComponent,
    CabinPipe, 
    OrderStatusPipe, 
    OtherStatusPipe,
    MinuesPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '', 
      iconMode: 'ios',
      mode: 'ios',
    }),
    StoreModule.provideStore({
   
    }),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
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
    SearchPage,
    FlightqueryPage,
    FlightdetailPage,
    AddpassengerPage,
    OrderflightPage,
    RefundrulePage,
    LoginPage,
    UserCenterPage,
    CityPage,
    CountComponent,
    FlightTabComponent,
    FieldComponent,
    MsgTipComponent,
    MsgTipBdComponent,
    MsgIconComponent,
    FlightFilterComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, 
      useClass: IonicErrorHandler
    },
    AirportService, 
    Contacts, 
    HttpService, 
    UtilsService
  ]
})
export class AppModule {}