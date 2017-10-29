import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightdetailPage } from './flightdetail';

@NgModule({
  declarations: [
    FlightdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightdetailPage),
  ],
})
export class FlightdetailPageModule {}
