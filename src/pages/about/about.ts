import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { convertEnumToColumn } from 'ion-multi-picker';
enum Cabin {
	经济舱,商务舱,头等舱
}
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  cabin: Cabin;
  Cabin;
  cabins: any[];
  dependentColumns: any[];
  currentDate: String;
  constructor(public navCtrl: NavController,
  	          public modalCtrl: ModalController) {
  	//cabin start
  	this.cabin = Cabin.经济舱;
	this.Cabin = Cabin;
	this.cabins = convertEnumToColumn(this.Cabin);
	//cabin end
	//time start
	this.currentDate = (new Date()).toISOString();
    //time end
    //adult start
    this.dependentColumns = [
			{
				columnWidth: '100px',
				options: [
					{ text: '成人1', value: '1' },
					{ text: '成人2', value: '2' },
					{ text: '成人3', value: '3' },
					{ text: '成人4', value: '4' },
					{ text: '成人5', value: '5' },
					{ text: '成人6', value: '6' },
					{ text: '成人7', value: '7' },
					{ text: '成人8', value: '8' },
					{ text: '成人9', value: '9' },
					{ text: '成人10', value: '10' }]
			},
			{
				columnWidth: '100px',
				options: [
					{ text: '儿童0', value: '0', parentVal: '1' },
					{ text: '儿童1', value: '1', parentVal: '1' },
					
					{ text: '儿童0', value: '0', parentVal: '2' },
					{ text: '儿童1', value: '1', parentVal: '2' },
					{ text: '儿童2', value: '2', parentVal: '2' },

					{ text: '儿童0', value: '0', parentVal: '3' },
					{ text: '儿童1', value: '1', parentVal: '3' },
					{ text: '儿童2', value: '2', parentVal: '3' },
					{ text: '儿童3', value: '3', parentVal: '3' },
					
					{ text: '儿童0', value: '0', parentVal: '4' },
					{ text: '儿童1', value: '1', parentVal: '4' },
					{ text: '儿童2', value: '2', parentVal: '4' },
					{ text: '儿童3', value: '3', parentVal: '4' },
					{ text: '儿童4', value: '4', parentVal: '4' },

					{ text: '儿童0', value: '0', parentVal: '5' },
					{ text: '儿童1', value: '1', parentVal: '5' },
					{ text: '儿童2', value: '2', parentVal: '5' },
					{ text: '儿童3', value: '3', parentVal: '5' },
					{ text: '儿童4', value: '4', parentVal: '5' },
					{ text: '儿童5', value: '5', parentVal: '5' },

					{ text: '儿童0', value: '0', parentVal: '6' },
					{ text: '儿童1', value: '1', parentVal: '6' },
					{ text: '儿童2', value: '2', parentVal: '6' },
					{ text: '儿童3', value: '3', parentVal: '6' },
					{ text: '儿童4', value: '4', parentVal: '6' },
					{ text: '儿童5', value: '5', parentVal: '6' },
					{ text: '儿童6', value: '6', parentVal: '6' },

					{ text: '儿童0', value: '0', parentVal: '7' },
					{ text: '儿童1', value: '1', parentVal: '7' },
					{ text: '儿童2', value: '2', parentVal: '7' },
					{ text: '儿童3', value: '3', parentVal: '7' },
					{ text: '儿童4', value: '4', parentVal: '7' },
					{ text: '儿童5', value: '5', parentVal: '7' },
					{ text: '儿童6', value: '6', parentVal: '7' },
					{ text: '儿童7', value: '7', parentVal: '7' },

					{ text: '儿童0', value: '0', parentVal: '8' },
					{ text: '儿童1', value: '1', parentVal: '8' },
					{ text: '儿童2', value: '2', parentVal: '8' },
					{ text: '儿童3', value: '3', parentVal: '8' },
					{ text: '儿童4', value: '4', parentVal: '8' },
					{ text: '儿童5', value: '5', parentVal: '8' },
					{ text: '儿童6', value: '6', parentVal: '8' },
					{ text: '儿童7', value: '7', parentVal: '8' },
					{ text: '儿童8', value: '8', parentVal: '8' },

					{ text: '儿童0', value: '0', parentVal: '9' },
					{ text: '儿童1', value: '1', parentVal: '9' },
					{ text: '儿童2', value: '2', parentVal: '9' },
					{ text: '儿童3', value: '3', parentVal: '9' },
					{ text: '儿童4', value: '4', parentVal: '9' },
					{ text: '儿童5', value: '5', parentVal: '9' },
					{ text: '儿童6', value: '6', parentVal: '9' },
					{ text: '儿童7', value: '7', parentVal: '9' },
					{ text: '儿童8', value: '8', parentVal: '9' },
					{ text: '儿童9', value: '9', parentVal: '9' },

					{ text: '儿童0', value: '0', parentVal: '10' },
					{ text: '儿童1', value: '1', parentVal: '10' },
					{ text: '儿童2', value: '2', parentVal: '10' },
					{ text: '儿童3', value: '3', parentVal: '10' },
					{ text: '儿童4', value: '4', parentVal: '10' },
					{ text: '儿童5', value: '5', parentVal: '10' },
					{ text: '儿童6', value: '6', parentVal: '10' },
					{ text: '儿童7', value: '7', parentVal: '10' },
					{ text: '儿童8', value: '8', parentVal: '10' },
					{ text: '儿童9', value: '9', parentVal: '10' },
					{ text: '儿童10', value: '10', parentVal: '10' }]
			}
	]	
    //adult end
  }  
  
}
