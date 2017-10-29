import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MsgTipComponent } from './msgtip';

@NgModule({
  declarations: [
    MsgTipComponent,
  ],
   entryComponents: [
    MsgTipComponent,
  ],
  imports: [
    IonicPageModule
  ],
  exports: [
    IonicPageModule
  ]
})
export class MsgTipComponentModule {}
