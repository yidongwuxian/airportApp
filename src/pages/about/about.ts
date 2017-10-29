import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  constructor(public navCtrl: NavController,
  	          public modalCtrl: ModalController) {}
}
