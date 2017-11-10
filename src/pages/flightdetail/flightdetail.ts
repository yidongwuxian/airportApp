import { Component,OnInit,OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";
import { UtilsService } from '../../service/utils.service';
import { HttpService } from '../../service/http.service';
import { CabinPipe } from '../../pipe/cabin.pipe';
import { OrderflightPage } from '../../pages/orderflight/orderflight';
import { RefundrulePage } from '../../pages/refundrule/refundrule';
import { FlightqueryPage } from '../../pages/flightquery/flightquery';
import { DisCountComponent } from '../../components/discount/discount';
import { FlightInfoComponent } from '../../components/flightinfo/flightinfo';
import { LoginPage } from '../../pages/login/login';
import { baseUrl,ordercmUrl } from '../../providers/url';
@IonicPage()
@Component({
  selector: 'page-flightdetail',
  templateUrl: 'flightdetail.html',
  providers:[UtilsService,HttpService,CabinPipe]
})
export class FlightdetailPage implements OnInit{
  flightPrices: any;
  priceTo: any;
  flightPrice: any;
  routingType: string;
  countryType: string;
  internaCount: string;
  flightPriceFrom: any;
  flightPriceTo:   any;
  flightQueryInfo: any;
  flightObjFrom: any;
  flightObjTo:  any;
  confirmParam: any;
  flightData: any;
  writeStr: string;
  calNumbers?:string;
  flightItem?: any;
  flightInfo: object;
  airlineCompany: string;
  policyId: string;
  chdPolicyID: string;
  adultFacePrice: number;
  childFacePrice: number;
  infantFacePrice: number;
  adultTFC: string;
  cabinCode: any;
  cabinRank: any;
  shareFlightNo: any;
  flightRangeArrayGo:Array<any> = [];
  flightRangeArrayBack:Array<any> = [];
  QUERY_URL: string;
  token: string;
  resData: any;
  type:string;
  headers: any;
  loader: any;
  off: boolean = false;
  constructor(public navCtrl: NavController, 
  			      public navParams: NavParams,
              public alertCtrl: AlertController,
              private _HttpService: HttpService,
              public loadingCtrl: LoadingController,
  			      private _UtilsService: UtilsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightdetailPage');
  }

  ngOnInit(){
      //sessionStorage.removeItem('flightData');
      this.type = this.navParams.get('type');
      this.flightObjFrom = JSON.parse(sessionStorage.getItem("flightObjFrom"));
      this.flightObjTo   = JSON.parse(sessionStorage.getItem("flightObjTo"));
      this.routingType   = sessionStorage.getItem('routingType');
      this.internaCount  = JSON.parse(localStorage.getItem('internaCount'));
      this.countryType   = sessionStorage.getItem('countryType');
      this.flightQueryInfo   = sessionStorage.getItem('flightQueryInfo');
      this.flightPrices = this.flightObjFrom.data.prices;

      if(this.flightObjTo){
        this.flightPrices = this.flightObjTo.data.prices;
      }
  }

  

  booking(price,priceIndex){
    this.flightPrice = {
        "prices": price
    }
    if(this.routingType  == 'OW'){
      let adultPrice = this.flightObjFrom.data.prices.adultFacePrice;
      this.goPrice(adultPrice,priceIndex,this.flightPrice,price,'from');
    }else{
      if(this.flightObjTo){
        let adultPrice = this.flightObjTo.data.prices.adultFacePrice;
        this.goPrice(adultPrice,priceIndex,this.flightPrice,price,'to');
      }
    }
    sessionStorage.setItem("flightPriceFrom", JSON.stringify(this.flightPrice));
    this.jumpUrl();
  }

  createLoader(){
      this.loader = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src='../assets/img/loading/loading.gif'>`,
        duration: 1000
      });
  }

  goPrice(adultPrice,priceIndex,flightPrice,price,type){
    let params:any;
    if(this.flightObjTo){
      this.getConfirmJson(this.flightObjTo,priceIndex,price)
    }else{
      this.getConfirmJson(this.flightObjFrom,priceIndex,price)
    }
    this.QUERY_URL = baseUrl+ordercmUrl+'?temp='+Math.random().toString();
      
      
     let userInfo = JSON.parse(localStorage.getItem('userInfo'));
     if(userInfo){
       this.token = userInfo.token;
     }else{
       this.navCtrl.push(LoginPage,{'jumpTo':'flightDetailToLogin'});
     }
      
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'authorization': this.token
    });

    this.createLoader();
    this.loader.present().then(() => {
        this._HttpService.post(this.QUERY_URL,this.flightInfo,this.headers)
        .subscribe(
        (res) => { 
          this.loader.dismiss();
          if(res.status == '1001'){
            this.resData = res.data;
            let pssPrice = res.data.adultFacePrice;
            if(adultPrice!=pssPrice){
              if(this.type == 'from'){
                this.writeStr = '去';
              }
              if(this.type == 'to'){
                this.writeStr = '回';
              }
              let priceAlert = this.alertCtrl.create({
                 title: '提示',
                 message: this.writeStr+"程舱位价格有变动，最新价格为"+pssPrice+"，<br>是否确认购买？",
                 buttons: [
                 {
                   text:'确定购买',
                   handler: () => {
                     if(this.type == 'from'){
                       this.savePrice(this.resData,this.flightPriceFrom);
                     }
                     if(this.type == 'to'){
                       this.savePrice(this.resData,this.flightPriceTo);
                     }
                   }
                 },{
                   text:'重新检索',
                   handler: () => {
                     if(this.type == 'from'){
                       this.reSavePrice(this.resData,this.flightPriceFrom);
                     }
                     if(this.type == 'to'){
                       this.reSavePrice(this.resData,this.flightPriceTo);
                     }
                   }
                 }]
              });
              priceAlert.present();
              
            }      
        }else{
          let msgAlert = this.alertCtrl.create({
             title: '价格过期，请选择其他价格',
             buttons: ['确定']
           });
           msgAlert.present();
        }
        },
        (err) => {
          let msgAlert = this.alertCtrl.create({
               title: err+'请检查网络连接，稍后重试',
               buttons: ['确定']
             });
             msgAlert.present();
           console.log('err:'+err) 
        }
      )
    })

   
  }

  savePrice(res,objPrices){
    const obj=res;        
    let PriceObj:object = {};
    PriceObj = {
      'adultFacePrice':  obj.adultFacePrice,
      'childFacePrice':  obj.childFacePrice,
      'infantFacePrice': obj.infantFacePrice,
      'adultFuelTax':    obj.adultFuelTax,
      'childFuelTax':    obj.childFuelTax,
      'infantFuelTax':   obj.infantFuelTax,
      'adultAirportTax': obj.adultAirportTax,
      'childAirportTax': obj.childAirportTax,
      'infantAirportTax':obj.infantAirportTax,
      'adultSettlePrice':obj.adultSettlePrice,
      'childSettlePrice':obj.childSettlePrice,
      'infantSettlePrice':obj.infantSettlePrice,
      'adultPolicyId':    obj.adultPolicyId
    }

    if(this.type == 'from'){
      let flightPriceFromObj = {
        'prices': PriceObj
      }  
      sessionStorage.setItem(objPrices, JSON.stringify(flightPriceFromObj));
    }else{
      let flightPriceToObj = {
        'prices': PriceObj
      }  
      sessionStorage.setItem(objPrices, JSON.stringify(flightPriceToObj));
    }
    this.jumpUrl();
  }

  reSavePrice(res,objPrices){
    const obj=res; 
    objPrices.prices = {
      'adultSettlePrice':obj.adultSettlePrice,
      'childSettlePrice':obj.childSettlePrice,
      'infantSettlePrice':obj.infantSettlePrice,
      'adultPolicyId':    obj.adultPolicyId,
    }             
    sessionStorage.setItem("objPrices", JSON.stringify(objPrices));
    this.jumpUrl();
  }

  getConfirmJson(flight,priceIndex,pro){
    if(this.countryType == 'inland'){
      this.calNumbers = localStorage.getItem('inlandCount');
    }
    if(this.countryType == 'international'){
      this.calNumbers = localStorage.getItem('internaCount');
    }
    
    let rangeSegmentData  = "";
    let rangeSegmentCount = flight.data.rangeSegmentCount;
    let re=/[，,]/g;
    if(re.test(rangeSegmentCount)){
       rangeSegmentData  = rangeSegmentCount.split(',')[0].split('-')[1];   //多段
    }else{
       rangeSegmentData  = rangeSegmentCount.split('-')[1];                 //单段
    }

    let value=flight.data.segments;

    for(let flightItem of value){
      this.flightItem = flightItem;
    }

    this.saveConFirm(flight,this.flightItem,pro);
  }


  saveConFirm(flight,item,pro){
    const flightNo = item.flightNo;
    this.shareFlightNo = item.shareFlightNo;
    if(item.airlineCompany){
        this.airlineCompany = item.airlineCompany;
    };
    let fromAirport = item.fromAirport;
    let toAirport   = item.toAirport;
    let fromCity=item.fromAirportCn;
    let toCity=item.toAirportCn;
    
    let departTime=item.fromDate;//出发日期加时间
    const departureDate = departTime.substr(0,10); //出发日期
    const departureTime = departTime.substr(-5, 5); //出发时间
    let arriveTime =   item.toDate;//到达日期加时间
    const arrivalDate = arriveTime.substr(0,10); //到达日期
    const arrivalTime = arriveTime.substr(-5, 5); //到达时间
    const freightLimitQueryID   =  flight.data.prices[0].freightLimitQueryID;
    const freightRuleQueryIDChd = flight.data.prices[0].freightRuleQueryIDChd;
    const flightScheduled = [];
    
    let fromCityGo = '';
    let departureDateGo = '';
    let toAirportGo = '';
    let fromAirportBack = '';
    let departureDateBack = '';
    let toAirportBack = ''; 
   
      this.cabinCode=pro.cabinList[0].cabinCode;
      this.cabinRank=pro.cabinList[0].cabinRank;
      //价格参数
      this.adultFacePrice=pro.adultFacePrice;
      this.childFacePrice=pro.childFacePrice;
      this.infantFacePrice=pro.infantFacePrice;
      this.policyId=pro.policy[0].policyId;
      this.chdPolicyID=pro.policy[0].policyIdChd;

    this.confirmParam = {
          "fromAirport":fromAirport,
          "toAirport":toAirport,
          "flightNo":flightNo,
          "cabin":this.cabinCode,
          "departTime":departTime,
          "arriveTime":arriveTime,
          "shareFlightNo":this.shareFlightNo,
          "cabinRank":this.cabinRank
     }

    if(this.flightItem.correspondRange == '1'){                       
       this.flightRangeArrayGo.push(this.confirmParam);
    } 
    if(this.flightItem.correspondRange == '2'){              
      this.adultTFC=pro.adultTFC;
      this.flightRangeArrayBack.push(this.confirmParam);
    } 
    for(let arrayGo of this.flightRangeArrayGo){
      fromCityGo      = this.flightRangeArrayGo[0].fromAirport;
      toAirportGo     = this.flightRangeArrayGo[0].toAirport;
      departureDateGo = this.flightRangeArrayGo[0].departTime.substr(0,10);
    }
   
    for(let arrayBack of this.flightRangeArrayBack){
      fromAirportBack   = this.flightRangeArrayBack[0].fromAirport;
      toAirportBack     = this.flightRangeArrayBack[0].toAirport;
      departureDateBack = this.flightRangeArrayBack[0].departTime.substr(0,10);
    } 
    
    if(this.routingType  == 'RT'){
       this.flightInfo={
            "flightRangeType":this.routingType,
            "cabinRank":this.cabinRank,
            "passengerNature":"",
            "airlineCompany":this.airlineCompany,
            "policyID":this.policyId,
            "chdPolicyID":this.chdPolicyID,
            "adultFacePrice":this.adultFacePrice,
            "childFacePrice":this.childFacePrice,
            "infantFacePrice":"0.0",
            "adultTFC":this.adultTFC,
            "freightLimitQueryID":freightLimitQueryID,
            "freightLimitQueryIDChd":freightRuleQueryIDChd,
            "flightRange":[
            {
                "flightScheduled":this.flightRangeArrayGo,
                "fromCity": fromCityGo,
                "fromDate": departureDateGo,
                "toCity": toAirportGo
            },
            {
                "flightScheduled":this.flightRangeArrayBack,
                "fromCity": fromAirportBack,
                "fromDate": departureDateBack,
                "toCity": toAirportBack
            }
            ]
        }

    }else{
      this.flightInfo={
            "flightRangeType":this.routingType,
            "cabinRank":this.cabinRank,
            "passengerNature":"",
            "airlineCompany":"",
            "policyID":this.policyId,
            "chdPolicyID":this.chdPolicyID,
            "adultFacePrice":this.adultFacePrice,
            "childFacePrice":this.childFacePrice,
            "infantFacePrice":"0.0",
            "freightLimitQueryID":freightLimitQueryID,
            "freightLimitQueryIDChd":freightRuleQueryIDChd,
            "flightRange":[
            {
                "flightScheduled":this.flightRangeArrayGo,
                "fromCity": fromCityGo,
                "fromDate": departureDateGo,
                "toCity": toAirportGo
            }
            ]
      } 
    } 
  }

  jumpUrl(){
    if(this.routingType  == 'RT'){
      if(this.flightObjTo){
        this.navCtrl.push(OrderflightPage)
      }else{
        this.navCtrl.push(FlightqueryPage,{'jumpTo':'flightdatilToQuery'});
      }
    }else{
      this.navCtrl.push(OrderflightPage)
    }
  }

  endorse(price){
     let endorseSeg = this.flightData.segments[0];
     const airCompany = endorseSeg.flightNo.substr(0,2);
     const fromAirport = endorseSeg.fromAirport;
     const toAirport   = endorseSeg.toAirport;
     const fromDate    = endorseSeg.fromDate.substr(0,10);
     const cabinInfo   = price.cabinList[0].cabinCode;
     const endorseParam = {
       'airCompany': airCompany,
       'fromAirport': fromAirport,
       'toAirport': toAirport,
       'cabinInfo': cabinInfo,
       'fromDate': fromDate,
       'lastUpateTime': null,
       'pageNo': 1,
       'countPerPage': 10
     }
     
     sessionStorage.setItem('refundPolicyParam', JSON.stringify(endorseParam));
     this.navCtrl.push(RefundrulePage);
  }

}
