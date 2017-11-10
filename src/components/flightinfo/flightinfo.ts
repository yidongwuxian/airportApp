import { Component,OnInit,Input } from '@angular/core';
import { TranscityComponent } from '../../components/transcity/transcity';
import { MinuesPipe } from '../../pipe/minues.pipe';
import { UtilsService } from '../../service/utils.service';
@Component({
  selector: 'flightinfo',
  templateUrl: 'flightinfo.html',
  providers:[UtilsService,MinuesPipe]
})
export class FlightInfoComponent implements OnInit{
  @Input()  switch: boolean;
  flightObjFrom: any;
  flightObjTo:  any;
  fromData: any;
  toData: any;
  flightFromSeg: any;
  flightToSeg: any;
  cabinDetail: any;
  cabinDetailSeg: any;
  fromTxt: string = 'from';
  toTxt: string = 'to';
  tripCountry: string = '';
  tripCountrySeg: string = '';
  tripDay: string = '';
  tripDaySeg: string = '';
  tripWeek: string = '';
  tripWeekSeg: string = '';
  totalTimes: any;
  totalTimesSeg: any;
  stopOver:Array<any> = [];
  stopOverSeg: Array<any> = [];
  isFromShow: boolean = false;
  isToShow: boolean = false;
  isSwitch: boolean = false;
  isDisplay: boolean = false;
  constructor(private _UtilsService: UtilsService) {
    console.log('Hello FlightinfoComponent Component');
  }

  ngOnInit(){
  	  this.flightObjFrom = JSON.parse(sessionStorage.getItem("flightObjFrom"));
      this.flightObjTo   = JSON.parse(sessionStorage.getItem("flightObjTo"));
      this.flightDataFrom(this.flightObjFrom.data);
      this.flightFromSeg  = this.flightObjFrom.data.segments;
      this.fromData = this.flightObjFrom.data;

      if(this.flightObjTo){
        this.flightDataTo(this.flightObjTo.data);
        this.flightToSeg = this.flightObjTo.data.segments;
        this.toData = this.flightObjTo.data;
        this.isDisplay = true;
      }

      if(this.switch  === true){
      	this.isSwitch = true;
      	this.isFromShow = false;
      	this.isToShow = false;
      }else{
      	this.isSwitch = false;
      	this.isFromShow = true;
      	this.isToShow = true;
      }
  }

  flightDataFrom(data){
      let datas   = data.segments;
      let priceMess = data.prices;
      let rangeSegmentCount = data.rangeSegmentCount;
      let flightTest:number;

      for(let m of rangeSegmentCount){
      	 if(parseInt(m.length) > 3){ 
	        flightTest = rangeSegmentCount.split(',')[0].substr(-1);
	      }else{
	        flightTest = rangeSegmentCount.substr(-1);
	      } 
      }

     
      if(flightTest > 1){
        this.tripCountry    = datas[0].fromCityCn + '-' + datas[datas.length-1].toCityCn;
        this.tripDay        = datas[0].fromDate.substr(5,5);
        this.tripWeek       = this._UtilsService.getWeek(datas[0].fromDate.substr(0,10), 1)
      }else{
        this.tripCountry    = datas[0].fromCityCn + '-' + datas[0].toCityCn;
        this.tripDay        = datas[0].fromDate.substr(5,5);
        this.tripWeek       = this._UtilsService.getWeek(datas[0].fromDate.substr(0,10), 1)   
      }
     
      let tempDuration:number = 0;
      for(let k=0; k<datas.length; k++){
        tempDuration += datas[k].flightDuration;
      }  
      this.totalTimes     =  tempDuration ;


      for(let item of priceMess){
	    this.cabinDetail = item.cabinList;
	  }
  }

  flightDataTo(data){
    let datas   = data.segments; 
    let priceMess = data.prices;
    let rangeSegmentCount = data.rangeSegmentCount;
    let flightTest:number;
      if(parseInt(data.rangeSegmentCount.length) > 3){ 
        flightTest = rangeSegmentCount.split(',')[1].substr(-1);
      }else{
        flightTest = rangeSegmentCount.substr(-1);
      }
      if(flightTest > 1){
        this.tripCountrySeg    = datas[datas.length-1].fromCityCn + '-' + datas[datas.length-1].toCityCn;
        this.tripDaySeg        = datas[datas.length-1].toDate.substr(5,5);
        this.tripWeekSeg       = this._UtilsService.getWeek(datas[datas.length-1].fromDate.substr(0,10), 1)
      }else{
        this.tripCountrySeg    = datas[0].fromCityCn + '-' + datas[0].toCityCn;
        this.tripDaySeg        = datas[0].toDate.substr(5,5);
        this.tripWeekSeg       = this._UtilsService.getWeek(datas[0].fromDate.substr(0,10), 1)   
      }
      let tempDuration:number = 0;
      for (let k in datas) {
        tempDuration += datas[k].flightDuration;
      }
      this.totalTimesSeg     = tempDuration;

      for(let item of priceMess){
	    this.cabinDetailSeg = item.cabinList;
	  }
  }

  shrinkfrom(){
    this.isFromShow = !this.isFromShow;
  }

  shrinkto(){
    this.isToShow = !this.isToShow;
  }

}
