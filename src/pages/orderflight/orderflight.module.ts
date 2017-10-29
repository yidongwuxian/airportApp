import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderflightPage } from './orderflight';

@NgModule({
  declarations: [
    OrderflightPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderflightPage),
  ],
})
export class OrderflightPageModule {}
