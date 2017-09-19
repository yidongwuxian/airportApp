import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CityselPage } from './citysel';

@NgModule({
  declarations: [
    CityselPage,
  ],
  imports: [
    IonicPageModule.forChild(CityselPage),
  ],
})
export class CityselPageModule {}
