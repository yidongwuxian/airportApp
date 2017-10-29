import { Component,OnInit,ViewChild,ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { UtilsService } from '../../service/utils.service';
import { FlightTabComponent } from '../../components/flighttab/flighttab';
import { FlightdetailPage } from '../../pages/flightdetail/flightdetail';
import { baseUrl,shoppingUrl } from '../../providers/url';
import { FlightFilterComponent } from '../../components/flightfilter/flightfilter';
import { ModalComponent } from '../../components/modal/modal';
@IonicPage()
@Component({
  selector: 'page-flightquery',
  templateUrl: 'flightquery.html',
  providers:[HttpService,UtilsService,FlightTabComponent]
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
  timeFlag: number = 0;
  priceFlag: number = 1;
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
  isNoTrans:    boolean = false;
  isTrans:      boolean = true;
  jumpTo: string;
  loader: any;
  isFilter: boolean = false;
  isModal:  boolean = false;
  forDate: string;
  toDate: string;
  isSupplierId: boolean = true;
  isMinus: boolean = true;
  minusType: string = '';
  minusAmount: number;
  flightNum: any;
  stopAirportName: any;
  isStopCity: boolean = false;
  stopOvers: any;
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
    this.flightDate = this._UtilsService.addDateStr(deptStartDate, -1,2);
    this.flightWeek = this._UtilsService.getWeek(deptStartDate,1);

    if(routingType == 'OW'){
      this.QUERY_URL = baseUrl+shoppingUrl+'?routingType='+this.routingType+'&deptCity='+this.deptCity+'&arrCity='+this.arrCity+'&deptStartDate='+
      this.deptStartDateStr+'&seatClass='+this.seatClass+'&adtCnt='+this.adtCnt+'&chdCnt='+this.chdCnt+'&infCnt='+this.infCnt+'&sortType='+sortType+'&temp='+Math.random().toString();
      //this.QUERY_URL = '../assets/data/ae.json';
    }else{
        //this.QUERY_URL = '../assets/data/ae.json';
        this.QUERY_URL = baseUrl+shoppingUrl+'?routingType='+this.routingType+'&deptCity='+this.deptCity+'&arrCity='+this.arrCity+'&deptStartDate='+
        this.deptStartDateStr+'&deptEndDate='+this.deptEndDate+'&seatClass='+this.seatClass+'&adtCnt='+this.adtCnt+'&chdCnt='+this.chdCnt+'&infCnt='+this.infCnt+'&sortType='+sortType+'&temp='+Math.random().toString();
    }

        this.createLoader();
        this.loader.present().then(() => {
          this._HttpService.get(this.QUERY_URL)
          .subscribe(
            (res) => { 
              if(res.status == '1001'){
                this.loader.dismiss();
                let flightData = JSON.parse(sessionStorage.getItem('flightData'));
                if(flightData){
                  //console.log('1');
                  this.flightData = flightData;
                  this.flightQuery(flightData);
                }else{
                  //console.log('2');
                  this.flightData = res.data;
                  sessionStorage.setItem('flightData',JSON.stringify(res.data));
                  this.flightQuery(res.data);
                }
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
                let activity = value.activity;
                let minAdultFacePrice = value.minAdultFacePrice;
                let shareFlightNo = segments.shareFlightNo;
                    if(shareFlightNo){
                      this.isShareIco = true;
                    }else{
                      this.isShareIco = false;
                    }
                    
                    let rangeSegmentCount = value.rangeSegmentCount;
                    let flightCount:number;
                    if(rangeSegmentCount.length > 3){
                      flightCount = rangeSegmentCount.split(',')[0].substr(-1);
                    }else{
                      flightCount = rangeSegmentCount.substr(-1);
                    }
                    this.flightNum = Math.ceil(value.segments.length/2);
                    if(flightCount != 1){
                      this.isTrans = false;
                      this.isNoTrans = true;
                    }else{
                      this.isTrans = true;
                      this.isNoTrans = false;   
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
                         if(supplierId == 'JHAD'){
                           this.isSupplierId = false;
                           this.supplierIdIcon = '航司直销';
                         }else{
                           this.isSupplierId = true;
                         }
                      }
                    }
                    
                     

                    //活动优惠
                    if(activity){
                      if(activity.actContent == 0){
                        this.minusType = '票面立减';
                      } 
                      if(activity.actContent == 1){
                        this.minusType = '保险立减';
                      } 
                      this.minusAmount = activity.actMoney;
                      this.isMinus = false;
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
    this.flightQuery(this.flightData);
    console.log('flightdata:'+JSON.stringify(this.flightData));
    this.isFilter = false;
    this.isModal  = false;
  }

  filterAsDate(){
    this.priceTx.nativeElement.innerText = '价格';
    if(this.timeFlag%2 === 0){
      this.dateTx.nativeElement.innerText = '从早到晚';
      this.sortType = "date_asc";
    }else{
      this.dateTx.nativeElement.innerText = '从晚到早';
      this.sortType = "date_desc";
    }
    
    this.timeFlag++;
    this.query(this.deptStartDateStr,this.sortType,this.routingType);
  }

  filterAsPrice(){
    this.dateTx.nativeElement.innerText = '时间';
    if(this.priceFlag%2 === 0){
      this.priceTx.nativeElement.innerText = '从低到高';
      this.sortType = "price_asc";
    }else{
      this.priceTx.nativeElement.innerText = '从高到低';
      this.sortType = "price_desc";
    }
    this.priceFlag++;
    this.query(this.deptStartDateStr,this.sortType,this.routingType);
  }

  selectTheFlight(flight){
    const flightObjFrom = {'data': flight};
    flightObjFrom.data.prices = this._UtilsService.filterPrice(flightObjFrom.data.prices);
    sessionStorage.setItem("flightObjFrom", JSON.stringify(flightObjFrom));
    this.navCtrl.push(FlightdetailPage,{'type':'from'});
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
