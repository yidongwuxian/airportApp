import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { AirportService } from '../../service/airport.service';

/**
 * Generated class for the FlightqueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flightquery',
  templateUrl: 'flightquery.html',
  providers:[HttpService,AirportService]
})
export class FlightqueryPage implements OnInit{
  flightData: Array<any>  = [];
  loadingSpnner: Boolean = true;
  imagePath: any;
  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          private _HttpService: HttpService,
              private _AirportService: AirportService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightqueryPage');
  }

  ngOnInit(){
  	let routingType = this.navParams.get('routingType');
    let deptCity = this.navParams.get('deptCity');
	  let arrCity = this.navParams.get('arrCity');
    let deptStartDate = this.navParams.get('deptStartDate');
    let deptEndDate = this.navParams.get('deptEndDate');
    let seatClass = this.navParams.get('seatClass');
	  let adtCnt = this.navParams.get('adtCnt');
    let chdCnt = this.navParams.get('chdCnt');
    let infCnt = this.navParams.get('infCnt');
    let deptCityName = this.navParams.get('deptCityName');
	  let arrCityName = this.navParams.get('arrCityName');
    
    const countryType = sessionStorage.getItem('countryType');
    console.log('countryType:'+countryType);

    if(routingType = 'OW'){
    	let OW_QUERY_URL = 'http://192.168.1.252:3000/shopping/query?routingType='+routingType+'&deptCity='+deptCity+'&arrCity='+arrCity+'&deptStartDate='+
      deptStartDate+'&seatClass='+seatClass+'&adtCnt='+adtCnt+'&chdCnt='+chdCnt+'&infCnt='+infCnt+'&deptCityName='+
      deptCityName+'&arrCityName='+arrCityName+'&temp='+Math.random().toString();
      
      
      this._HttpService.get(OW_QUERY_URL)
      .subscribe(
        (res) => { 
          this.flightData = res.data;              
        },
        (err) => console.log('err:'+err)
      );
    }else{
    	let QT_QUERY_URL = 'http://192.168.1.252:3000/shopping/query?routingType='+routingType+'&deptCity='+deptCity+'&arrCity='+arrCity+'&deptStartDate='+
        deptStartDate+'&deptEndDate='+deptEndDate+'&seatClass='+seatClass+'&adtCnt='+adtCnt+'&chdCnt='+chdCnt+'&infCnt='+infCnt+'&deptCityName='+
        deptCityName+'&arrCityName='+arrCityName+'&temp='+Math.random().toString();
        this._HttpService.get(QT_QUERY_URL)
        .subscribe(
          (res) => {
            this.flightData = res.data;
          },
          (err) => console.log('err:'+err)
        )

    }
    


  }

  

}
