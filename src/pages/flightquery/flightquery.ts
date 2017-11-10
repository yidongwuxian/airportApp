import { Component,OnInit,ViewChild,ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { UtilsService } from '../../service/utils.service';
import { FlightTabComponent } from '../../components/flighttab/flighttab';
import { FlightdetailPage } from '../../pages/flightdetail/flightdetail';
import { baseUrl,shoppingUrl } from '../../providers/url';
import { DisCountComponent } from '../../components/discount/discount';
import { FlightFilterComponent } from '../../components/flightfilter/flightfilter';
import { ModalComponent } from '../../components/modal/modal';
import { MinuesPipe } from '../../pipe/minues.pipe';
import * as _ from 'lodash';
@IonicPage()
@Component({
  selector: 'page-flightquery',
  templateUrl: 'flightquery.html',
  providers:[HttpService,UtilsService,FlightTabComponent,MinuesPipe]
})

export class FlightqueryPage implements OnInit{
  isMsg: number = 2;
  flightDate: string;
  flightWeek: string;
  flightData: Array<any>  = [];
  loadingSpnner: Boolean = true;
  imagePath: any;
  isShareIco: boolean = false;
  stopoverCityName: string;
  timeFlag: boolean = false;
  priceFlag: boolean = true;
  sortType: string = "price_asc";
  deptStartDateStr: string;
  routingType: string;
  deptCity: string;
  arrCity: string;
  deptEndDate: string;
  seatClass: string;
  adtCnt: number;
  chdCnt: number;
  infCnt: number;
  QUERY_URL: any;
  countryType: any;
  showPrices:     any;
  supplierIdIcon: string;
  tranCity:       string;
  jumpTo: string;
  loader: any;
  isFilter: boolean = false;
  isModal:  boolean = false;
  forDate: string;
  toDate: string;
  isSupplierId: boolean = true;
  stopAirportName: any;
  isStopCity: boolean = false;
  stopOvers: any;
  deptStartVal: string;
  seTotal: string;
  seFirst: string;
  seLast: string;
  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
              public alertCtrl: AlertController,
  	          private _HttpService: HttpService,
              public loadingCtrl: LoadingController,
              private _UtilsService: UtilsService) {
  }
  @ViewChild('dateTx') dateTx: ElementRef;
  @ViewChild('priceTx') priceTx: ElementRef;
  @ViewChild('promptInfo') promptInfo: ElementRef;

  ionViewDidLoad() {
     console.log('ionViewDidLoad FlightqueryPage');
     this.createLoader();
   }

  ngOnInit(){
    this.jumpTo = this.navParams.get('jumpTo');
    this.countryType = sessionStorage.getItem('countryType');
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'none';
        });
    }  
    this.dateTx.nativeElement.innerText = '时间';
    this.priceTx.nativeElement.innerText = '从低到高';
    let deptStartDate = this.navParams.get('deptStartDate');
    this.deptStartDateStr = deptStartDate;
    this.deptStartVal = deptStartDate;

    this.routingType = this.navParams.get('routingType');
    this.deptCity = this.navParams.get('deptCity');
    this.arrCity = this.navParams.get('arrCity'); 
    this.deptEndDate = this.navParams.get('deptEndDate');
    this.seatClass = this.navParams.get('seatClass');
    this.adtCnt = this.navParams.get('adtCnt');
    this.chdCnt = this.navParams.get('chdCnt');
    this.infCnt = 0; 

    

    this.query(this.deptStartDateStr,this.sortType,this.routingType);

    
    const flightQueryInfo = {
      'routingType':   this.routingType,
      'deptCity':      this.deptCity,
      'arrCity':       this.arrCity,
      'deptStartDate': this.deptStartDateStr,
      'deptEndDate':   this.deptEndDate,
      'seatClass':     this.seatClass,
      'adtCnt':        this.adtCnt,
      'chdCnt':        this.chdCnt,
      'infCnt':        this.infCnt
    }
    sessionStorage.setItem("flightQueryInfo",JSON.stringify(flightQueryInfo));

  }

  createLoader(){
      this.loader = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src='../assets/img/loading/loading.gif'>`,
        duration: 1000
      });
  }

  query(deptStartDate,sortType,routingType){
    

    if(routingType == 'OW'){
      this.flightDate = this._UtilsService.addDateStr(deptStartDate, 0,2);  
      this.flightWeek = this._UtilsService.getWeek(deptStartDate,1);
      this.QUERY_URL = baseUrl+shoppingUrl+'?routingType='+this.routingType+'&deptCity='+this.deptCity+'&arrCity='+this.arrCity+'&deptStartDate='+
      this.deptStartDateStr+'&seatClass='+this.seatClass+'&adtCnt='+this.adtCnt+'&chdCnt='+this.chdCnt+'&infCnt='+this.infCnt+'&sortType='+sortType+'&temp='+Math.random().toString();
    }else{
      if(this.jumpTo === 'flightdatilToQuery'){
        let flightQueryInfoData = JSON.parse(sessionStorage.getItem("flightQueryInfo"));
        this.flightDate = this._UtilsService.addDateStr(flightQueryInfoData.deptEndDate, 0,2);  
        this.flightWeek = this._UtilsService.getWeek(flightQueryInfoData.deptEndDate,1);
        this.QUERY_URL = baseUrl+shoppingUrl+'?routingType='+flightQueryInfoData.routingType+'&deptCity='+flightQueryInfoData.arrCity+'&arrCity='+flightQueryInfoData.deptCity+'&deptStartDate='+
        flightQueryInfoData.deptEndDate+'&deptEndDate='+flightQueryInfoData.deptStartDate+'&seatClass='+flightQueryInfoData.seatClass+'&adtCnt='+flightQueryInfoData.adtCnt+'&chdCnt='+flightQueryInfoData.chdCnt+'&infCnt='
        +flightQueryInfoData.infCnt+'&sortType='+sortType+'&temp='+Math.random().toString();
      }else{
        this.flightDate = this._UtilsService.addDateStr(deptStartDate, 0,2);  
        this.flightWeek = this._UtilsService.getWeek(deptStartDate,1);
        this.QUERY_URL = baseUrl+shoppingUrl+'?routingType='+this.routingType+'&deptCity='+this.deptCity+'&arrCity='+this.arrCity+'&deptStartDate='+
        this.deptStartDateStr+'&deptEndDate='+this.deptEndDate+'&seatClass='+this.seatClass+'&adtCnt='+this.adtCnt+'&chdCnt='+this.chdCnt+'&infCnt='+this.infCnt+'&sortType='+sortType+'&temp='+Math.random().toString();
      }
        
    }

        this.createLoader();
        this.loader.present().then(() => {
          this._HttpService.get(this.QUERY_URL)
          .subscribe(
            (res) => { 
              if(res.status == '1001'){
                this.loader.dismiss();
                  this.flightData = _.orderBy(res.data, 'minAdultFacePrice');
                  sessionStorage.setItem('flightData',JSON.stringify(res));
                  
                  this.flightQuery(res);
              }else if(res.status == '1002'){
                  this.promptInfo.nativeElement.innerText = '没有找到相匹配的航班信息!';
                  return false;
              }else{
                let msgAlert = this.alertCtrl.create({
                   title: res.message,
                   buttons: ['确定']
                 });
                 msgAlert.present();

                setTimeout(() => {
                  msgAlert.dismiss();
                },2000);
              }           
            },
            (err) => {
               this.loader.dismiss();
               this.promptInfo.nativeElement.innerText = '请求发生错误!';
               console.log('err:'+err) 
            }
          )
        });
      
      
  }

  flightQuery(objData){
              for (let value of objData) {
                let segments = value.segments[0];
                this.forDate = segments.fromDate.substr(-5,5);
                this.toDate  = segments.toDate.substr(-5,5);
                let prices   = value.prices;
                let minAdultFacePrice = value.minAdultFacePrice;
                let shareFlightNo = segments.shareFlightNo;
                    if(shareFlightNo){
                      this.isShareIco = true;
                    }else{
                      this.isShareIco = false;
                    }
                    
                    //经停 start
                    let stopoverCity = '';
                    for(let item of value.segments){
                        if(item.stopOver && item.stopOver != ''){
                         this.isStopCity = true;
                      }
                    }
                    
                    //经停 end

                    for(let item of prices){
                      if(minAdultFacePrice == item.adultFacePrice){
                         let supplierId = item.supplierId;
                         if(supplierId === 'JHAD'){
                           this.isSupplierId = false;
                           this.supplierIdIcon = '航司直销';
                         }else{
                           this.isSupplierId = true;
                         }
                      }
                    }

                  this.seTotal = segments.flightDuration;
                  if(segments.flightDuration){
                    if((segments.flightDuration/60) >= 1){
                      this.seFirst = String(segments.flightDuration/60).split('.')[0]
                      this.seLast = String(segments.flightDuration/60).split('.')[1]
                      this.seTotal = this.seFirst + 'h' + this.seLast + 'm';
                    }else{
                      this.seTotal = segments.flightDuration + 'm';
                    }
                   
                  }  
              }
  }

  tabData(event: any){
    this.deptStartDateStr = event;
    this.query(event,this.sortType,this.routingType);
  }

  filterBox(){
    this.isFilter = true;
    this.isModal  = true;
  }

  filterResult($event){
    this.flightData = $event;
    this.flightQuery($event);
    this.isFilter = false;
    this.isModal  = false;
  }

  filterAsDate(){
    this.priceTx.nativeElement.innerText = '价格';
    if(this.timeFlag){
      this.dateTx.nativeElement.innerText = '从早到晚';
      this.flightData = _.orderBy(this.flightData, 'segments[0].fromDate'); //由低到高
    }else{
      this.dateTx.nativeElement.innerText = '从晚到早';
      this.flightData = _.orderBy(this.flightData, 'segments[0].fromDate').reverse(); //由低到高
    }
    this.timeFlag = !this.timeFlag;
  }

  filterAsPrice(){
    this.dateTx.nativeElement.innerText = '时间';
    if(this.priceFlag){
      this.flightData = _.orderBy(this.flightData, 'minAdultFacePrice'); //由低到高  
    }else{
      this.flightData = _.orderBy(this.flightData, 'minAdultFacePrice').reverse(); //由高到低
    }    
    this.priceFlag = !this.priceFlag;  
  }

  selectTheFlight(flight){
    if(this.jumpTo === 'flightdatilToQuery'){
      const flightObjTo = {'data': flight};
      flightObjTo.data.prices = this._UtilsService.filterPrice(flightObjTo.data.prices);
      sessionStorage.setItem("flightObjTo", JSON.stringify(flightObjTo));
    }else{
      const flightObjFrom = {'data': flight};
      flightObjFrom.data.prices = this._UtilsService.filterPrice(flightObjFrom.data.prices);
      sessionStorage.setItem("flightObjFrom", JSON.stringify(flightObjFrom));
    }
    this.navCtrl.push(FlightdetailPage);
  }

  ionViewWillLeave() {
      let elements = document.querySelectorAll(".tabbar");
      if (elements != null) {
          Object.keys(elements).map((key) => {
              elements[key].style.display = 'flex';
          });
      }
  }   

}
