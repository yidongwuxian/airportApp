import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightqueryPage } from './flightquery';

@NgModule({
  declarations: [
    FlightqueryPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightqueryPage),
  ],
})
export class FlightqueryPageModule {}
