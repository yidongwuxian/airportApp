var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
//component
import { CountComponent } from '../components/counter/counter';
import { FlightTabComponent } from '../components/flighttab/flighttab';
import { CityselComponent } from '../components/citysel/citysel';
import { FieldComponent } from '../components/field/field.component';
import { MsgTipComponent } from '../components/msgtip/msgtip';
import { MsgTipBdComponent } from '../components/msgtipbd/msgtipbd';
import { MsgIconComponent } from '../components/msgicon/msgicon';
import { FlightFilterComponent } from '../components/flightfilter/flightfilter';
import { ModalComponent } from '../components/modal/modal';
//pipe
import { CabinPipe, OrderStatusPipe, OtherStatusPipe } from '../pipe/';
//serice
import { AirportService, Contacts, HttpService, UtilsService } from '../service/';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                CountComponent,
                FlightTabComponent,
                CityselComponent,
                FieldComponent,
                MsgTipComponent,
                MsgTipBdComponent,
                MsgIconComponent,
                FlightFilterComponent,
                ModalComponent,
                CabinPipe,
                OrderStatusPipe,
                OtherStatusPipe
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp, {
                    backButtonText: '',
                    iconMode: 'ios',
                    mode: 'ios',
                }),
                StoreModule.provideStore({}),
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
                CountComponent,
                FlightTabComponent,
                CityselComponent,
                FieldComponent,
                MsgTipComponent,
                MsgTipBdComponent,
                MsgIconComponent,
                FlightFilterComponent
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
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map