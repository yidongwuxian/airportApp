import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { MsgTipBdComponent } from './msgtipbd';

@NgModule({
  declarations: [
    MsgTipBdComponent,
  ],
  entryComponents: [
    MsgTipBdComponent,
  ],
  imports: [
    IonicPageModule
  ],
  exports: [
    IonicPageModule
  ]
})
export class MsgTipBdComponentModule {}
