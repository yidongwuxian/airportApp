import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';

@NgModule({
  declarations: [
    AboutPage
  ],
  entryComponents: [
    AboutPage
  ],
  imports: [
    IonicPageModule
  ],
  exports: [
    IonicPageModule
  ]
})
export class AboutPageModule {}
