import { Component,OnInit,OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { INITIAL_URL } from '../../store/root/root.actions';
import { Url, initialUrl } from '../../store/root/root.model';
import { HttpService } from '../../service/http.service';
import { FlightTabComponent } from '../../components/flighttab/flighttab';

@IonicPage()
@Component({
  selector: 'page-flightquery',
  templateUrl: 'flightquery.html',
  providers:[HttpService,FlightTabComponent]
})

export class FlightqueryPage implements OnInit, OnDestroy{
  flightData: Array<any>  = [];
  loadingSpnner: Boolean = true;
  imagePath: any;
  tagState: Observable<Url>;
  Url: Url;
  stopOver: Array<any> = [];
  istranCity: boolean = false;
  isstopCity: boolean = false;
  isShareIco: boolean = false;
  stopoverCityName: string;
  private tagStateSubscription: Subscription;
  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
              public alertCtrl: AlertController,
  	          private _HttpService: HttpService,
              public loadingCtrl: LoadingController,
              private store: Store<Url>) {
    this.tagState = store.select('Url');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightqueryPage');
  }

  ngOnInit(){
    this.tagStateSubscription = this.tagState.subscribe((state) => {
      this.Url = state;
    });
  	let routingType = this.navParams.get('routingType');
    let deptCity = this.navParams.get('deptCity');
	  let arrCity = this.navParams.get('arrCity');
    let deptStartDate = this.navParams.get('deptStartDate');
    let deptEndDate = this.navParams.get('deptEndDate');
    let seatClass = this.navParams.get('seatClass');
	  let adtCnt = this.navParams.get('adtCnt');
    let chdCnt = this.navParams.get('chdCnt');
    let infCnt = 0;
 


    let loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src='../assets/img/loading/loading.gif'>`,
      duration: 1000
    });
    loader.present();

    if(routingType == 'OW'){
      let OW_QUERY_URL = this.Url.baseurl+this.Url.shoppingurl+'?routingType='+routingType+'&deptCity='+deptCity+'&arrCity='+arrCity+'&deptStartDate='+
      deptStartDate+'&seatClass='+seatClass+'&adtCnt='+adtCnt+'&chdCnt='+chdCnt+'&infCnt='+infCnt+'&sortType=price_asc&temp='+Math.random().toString();

      this._HttpService.get(OW_QUERY_URL)
      .subscribe(
        (res) => { 
          if(res.status == '1001'){
            setTimeout(() => {
              loader.dismiss();
            }, 2000);
            this.flightData = res.data;
            for (let value of this.flightData) {
              this.stopOver = value.segments[0].stopOver;
              if(value.segments[0].shareFlightNo != ''){
                this.isShareIco = true;
              }else{
                this.isShareIco = false;
              }  
            }
            
            if(this.stopOver && this.stopOver.length !=0 ){
              let stopoverCity = '';
              for (let value of this.stopOver) {
                stopoverCity += value.stopAirport;
              }
              this.stopoverCityName = stopoverCity;
              this.isstopCity = true;
            }    
          }else{
            let msgAlert = this.alertCtrl.create({
               title: res.message,
               buttons: ['确定']
             });
             msgAlert.present();
          }           
        },
        (err) => console.log('err:'+err)
      );
    }
    if(routingType == 'RT'){

      let QT_QUERY_URL = this.Url.baseurl+this.Url.shoppingurl+'?routingType='+routingType+'&deptCity='+deptCity+'&arrCity='+arrCity+'&deptStartDate='+
        deptStartDate+'&deptEndDate='+deptEndDate+'&seatClass='+seatClass+'&adtCnt='+adtCnt+'&chdCnt='+chdCnt+'&infCnt='+infCnt+'&sortType=price_asc&temp='+Math.random().toString();

        this._HttpService.get(QT_QUERY_URL)
        .subscribe(
          (res) => {
            if(res.status == '1001'){
              setTimeout(() => {
                loader.dismiss();
              }, 2000);
              this.flightData = res.data;    
            }else{
              let msgAlert = this.alertCtrl.create({
                 title: res.message,
                 buttons: ['确定']
               });
               msgAlert.present();
            }           
          },
          (err) => console.log('err:'+err)
        )
    }
  }

  ngOnDestroy() {
    this.tagStateSubscription.unsubscribe();
  }

}
