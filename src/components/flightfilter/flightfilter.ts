import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { UtilsService } from '../../service/utils.service';
import * as _ from 'lodash';
@Component({
  selector: 'ex-filter',
  templateUrl:'./flightfilter.html',
  providers:[HttpService,UtilsService]
})

export class FlightFilterComponent implements OnInit{
  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();
  Filters: Array<any>  = [];
  selItem: Number = 0;
  FilterLens: Number;
  result: Array<any>  = [];
  cabinArrs: Array<any> = [];
  timeDepArrs: Array<any> = [];
  timeArrArrs: Array<any> = [];
  isTimeIco: boolean = false;
  isAirCompanyIco: boolean = false;
  isCabinIco: boolean = false;
  isAirportIco: boolean = false;
  index:any;
  timeArrs: Array<any> = [];
  segmentsData: any;
  fromDate: string;
  toDate: string;
  resultData: any;
  timeOption: boolean = false;
  airDepArrs: any;
  airArrArrs: any;
  airDepArr: Array<any> = [];
  airArrArr: Array<any> = [];
  airCompanyDepArr: Array<any> = [];
  airCompanyArrArr: Array<any> = [];
  flightData: any;
  isDireFlight: boolean = true;
  isShareFlight: boolean = true;
  flightCount: any;
  timeAllOption: any;
  AirAllDepOption: any;
  AirAllArrOption: any;
  airportAllOption: any;
  resultLen: number;
  flightSegs: any;
  direFlight: boolean;
  shareFlight: boolean;
  timeUp: string = '';
  timeDown: string = '';
  flag:boolean = true;
  filterLen: number;
  temporaryData: Array<any> = [];
  senderData: Array<any> = [];
  routingType: string;
  depTimes: any = { lower: 0, upper: 100 };
  arrTimes: any = { lower: 0, upper: 100 };
  depStartTime: string = '00:00';
  depEndTime: string = '24:00';
  arrStartTime: string = '00:00';
  arrEndTime: string = '24:00';
  isInland: boolean = true;
  isInternational: boolean = true;
  countryType: string;

  fromTimeData: Array<any> = [];
  toTimeData: Array<any> = [];
  originflightData: any;
  constructor(public navCtrl: NavController,
              private _HttpService: HttpService,
              private _UtilsService: UtilsService){}

  ngOnInit(){
    this.countryType = sessionStorage.getItem('countryType');
    if(this.countryType === 'inland'){
      this.isInland = true;
      this.isInternational = false;
    }
    if(this.countryType === 'international'){
      this.isInland = false;
      this.isInternational = true;
    }

     sessionStorage.removeItem("resultData");
     this.originflightData = JSON.parse(sessionStorage.getItem('flightData'));
     if(this.originflightData){
       this.flightData  = this.originflightData.data;
     }
     
    if(this.flightData){
      this.resultLen = _.size(this.flightData);

      [...this.flightData].forEach((k,i) => {
    
        if(k.rangeSegmentCount.length > 3){
          this.flightCount = k.rangeSegmentCount.split(",")[0].substr(-1);
        }else{
          this.flightCount = k.rangeSegmentCount.split("-")[1].substr(-1);
        }

        if(this.flightCount > 1){
          this.isDireFlight = false;
        }else{
          this.isDireFlight = true;
        }

        this.flightSegs = k.segments;
        [...this.flightSegs].forEach((item,n) => {
            let fromCity = JSON.parse(localStorage.getItem('fromCity'));
            let toCity   = JSON.parse(localStorage.getItem('toCity'));
            
            if(item.fromCityCn === fromCity.cityName){
              
              let airCompanyDepObj = {
                "value":item.airlineChn,
                "images": item.flightNo.substr(0,2),
                "airportcode": item.flightNo.substr(0,2),
                "airportOption": false
              }
              let airCompanyArrAll = {
                "value":'不限',
                "images":'BLANK',
                "airportcode": '',
                "airportOption": true
              } 
              this.airCompanyDepArr.push(airCompanyDepObj);
              let uniqueObj = this._UtilsService.unique(this.airCompanyDepArr,'value');
              let underDatas  = this._UtilsService.preArrays(uniqueObj,airCompanyArrAll);
              this.Filters = underDatas;

              let airDepObject = {
                "value":item.fromAirportCn,
                "depcode": item.fromAirport,
                "airDepOption": false
              } 
              let airDepAll = {
                "value":'不限',
                "depcode": '',
                "airDepOption": true
              } 
              this.airDepArr.push(airDepObject);
              let uniqueData = this._UtilsService.unique(this.airDepArr,'value');
              let underData  = this._UtilsService.preArrays(uniqueData,airDepAll);
              this.airDepArrs = underData;
            }
          
            if(item.toCityCn === toCity.cityName){
              let airCompanyArrObj = {
                "value":item.airlineChn,
                "images": item.flightNo.substr(0,2),
                "airportcode": item.flightNo.substr(0,2),
                "airportOption": false
              }
              let airCompanyArrAll = {
                "value":'不限',
                "images":'BLANK',
                "airportcode": '',
                "airportOption": true
              } 
              this.airCompanyArrArr.push(airCompanyArrObj);
              let uniqueObj = this._UtilsService.unique(this.airCompanyArrArr,'value');
              let underDatas  = this._UtilsService.preArrays(uniqueObj,airCompanyArrAll);
              this.Filters = underDatas;

              let airArrObject = {
                "value":item.toAirportCn,
                "arrcode": item.toAirport,
                "airArrOption": false
              }
              let airArrAll = {
                "value":'不限',
                "arrcode": '',
                "airDepOption": true
              }  
              this.airArrArr.push(airArrObject);
              let uniqueData = this._UtilsService.unique(this.airArrArr,'value');
              let underData  = this._UtilsService.preArrays(uniqueData,airArrAll);
              this.airArrArrs = underData;
            }

            if(item.shareFlightNo !=''){
              this.isShareFlight = false;
            }else{
              this.isShareFlight = true;
            }

        });
      }); 
      
    }

     this.cabinArrs = [
       {
         'value':'经济舱',
         'cabincode':'Y',
         'cabinOption': true
       },
       {
         'value':'头等舱/商务舱',
         'cabincode':'F/C',
         'cabinOption': false
       }
     ]  

  }

  onItem(type){
    this.selItem = type;
  }

  flightType(item,n){
    if(item === true){
      let flightTypeObj = {
          "value":'直飞'
      }
      this.result.push(flightTypeObj);
      sessionStorage.setItem("resultData",JSON.stringify(this.result));
      this.flightData = _.orderBy(this.flightData, { 'directFlight': true });
      this.resultLen = _.size(this.flightData);
    }else{
      this.result.splice(n,1);
    } 
  }

  flightShare(item,n){
    if(item === true){
      let flightShareObj = {
          "value":'隐藏共享'
      }
      this.result.push(flightShareObj);
      sessionStorage.setItem("resultData",JSON.stringify(this.result));
      this.flightData = _.reject(this.flightData, 'segments[0].shareFlightNo' );
      this.resultLen = _.size(this.flightData);
    }else{
      this.result.splice(n,1);
    } 
  }

  monitorStartNum(){
    if(this.depTimes.lower != 0 || this.depTimes.upper != 100){
      //this.filterData(this.flightData,'value');
      this.isTimeIco = true;
    }else{
      this.isTimeIco = false;
    }

    switch(this.depTimes.lower){
      case 0:
        this.depStartTime = '00:00'
        break;
      case 4:
        this.depStartTime = '01:00'
        break;
      case 8:
        this.depStartTime = '02:00'
        break;
      case 16:
        this.depStartTime = '03:00'
        break;
      case 20:
        this.depStartTime = '04:00'
        break;
      case 24:
        this.depStartTime = '05:00'
        break;
      case 28:
        this.depStartTime = '06:00'
        break;  
      case 32:
        this.depStartTime = '07:00'
        break;
      case 36:
        this.depStartTime = '08:00'
        break;
      case 40:
        this.depStartTime = '09:00'
        break;
      case 44:
        this.depStartTime = '10:00'
        break;  
      case 48:
        this.depStartTime = '11:00'
        break;
      case 52:
        this.depStartTime = '12:00'
        break;
      case 56:
        this.depStartTime = '13:00'
        break;
      case 60:
        this.depStartTime = '14:00'
        break;
      case 64:
        this.depStartTime = '15:00'
        break;
      case 68:
        this.depStartTime = '16:00'
        break;  
      case 72:
        this.depStartTime = '17:00'
        break;
      case 76:
        this.depStartTime = '18:00'
        break;
      case 80:
        this.depStartTime = '19:00'
        break;
      case 84:
        this.depStartTime = '20:00'
        break; 
      case 88:
        this.depStartTime = '21:00'
        break;
      case 92:
      case 96:
      case 100:
        this.depStartTime = '22:00'
        break; 
      default:
        this.depStartTime = '00:00'
        break;
    }

    switch(this.depTimes.upper){
      case 0:
      case 4:
      case 8:
      case 12:
        this.depEndTime = '02:00'
        break;
      case 16:
        this.depEndTime = '03:00'
        break;
      case 20:
        this.depEndTime = '04:00'
        break;
      case 24:
        this.depEndTime = '05:00'
        break;
      case 28:
        this.depEndTime = '06:00'
        break;
      case 32:
        this.depEndTime = '07:00'
        break;
      case 36:
        this.depEndTime = '08:00'
        break;  
      case 40:
        this.depEndTime = '09:00'
        break;
      case 44:
        this.depEndTime = '10:00'
        break;
      case 48:
        this.depEndTime = '11:00'
        break;
      case 52:
        this.depEndTime = '12:00'
        break;  
      case 56:
        this.depEndTime = '13:00'
        break;
      case 60:
        this.depEndTime = '14:00'
        break;
      case 64:
        this.depEndTime = '15:00'
        break;
      case 68:
        this.depEndTime = '16:00'
        break;
      case 72:
        this.depEndTime = '17:00'
        break;
      case 76:
        this.depEndTime = '18:00'
        break;  
      case 80:
        this.depEndTime = '19:00'
        break;
      case 84:
        this.depEndTime = '20:00'
        break;
      case 88:
        this.depEndTime = '21:00'
        break;
      case 92:
        this.depEndTime = '22:00'
        break; 
      case 96:
        this.depEndTime = '23:00'
        break;
      case 100:
        this.depEndTime = '24:00'
        break; 
      default:
        this.depEndTime = '24:00'
        break;
    }

    // this.result.push(this.depStartTime);
    //   this.result.push(this.depEndTime);
    //   sessionStorage.setItem("resultData",JSON.stringify(this.result));
    //   let zData = JSON.parse(sessionStorage.getItem("resultData"));
    //   this.flightData = _.chain(this.flightData) 
    //                      .filter(function(v) {
    //                             return v.segments[0].fromDate.substr(-5,5) >= zData.arrStartTime &&  v.segments[0].toDate.substr(-5,5) <= zData.arrEndTime;
    //                       })
    //                      .value();
      
    //   this.resultLen  = _.size(this.flightData);

  }

  monitorEndNum(){
    switch(this.arrTimes.lower){
      case 0:
        this.arrStartTime = '00:00'
        break;
      case 4:
        this.arrStartTime = '01:00'
        break;
      case 8:
        this.arrStartTime = '02:00'
        break;
      case 16:
        this.arrStartTime = '03:00'
        break;
      case 20:
        this.arrStartTime = '04:00'
        break;
      case 24:
        this.arrStartTime = '05:00'
        break;
      case 28:
        this.arrStartTime = '06:00'
        break;  
      case 32:
        this.arrStartTime = '07:00'
        break;
      case 36:
        this.arrStartTime = '08:00'
        break;
      case 40:
        this.arrStartTime = '09:00'
        break;
      case 44:
        this.arrStartTime = '10:00'
        break;  
      case 48:
        this.arrStartTime = '11:00'
        break;
      case 52:
        this.arrStartTime = '12:00'
        break;
      case 56:
        this.arrStartTime = '13:00'
        break;
      case 60:
        this.arrStartTime = '14:00'
        break;
      case 64:
        this.arrStartTime = '15:00'
        break;
      case 68:
        this.arrStartTime = '16:00'
        break;  
      case 72:
        this.arrStartTime = '17:00'
        break;
      case 76:
        this.arrStartTime = '18:00'
        break;
      case 80:
        this.arrStartTime = '19:00'
        break;
      case 84:
        this.arrStartTime = '20:00'
        break; 
      case 88:
        this.arrStartTime = '21:00'
        break;
      case 92:
      case 96:
      case 100:
        this.arrStartTime = '22:00'
        break; 
      default:
        this.arrStartTime = '00:00'
        break;
    }

    switch(this.arrTimes.upper){
      case 0:
      case 4:
      case 8:
      case 12:
        this.arrEndTime = '02:00'
        break;
      case 16:
        this.arrEndTime = '03:00'
        break;
      case 20:
        this.arrEndTime = '04:00'
        break;
      case 24:
        this.arrEndTime = '05:00'
        break;
      case 28:
        this.arrEndTime = '06:00'
        break;
      case 32:
        this.arrEndTime = '07:00'
        break;
      case 36:
        this.arrEndTime = '08:00'
        break;  
      case 40:
        this.arrEndTime = '09:00'
        break;
      case 44:
        this.arrEndTime = '10:00'
        break;
      case 48:
        this.arrEndTime = '11:00'
        break;
      case 52:
        this.arrEndTime = '12:00'
        break;  
      case 56:
        this.arrEndTime = '13:00'
        break;
      case 60:
        this.arrEndTime = '14:00'
        break;
      case 64:
        this.arrEndTime = '15:00'
        break;
      case 68:
        this.arrEndTime = '16:00'
        break;
      case 72:
        this.arrEndTime = '17:00'
        break;
      case 76:
        this.arrEndTime = '18:00'
        break;  
      case 80:
        this.arrEndTime = '19:00'
        break;
      case 84:
        this.arrEndTime = '20:00'
        break;
      case 88:
        this.arrEndTime = '21:00'
        break;
      case 92:
        this.arrEndTime = '22:00'
        break; 
      case 96:
        this.arrEndTime = '23:00'
        break;
      case 100:
        this.arrEndTime = '24:00'
        break; 
      default:
        this.arrEndTime = '24:00'
        break;
    }
  }

      
  

  

  updateDepAir(item,n){
      if(item  == true){
        for(let i=0; i<this.airDepArrs.length; i++){
          if(i == n){
            let airDepArrsObj = {
                "value":this.airDepArrs[i].value,
                "depcode": this.airDepArrs[i].depcode
            }
            this.result.push(airDepArrsObj);　
            this.flightData = _.filter(this.flightData,  function(o){ return o.segments[0].fromAirport == airDepArrsObj.depcode } );
             
            // this.flightData = _.chain(this.flightData) 
            //              .filter(function(v) {
            //                     return v.segments[0].fromAirport >= zData.arrStartTime &&  v.segments[0].toAirport <= zData.arrEndTime;
            //               })
            //              .value();
            


            this.resultLen  = _.size(this.flightData);
          }
        }
        sessionStorage.setItem("resultData",JSON.stringify(this.result));
        this.isAirCompanyIco = true;
        this.airDepArrs[0].airDepOption = false;
      }else{
        this.result.splice(n-1,1);
        if(n === 1){
          let airDepArrsObj = {
              "value":this.airDepArrs[0].value,
              "depcode": this.airDepArrs[0].depcode
          }
          sessionStorage.setItem("resultData",JSON.stringify(airDepArrsObj));
          this.flightData = _.filter(this.flightData,  function(o){ return o.segments[0].fromAirport == airDepArrsObj.depcode } );
          this.resultLen  = _.size(this.flightData);

          this.airDepArrs[0].airDepOption = true;
          this.isAirCompanyIco = false;
        }
      }
  }

  updateArrAir(item,n){
    if(item  == true){
      for(let i=0; i<this.airArrArrs.length; i++){
        if(i == n){
          let airArrArrsObj = {
              "value":this.airArrArrs[i].value,
              "arrcode": this.airArrArrs[i].arrcode
          }
          this.result.push(airArrArrsObj);
          this.flightData = _.filter(this.flightData,  function(o){ return o.segments[0].toAirport == airArrArrsObj.arrcode } );
          this.resultLen  = _.size(this.flightData);          
        }
      }
      sessionStorage.setItem("resultData",JSON.stringify(this.result));
      this.isAirCompanyIco = true;
      this.airArrArrs[0].airArrOption = false;
    }else{
      this.result.splice(n-1,1);
      if(n === 1){
        let airArrArrsObj = {
            "value":this.airArrArrs[0].value,
            "arrcode": this.airArrArrs[0].arrcode
        }
        sessionStorage.setItem("resultData",JSON.stringify(airArrArrsObj));
        this.flightData =  _.filter(this.flightData,  function(o){ return o.segments[0].toAirport == airArrArrsObj.arrcode } );
        this.resultLen  = _.size(this.flightData);
        this.airArrArrs[0].airArrOption = true;
        this.isAirCompanyIco = false;
      }
    }
  }

  getCabinCheck(item,n){
    if(item  == true){
      for(let i=0; i<this.cabinArrs.length; i++){
        if(i == n){
          let cabinObj = {
              "value":this.cabinArrs[i].value,
              "cabincode": this.cabinArrs[i].cabincode
          }
          this.result.push(cabinObj);
          this.flightData = _.filter(this.flightData,  function(o){ return o.prices[0].cabinList[0].cabinRank == cabinObj.cabincode } );
          this.resultLen  = _.size(this.flightData);
        }
      }
      sessionStorage.setItem("resultData",JSON.stringify(this.result));
     
      this.isCabinIco = true;
      this.cabinArrs[0].cabinOption = false;
    }else{
      this.result.splice(n-1,1); 
      if(n === 1){
        let cabinObj = {
            "value":this.cabinArrs[0].value,
            "cabincode": this.cabinArrs[0].cabincode
        }
        sessionStorage.setItem("resultData",JSON.stringify(cabinObj));
        this.flightData = _.filter(this.flightData,  function(o){ return o.prices[0].cabinList[0].cabinRank == cabinObj.cabincode } );
        this.resultLen  = _.size(this.flightData);
        this.cabinArrs[0].cabinOption = true;
        this.isCabinIco = false;
      }
    }
  }

  getAirportCheck(item,n){
    if(item  == true){
      for(let i=0; i<this.Filters.length; i++){
        if(i == n){
          let filtersObj = {
              "value":this.Filters[i].value,
              "airportcode": this.Filters[i].airportcode
          }
          this.result.push(filtersObj);
          this.flightData = _.filter(this.flightData, function(o){ return o.segments[0].flightNo.substr(0,2) == filtersObj.airportcode } );
          this.resultLen  = _.size(this.flightData);            
        }
      }
      sessionStorage.setItem("resultData",JSON.stringify(this.result));
      this.isAirportIco = true;
      this.Filters[0].airportOption = false;
    }else{
      this.result.splice(n-1,1);
      if(n === 1){
        let filtersObj = {
            "value":this.Filters[0].value,
            "airportcode": this.Filters[0].airportcode
        }
        sessionStorage.setItem("resultData",JSON.stringify(filtersObj));
        this.flightData = _.filter(this.flightData, function(o){ return o.segments[0].flightNo.substr(0,2) == filtersObj.airportcode } );
        this.resultLen  = _.size(this.flightData);

        this.Filters[0].airportOption = true;
        this.isAirportIco = false;
      }
    }
    
  }

  delSelItem(item,m){
      if(this.direFlight === true){
        if(item == this.direFlight){
          this.result.splice(m,1);
          this.direFlight = false;
        }
      }

      if(this.shareFlight === true){
        if(item == this.shareFlight){
          this.result.splice(m,1);
          this.shareFlight = false;
        }
      }

      for(let i=0; i<this.cabinArrs.length; i++){
        if(this.cabinArrs[i].cabinOption === true){
          if(item == this.cabinArrs[i].value){
            this.result.splice(m,1);
            this.cabinArrs[i].cabinOption = false;
          }
        }
      }

      for(let i=0; i<this.airDepArrs.length; i++){
        if(this.airDepArrs[i].airDepOption === true){
          if(item == this.airDepArrs[i].value){
            this.result.splice(m,1);
            this.airDepArrs[i].airDepOption = false;
          }
        }
      }

      for(let i=0; i<this.airArrArrs.length; i++){
        if(this.airArrArrs[i].airArrOption === true){
          if(item == this.airArrArrs[i].value){
            this.result.splice(m,1);
            this.airArrArrs[i].airArrOption = false;
          }
        }
      }

      for(let i=0; i<this.Filters.length; i++){
        if(this.Filters[i].airportOption === true){
          if(item == this.Filters[i].value){
            this.result.splice(m,1);
            this.Filters[i].airportOption = false;
          }
        }
      }

  }

  cancelFilter(){
    this.filterChange.emit(this.originflightData.data);
  }

  updateFilter(){
    this.filterChange.emit(this.flightData);
  }
  
}