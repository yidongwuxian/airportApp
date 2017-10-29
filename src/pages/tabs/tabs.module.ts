import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';

@NgModule({
  declarations: [
    TabsPage,
  ],
  entryComponents: [
    TabsPage,
  ],
  imports: [
    IonicPageModule
  ],
  exports: [
    IonicPageModule
  ]
})
export class TabsPageModule {}
