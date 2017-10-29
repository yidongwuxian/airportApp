import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CityselComponent } from './citysel';

@NgModule({
  declarations: [
    CityselComponent,
  ],
  imports: [
    IonicPageModule.forChild(CityselComponent),
  ],
})
export class CityselPageModule {}
