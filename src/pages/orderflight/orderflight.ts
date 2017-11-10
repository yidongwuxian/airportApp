import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FlightInfoComponent } from '../../components/flightinfo/flightinfo';
import { AddpassengerPage } from '../../pages/addpassenger/addpassenger';

import { MinuesPipe } from '../../pipe/minues.pipe';
import { UtilsService } from '../../service/utils.service';
@IonicPage()
@Component({
  selector: 'page-orderflight',
  templateUrl: 'orderflight.html',
  providers:[UtilsService,MinuesPipe]
})
export class OrderflightPage implements OnInit{
  flightObjFrom:any;
  flightObjTo: any;
  flightMess: any;
  priceMess: any;
  flightSeg:any;
  priceSeg: any;
  tripDay: string = '';
  tripWeek: string = '';
  tripDaySeg: string = '';
  tripWeekSeg: string = '';
  totalTimes: string = '';
  totalFlightTimes: string = '';
  tranCity: string;
  istranCity: boolean = false;
  isstopCity: boolean = false;
  stopoverCityName: string;
  routingType: string;
  countryType: string;
  isShow: boolean = false;
  isDisplay: boolean = true;
  on: boolean = true;
  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  private _UtilsService: UtilsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderflightPage');
  }
   
  ngOnInit(){


  	// this.flightObjFrom=JSON.parse(sessionStorage.getItem("flightObjFrom")).data;
   //  this.flightObjTo  =JSON.parse(sessionStorage.getItem("flightObjTo")).data;
  	// this.routingType  = sessionStorage.getItem('routingType');
   //  this.countryType  = sessionStorage.getItem('countryType');
  	
    
   //  if(this.countryType === 'inland'){
   //    this.flightMess   = this.flightObjFrom.segments;
   //    this.priceMess    = this.flightObjFrom.prices;
   //    if(this.flightObjTo){
   //      this.flightSeg    = this.flightObjTo.data.segments;
   //      this.priceSeg     = this.flightObjTo.data.prices;
   //    }
      
   //  }else{
   //    this.flightMess   = this.flightObjTo.data.segments;
   //    this.priceMess    = this.flightObjTo.data.prices;
   //    this.flightSeg    = this.flightObjTo.data.segments;
   //    this.priceSeg     = this.flightObjTo.data.prices;
   //  }


   //  if(this.flightObjTo){
   //    this.isDisplay = false;
   //  }



  	// for (let value of this.flightMess) {
  	//   this.tripDay        = value.fromDate.substr(5,5);
   //    this.tripWeek       = this._UtilsService.getWeek(value.fromDate.substr(0,10), 1)
   //    this.totalTimes     = value.flightDuration + 'm';
   //    let rangeSegmentCount = this.flightObjFrom.rangeSegmentCount;
   //    let stopOver:Array<any> = value.stopOver;
   //    let flightCount:number;
   //    if(rangeSegmentCount.length > 3){
   //      if(this.routingType == 'OW'){
   //        flightCount = rangeSegmentCount.split(',')[0].substr(-1);

   //      }else{
   //        flightCount = rangeSegmentCount.split(',')[1].substr(-1); 
   //      }
   //    }else{
   //      flightCount = rangeSegmentCount.substr(-1);
   //    }
   //    if(flightCount > 1){
   //       this.tranCity = this.flightMess[0].toAirport;
   //       this.istranCity = true;
   //    }else{
   //       if(stopOver && stopOver.length !=0 ){
   //          let stopoverCity = '';
   //          for (let stopItem of stopOver) {
   //            stopoverCity += stopItem.stopAirport;
   //          }
   //          this.stopoverCityName = stopoverCity;
   //          this.isstopCity = true;
   //      }    
   //    }

   //  }
   //  for(let item of this.priceMess){
   //    this.cabinDetail = item.cabinList;
   //  }

   //  if(this.flightObjTo){
   //    for (let value of this.flightSeg) {
   //        this.tripDaySeg        = value.fromDate.substr(5,5);
   //        this.tripWeekSeg       = this._UtilsService.getWeek(value.fromDate.substr(0,10), 1)
   //        this.totalFlightTimes     = value.flightDuration + 'm';
   //        let rangeSegmentCount = this.flightObjTo.data.rangeSegmentCount;
   //        let stopOver:Array<any> = value.stopOver;
   //        let flightCount:number;
   //        if(rangeSegmentCount.length > 3){
   //          if(this.routingType == 'OW'){
   //            flightCount = rangeSegmentCount.split(',')[0].substr(-1);
   //          }else{
   //            flightCount = rangeSegmentCount.split(',')[1].substr(-1); 
   //          }
   //        }else{
   //          flightCount = rangeSegmentCount.substr(-1);
   //        }
   //        if(flightCount > 1){
   //           this.tranCity = this.flightSeg[0].toAirport;
   //           this.istranCity = true;
   //        }else{
   //           if(stopOver && stopOver.length !=0 ){
   //              let stopoverCity = '';
   //              for (let stopItem of stopOver) {
   //                stopoverCity += stopItem.stopAirport;
   //              }
   //              this.stopoverCityName = stopoverCity;
   //              this.isstopCity = true;
   //          }    
   //        }
   //    }
   //    for(let item of this.priceSeg){
   //      this.cabinDetailSeg = item.cabinList;
   //    }
   //  }

     
  } 

  // shrink(){
  //   this.isShow = !this.isShow;
  // }
  goPas(){
    this.navCtrl.push(AddpassengerPage);
  }

}
