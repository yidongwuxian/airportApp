import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-orderflight',
  templateUrl: 'orderflight.html',
})
export class OrderflightPage {

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderflightPage');
  }

}
