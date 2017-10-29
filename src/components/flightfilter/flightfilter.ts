import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { UtilsService } from '../../service/utils.service';
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
  constructor(public navCtrl: NavController,
              private _HttpService: HttpService,
              private _UtilsService: UtilsService){}

  ngOnInit(){
    sessionStorage.removeItem("resultData");
    this.flightData = JSON.parse(sessionStorage.getItem('flightData'));
    if(this.flightData){
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
                "airportcode": 'ALL',
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
                "depcode": 'ALL',
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
                "airportcode": 'ALL',
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
                "arrcode": 'ALL',
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

     this.timeArrs = [
       { 
         "timeDate":"不限",
         "time": "ALL",
         "timeOption": true
       },
       { 
         "timeDate":"00:00-06:00",
         "time": "",
         "timeOption": false
       },
       {
         "timeDate":"06:00-12:00",
         "time": "",
         "timeOption": false
       },
       {
         "timeDate":"12:00-18:00",
         "time": "",
         "timeOption": false
       },
       {
         "timeDate":"18:00-24:00",
         "time": "",
         "timeOption": false
       }
     ];

     this.filter('ALL');
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
    }else{
      this.result.splice(n,1);
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
          }
        }
        sessionStorage.setItem("resultData",JSON.stringify(this.result));
        this.filter(this.result);
        this.isAirCompanyIco = true;
        this.airDepArrs[0].airDepOption = false;
      }else{
        this.result.splice(n-1,1);
        if(n === 1){
          let airDepObj = {
              "value":this.airDepArrs[0].value,
              "depcode": this.airDepArrs[0].depcode
          }
          sessionStorage.setItem("resultData",JSON.stringify(airDepObj));
          this.resultLen = this.flightData.length;
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
        }
      }
      sessionStorage.setItem("resultData",JSON.stringify(this.result));
      this.filter(this.result);
      this.isAirCompanyIco = true;
      this.airArrArrs[0].airArrOption = false;
    }else{
      this.result.splice(n-1,1);
      if(n === 1){
        let airArrObj = {
            "value":this.airArrArrs[0].value,
            "arrcode": this.airArrArrs[0].arrcode
        }
        sessionStorage.setItem("resultData",JSON.stringify(airArrObj));
        this.resultLen = this.flightData.length;
        this.airArrArrs[0].airArrOption = true;
        this.isAirCompanyIco = false;
      }
    }
  }

  updateTime(item,n){
    // console.log('item:'+item);
    // console.log('n:'+n);
    if(item  == true){
      for(let i=1; i<this.timeArrs.length; i++){
        if(i == n){
          let timeArrsObj = {
              "value":this.timeArrs[i].timeDate,
              "time": this.timeArrs[i].time
          }
          this.result.push(timeArrsObj);
        }
      }
      sessionStorage.setItem("resultData",JSON.stringify(this.result));
      this.filter(this.result);
      this.isTimeIco = true;
      this.timeArrs[0].timeOption = false;
    }else{
      // if(n<1){
      //   this.result.splice(n,1);
      // }
      this.result.splice(n-1,1);
      sessionStorage.setItem("resultData",JSON.stringify(this.result));
      let num = JSON.parse(sessionStorage.getItem("resultData")).length;
      //console.log('num:'+ num );
      if(num === 1){
         this.result.splice(0,1);
         sessionStorage.setItem("resultData",JSON.stringify(this.result));
      }
      if(num === 0){
        let timeObj = {
             "value":this.timeArrs[0].timeDate,
             "time": this.timeArrs[0].time
         }
         sessionStorage.setItem("resultData",JSON.stringify(timeObj));
         this.resultLen = this.flightData.length;
         this.timeArrs[0].timeOption = true;
         this.isTimeIco = false;
      }
    }
  }


  getCabinCheck(item,n){
    //console.log('n:'+n);
    if(item  == true){
      for(let i=0; i<this.cabinArrs.length; i++){
        if(i == n){
          let cabinObj = {
              "value":this.cabinArrs[i].value,
              "cabincode": this.cabinArrs[i].cabincode
          }
          this.result.push(cabinObj);
        }
      }
      sessionStorage.setItem("resultData",JSON.stringify(this.result));
      this.filter(this.result);
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
        this.resultLen = this.flightData.length;
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
        }
      }
      sessionStorage.setItem("resultData",JSON.stringify(this.result));
      this.filter(this.result);
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
        this.resultLen = this.flightData.length;
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

      for(let i=0; i<this.timeArrs.length; i++){
        if(this.timeArrs[i].timeOption === true){
          if(item == this.timeArrs[i].timeDate){
            this.result.splice(m,1);
            this.timeArrs[i].timeOption = false;
          }
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

  filter(options){
      if(options == 'ALL'){
        this.resultLen = this.flightData.length;
      }else{
          for(let item of options){
            this.filterData(this.flightData,item);
          }
      }
      
  }

  filterData(objData,item){
    this.temporaryData = [];
    [...objData].forEach((items,o) => {
        let segs = items.segments;
        let prices = items.prices;
        
        if(item.time === 'ALL' || item.depcode === 'ALL' || item.arrcode === 'ALL' || item.cabincode === 'Y' || item.airportcode === 'ALL'){
          this.resultLen = this.flightData.length;
        }

        this.timeUp   = item.value.split('-')[0];
        this.timeDown = item.value.split('-')[1];
  
        let resultView = JSON.parse(sessionStorage.getItem("resultData"));
        //起飞时间
          if(item.value){
            if(this.flag){
              for(let k of segs){
                if(resultView.length > 1){
                    if( (segs[0].fromDate.substr(-5,5) >= this.timeUp && segs[segs.length-1].toDate.substr(-5,5) <= this.timeDown) 
                        // ( (segs[0].fromDate.substr(-5,5) >= this.timeUp && segs[segs.length-1].toDate.substr(-5,5) <= this.timeDown) && k.fromAirport === item.depcode) ||
                        // ( (segs[0].fromDate.substr(-5,5) >= this.timeUp && segs[segs.length-1].toDate.substr(-5,5) <= this.timeDown) && k.toAirport === item.arrcode)   ||
                        // ( (segs[0].fromDate.substr(-5,5) >= this.timeUp && segs[segs.length-1].toDate.substr(-5,5) <= this.timeDown) && k.fromAirport === item.depcode && k.toAirport === item.arrcode) ||
                        // ( (segs[0].fromDate.substr(-5,5) >= this.timeUp && segs[segs.length-1].toDate.substr(-5,5) <= this.timeDown) && k.flightNo.substr(0,2) === item.airportcode)  ||
                        // ( (segs[0].fromDate.substr(-5,5) >= this.timeUp && segs[segs.length-1].toDate.substr(-5,5) <= this.timeDown) && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                        // ( (segs[0].fromDate.substr(-5,5) >= this.timeUp && segs[segs.length-1].toDate.substr(-5,5) <= this.timeDown) && k.fromAirport === item.depcode && k.toAirport === item.arrcode && k.flightNo.substr(0,2) === item.airportcode) ||
                        // ( (segs[0].fromDate.substr(-5,5) >= this.timeUp && segs[segs.length-1].toDate.substr(-5,5) <= this.timeDown) && k.fromAirport === item.depcode && k.toAirport === item.arrcode && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                        // ( (segs[0].fromDate.substr(-5,5) >= this.timeUp && segs[segs.length-1].toDate.substr(-5,5) <= this.timeDown) && k.fromAirport === item.depcode && k.toAirport === item.arrcode && k.flightNo.substr(0,2) === item.airportcode && prices[0].cabinList[0].cabinRank === item.cabincode)
                      ){
                      this.senderData.push(this.timeUp);
                      this.senderData.push(this.timeDown);
                      this.flag = true;
                    }else{
                    this.flag = false;
                    this.resultLen = 0;
                    }
                }else{
                  
                    
                }    
              }
            }            
          }
        
        

        //出发机场三字码
        if(item.depcode){
          if(this.flag){
              for(let k of segs){
               if(k.fromAirport === item.depcode 
                    // (k.fromAirport === item.depcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) )   ||
                    // (k.fromAirport === item.depcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.toAirport === item.arrcode) ||
                    // (k.fromAirport === item.depcode && k.flightNo.substr(0,2) === item.airportcode)  ||
                    // (k.fromAirport === item.depcode && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                    // (k.fromAirport === item.depcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.toAirport === item.arrcode && k.flightNo.substr(0,2) === item.airportcode) ||
                    // (k.fromAirport === item.depcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.toAirport === item.arrcode && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                    // (k.fromAirport === item.depcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.toAirport === item.arrcode && k.flightNo.substr(0,2) === item.airportcode && prices[0].cabinList[0].cabinRank === item.cabincode)
                  ){  
                  this.senderData.push(item.depcode);
                  this.flag = true;
                }else{
                  this.flag = false;
                }
              }
          }          
        }

        //到达机场三字码
        if(item.arrcode){
          if(this.flag){
            for(let k of segs){
              if(k.toAirport === item.arrcode  
                  // (k.toAirport === item.arrcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) )   ||
                  // (k.toAirport === item.arrcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.fromAirport === item.depcode) ||
                  // (k.toAirport === item.arrcode && k.flightNo.substr(0,2) === item.airportcode)  ||
                  // (k.toAirport === item.arrcode && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                  // (k.toAirport === item.arrcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.fromAirport === item.depcode && k.flightNo.substr(0,2) === item.airportcode) ||
                  // (k.toAirport === item.arrcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.fromAirport === item.depcode && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                  // (k.toAirport === item.arrcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.fromAirport === item.depcode && k.flightNo.substr(0,2) === item.airportcode && prices[0].cabinList[0].cabinRank === item.cabincode)
                ){  
                this.senderData.push(item.arrcode);
                this.flag = true;
              }else{
                this.flag = false;
              }
            }
          }     
        }

        //航空公司二字码
        if(item.airportcode){
          if(this.flag){
               for(let k of segs){
                  if(k.flightNo.substr(0,2) === item.airportcode
                  //     (k.flightNo.substr(0,2) === item.airportcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) )   ||
                  //     (k.flightNo.substr(0,2) === item.airportcode && k.fromAirport === item.depcode)  ||
                  //     (k.flightNo.substr(0,2) === item.airportcode && k.toAirport === item.arrcode)  ||
                  //     (k.flightNo.substr(0,2) === item.airportcode && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                  //     (k.flightNo.substr(0,2) === item.airportcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.fromAirport === item.depcode) ||
                  //     (k.flightNo.substr(0,2) === item.airportcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.toAirport   === item.arrcode) ||
                  //     (k.flightNo.substr(0,2) === item.airportcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.fromAirport === item.depcode && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                  //     (k.flightNo.substr(0,2) === item.airportcode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.toAirport   === item.arrcode && prices[0].cabinList[0].cabinRank === item.cabincode) 
                  // ){
                    ){
                    this.senderData.push(item.airportcode);
                    this.flag = true;
                  }else{
                    this.flag = false;            
                  }
                }
          }
          
        }

        //舱位三字码
        if(item.cabincode){
          if(this.flag){
               for(let k of segs){
                  if(prices[0].cabinList[0].cabinRank === item.cabincode 
                    //   (prices[0].cabinList[0].cabinRank === item.cabincode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) )   ||
                    //   (prices[0].cabinList[0].cabinRank === item.cabincode && k.fromAirport === item.depcode)  ||
                    //   (prices[0].cabinList[0].cabinRank === item.cabincode && k.toAirport === item.arrcode)  ||
                    //   (prices[0].cabinList[0].cabinRank === item.cabincode && k.flightNo.substr(0,2) === item.airportcode) ||
                    //   (prices[0].cabinList[0].cabinRank === item.cabincode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.fromAirport === item.depcode) ||
                    //   (prices[0].cabinList[0].cabinRank === item.cabincode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.toAirport   === item.arrcode) ||
                    //   (prices[0].cabinList[0].cabinRank === item.cabincode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.flightNo.substr(0,2) === item.airportcode && k.fromAirport === item.depcode) ||
                    //   (prices[0].cabinList[0].cabinRank === item.cabincode && (k.fromDate.substr(-5,5) >= this.timeUp && k.toDate.substr(-5,5) <= this.timeDown) && k.flightNo.substr(0,2) === item.airportcode && k.toAirport   === item.arrcode) 
                    ){
                    this.senderData.push(item.cabincode);
                    this.flag = true;
                  }else{
                    this.flag = false;
                  }
               }
          }
          
        }        


      if(this.flag){
        console.log('senderData:'+this.senderData);
        for(let o of this.senderData){
          if(items.indexOf(o) === -1){
            this.temporaryData.push(items);
          }
        }
        this.resultData = this.temporaryData;
        this.resultLen = this.temporaryData.length;
        //console.log('len:'+this.resultLen);
      }

        

    });
    console.log('data:'+JSON.stringify(this.temporaryData));
    
  }

  cancelFilter(){
    this.filterChange.emit(this.resultData);
    //console.log('cancel');
  }

  updateFilter(){
    //console.log('temp:'+JSON.stringify(this.resultData));
    this.filterChange.emit(this.resultData);
    //console.log('success');
  }
  
}