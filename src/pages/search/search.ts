import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { NavController, NavParams,ModalController,AlertController,Slides } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { AirportService } from '../../service/airport.service';
import { UtilsService } from '../../service/utils.service';
import { CalendarModal, CalendarModalOptions, DayConfig } from "ion2-calendar";
import { CityPage } from '../../pages/city/city';
import { MsgTipComponent } from '../../components/msgtip/msgtip';
import { MsgTipBdComponent } from '../../components/msgtipbd/msgtipbd';
import { MsgIconComponent } from '../../components/msgicon/msgicon';
import { FlightqueryPage } from '../flightquery/flightquery';
import { SearchClass } from '../../models/search.model';
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers:[HttpService,AirportService,UtilsService,MsgTipComponent,MsgTipBdComponent,MsgIconComponent]
})
export class SearchPage implements OnInit{
  searchView: SearchClass = {
    msg: 0,
    aducount: 1,
    chdcount: 0,
    singleAduNum: 1,
    aduNum: 1,
    chdNum: 0,
    depCity:'出发城市',
    arrCity:'到达城市',  
    isEx: true,
    dependentColumns: [],
    currentDate: '',
    rountingType:'OW',
    depCityCode:'',
    arrCityCode:'',
    depCityNameEn: null,
    isRT: false,
    isShow: false,
    isAdult: false,
    isChd: false,
    cabin: 'Y',
    countryEn: '',
    formCityCode: '',
    toCityCode: null,
    diffType: '',
    undeTx:   '',
    depTimePost: '',
    arrTimePost: '',
    calNumber: {}
  }
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private _AirportService: AirportService,
              private _UtilsService: UtilsService) {
    this.judgeGnorGj();
  }
  @ViewChild('cityGo') cityGo: ElementRef;
  @ViewChild('cityBack') cityBack: ElementRef;
  @ViewChild('dep') dep: ElementRef;
  @ViewChild('arr') arr: ElementRef;
  @ViewChild('depWeek') depWeek: ElementRef;
  @ViewChild('arrWeek') arrWeek: ElementRef;
  @ViewChild(Slides) slides: Slides;
  ionViewDidLoad() {
    
  }

  ionViewWillEnter(){
    this.slides.startAutoplay();
  }
  ionViewWillLeave(){
    this.slides.stopAutoplay();
  }

  ngOnInit(){
    this.searchView.isAdult = true;
    this.searchView.isChd  = false;
    this.searchView.msg = 2;
    const fromCity = JSON.parse(localStorage.getItem('fromCity'));
    const toCity   = JSON.parse(localStorage.getItem('toCity'));

    const countryType = sessionStorage.getItem('countryType');
    let depTime  = sessionStorage.getItem('depTime');
    let arrTime  = sessionStorage.getItem('arrTime');

    

    if(fromCity){
      if(fromCity.cityName){
         this.searchView.depCity = fromCity.cityName;
         this.searchView.depCityCode = fromCity.cityCode;
      }else{
         this.searchView.depCity = '出发城市';
      }
    }
    
    if(toCity){
      if(toCity.cityName){
         this.searchView.arrCity = toCity.cityName;
         this.searchView.arrCityCode = toCity.cityCode;
      }else{
         this.searchView.arrCity = '到达城市';
      }
    }

    if(countryType){
       if(countryType === 'inland'){
          this.searchView.isAdult = true;
          this.searchView.isChd  = false;
       }
       if(countryType === 'international'){
          this.searchView.isAdult = false;
          this.searchView.isChd  = true;
       }
    }
    if(depTime){
      let depTimeStr = JSON.parse(depTime);
      this.dep.nativeElement.value = depTimeStr.string.substr(5,2)+'月'+depTimeStr.string.substr(8,2) +'日';
      this.searchView.depTimePost = depTimeStr.string;
      this.depWeek.nativeElement.innerHTML = this._UtilsService.getWeek(depTimeStr.string,'');
    }else{
      this.searchView.undeTx = this._UtilsService.addDate(1,'');
      this.dep.nativeElement.value = this._UtilsService.addDate(1,'months');
      this.searchView.depTimePost = this._UtilsService.addDate(1,'');
      this.depWeek.nativeElement.innerHTML = this._UtilsService.getWeek(this.searchView.undeTx,'');
    }
    if(arrTime){
      let arrTimeStr = JSON.parse(arrTime);
      this.arr.nativeElement.value = arrTimeStr.string.substr(5,2)+'月'+arrTimeStr.string.substr(8,2) +'日';
      this.searchView.arrTimePost = arrTimeStr.string;
      this.arrWeek.nativeElement.innerHTML = this._UtilsService.getWeek(arrTimeStr.string,'');
    }
   
    const type = this.navParams.get('type');
      if(type == 'depback'){
         this.judgeGnorGj();
      }  
      if(type == 'arrback'){
         this.judgeGnorGj();
      }
  }

  exchange() {  
  	this.searchView.depCity = this.cityBack.nativeElement.innerText;
  	this.searchView.arrCity = this.cityGo.nativeElement.innerText;
    this.searchView.isEx = !this.searchView.isEx;
  }

  depCityGo(){
    this.navCtrl.push(CityPage,{
      'type':'dep'
    });
  }
  arrCityGo(){
    this.navCtrl.push(CityPage,{
      'type':'arr'
    });
  }

  fromDate() {
    let _daysConfig: DayConfig[] = [];
    for (let i = 0; i < 31; i++) {
      _daysConfig.push(
      {
        date: new Date(),
        title: `今天`
      },
      {
        date: new Date(2017, 11, 15),
        subTitle: `¥500`
      },
      {
        date: new Date(2017, 10, 25),
        subTitle: `¥1500`
      }
      )
    }
    const options: CalendarModalOptions = {
      monthFormat: 'yyyy 年 MM 月 ',
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      weekStart: 1,
      defaultDate: new Date(),
      title: '出发时间',
      closeLabel: '取消',
      doneLabel: '确定',
      autoDone: true,
      daysConfig: _daysConfig
    };

    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss(date => {
      if(date){
         this.dep.nativeElement.value = date.string.substr(5,2)+'月'+date.string.substr(8,2) +'日';
         this.depWeek.nativeElement.innerHTML = this._UtilsService.getWeek(date.string,'');
         this.searchView.depTimePost = date.string;
         sessionStorage.setItem('depTime',  JSON.stringify(date));
      }else{
         this.dep.nativeElement.value ='出发时间';
         this.depWeek.nativeElement.innerHTML = '';
      }
    })

  }

  toDate() {
  	let _daysConfig1: DayConfig[] = [];
    for (let i = 0; i < 31; i++) {
      _daysConfig1.push(
      {
        date: new Date(),
        title: `今天`
      },
      {
        date: new Date(2017, 12, 15),
        subTitle: `¥800`
      },
      {
        date: new Date(2017, 11, 5),
        subTitle: `¥730`
      }
      )
    }
    const options1: CalendarModalOptions = {
      from: new Date(),
      monthFormat: 'yyyy 年 MM 月 ',
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      weekStart: 1,
      defaultDate: new Date(),
      title: '返回时间',
      closeLabel: '取消',
      doneLabel: '确定',
      autoDone: true,
      daysConfig: _daysConfig1
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options1
    });
    myCalendar.present();

    myCalendar.onDidDismiss(date => {
      if(date){
         this.arr.nativeElement.value = date.string.substr(5,2)+'月'+date.string.substr(8,2) +'日';
         this.arrWeek.nativeElement.innerHTML = this._UtilsService.getWeek(date.string,'');
         this.searchView.arrTimePost = date.string;
         sessionStorage.setItem('arrTime', JSON.stringify(date));
      }else{
         this.arr.nativeElement.value = '返回日期';
      }
    })
  }

  updateRT(){
    if(this.searchView.isRT == true){
      this.searchView.isShow = true;
      this.searchView.rountingType = 'RT';
    }else{
      this.searchView.isShow = false;
      this.searchView.rountingType = 'OW';
    }
  }
  
  judgeGnorGj(){
    let AIRPORT_URL = '../assets/data/airport.json';
    this._AirportService.getAirData(AIRPORT_URL)
        .then(
          (res)=>{
                 let formCityCode = '';
                 let toCityCode   = '';
                 for(let i=0; i<res.length; i++){
                    if(res[i].cityCode === this.searchView.depCityCode || res[i].cityCode === this.searchView.arrCityCode){
                      formCityCode = res[i].countryEn;
                      toCityCode = res[i].countryEn;
                    }
                 } 
                 if(formCityCode !="CHINA"){
                   if(this.searchView.rountingType == 'OW'){
                     this.searchView.calNumber = {
                       'adtCnt': this.searchView.singleAduNum,
                       'chdCnt': 0,
                       'infCnt': 0
                     }
                   }else{
                     this.searchView.calNumber = {
                       'adtCnt': this.searchView.aduNum,
                       'chdCnt': this.searchView.chdNum,
                       'infCnt': 0
                     }
                   }
                   localStorage.removeItem('inlandCount');
                   localStorage.setItem('internaCount',JSON.stringify(this.searchView.calNumber));
                   sessionStorage.setItem('countryType','international');
                   this.searchView.isAdult = false;
                   this.searchView.isChd  = true;
                 }else{
                   this.searchView.calNumber = {
                     'adtCnt': this.searchView.singleAduNum,
                     'chdCnt': 0,
                     'infCnt': 0
                   }
                   localStorage.removeItem('internaCount');
                   localStorage.setItem('inlandCount',JSON.stringify(this.searchView.calNumber));
                   sessionStorage.setItem('countryType','inland');
                   this.searchView.isAdult = true;
                   this.searchView.isChd  = false;
                 } 
                 if(toCityCode !="CHINA"){
                   if(this.searchView.rountingType == 'OW'){
                     this.searchView.calNumber = {
                       'adtCnt': this.searchView.singleAduNum,
                       'chdCnt': 0,
                       'infCnt': 0
                     }
                   }else{
                     this.searchView.calNumber = {
                       'adtCnt': this.searchView.aduNum,
                       'chdCnt': this.searchView.chdNum,
                       'infCnt': 0
                     }
                   }
                   localStorage.removeItem('inlandCount');
                   localStorage.setItem('internaCount',JSON.stringify(this.searchView.calNumber));
                   sessionStorage.setItem('countryType','international');
                   this.searchView.isAdult = false;
                   this.searchView.isChd  = true;
                 }else{
                   this.searchView.calNumber = {
                     'adtCnt': this.searchView.singleAduNum,
                     'chdCnt': 0,
                     'infCnt': 0
                   }
                   localStorage.removeItem('internaCount');
                   localStorage.setItem('inlandCount',JSON.stringify(this.searchView.calNumber));
                   sessionStorage.setItem('countryType','inland');
                   this.searchView.isAdult = true;
                   this.searchView.isChd  = false;
                 }   
          },  
          (err) => console.log('err:'+err)
        ); 
  }

  aduChange(event: number) {
    this.searchView.aduNum = `${event}`;
  }

  chdChange(event:number){
    this.searchView.chdNum = `${event}`
    if(this.searchView.chdNum > this.searchView.aduNum){
      let tipAlert = this.alertCtrl.create({
         title: '一成人最多能携带两名儿童！请重新选择!',
         buttons: ['确定']
      });
      tipAlert.present();
    }
  }

  searchbtn(){ 
    if(this.searchView.rountingType == 'OW'){
          sessionStorage.setItem('routingType','OW'); 
          if(this.searchView.depCity === '出发城市' || this.searchView.arrCity === '到达城市' || this.searchView.depCityCode === '' || this.searchView.arrCityCode === '' || 
          this.searchView.cabin === undefined || this.dep.nativeElement.value === '出发时间'){
            let msgAlert = this.alertCtrl.create({
               title: '请填写完整信息!',
               buttons: ['确定']
             });
             msgAlert.present();
          }else if(this.searchView.depCity === this.searchView.arrCity){
            let msgAlert = this.alertCtrl.create({
               title: '出发到达城市不能相同!',
               buttons: ['确定']
             });
             msgAlert.present();
          }else{
            this.navCtrl.push(FlightqueryPage,{
              'routingType':   this.searchView.rountingType,
              'deptCity':      this.searchView.depCityCode,
              'arrCity':       this.searchView.arrCityCode,
              'deptStartDate': this.searchView.depTimePost,
              'seatClass':     this.searchView.cabin,
              'adtCnt':        this.searchView.singleAduNum,
              'chdCnt':        0,
              'infCnt':        0,
              'deptCityName':  this.searchView.depCity,
              'arrCityName':   this.searchView.arrCity
            });
          }
          
      }else{
          sessionStorage.setItem('routingType','RT');
          if(this.arr.nativeElement.value =='返回日期'){
           let msgAlert = this.alertCtrl.create({
               title: '请填写完整信息!',
               buttons: ['确定']
             });
             msgAlert.present();
          }else if(this._UtilsService.datediff(this.searchView.depTimePost,this.searchView.arrTimePost, "day") < 0 ){
            let msgAlert = this.alertCtrl.create({
               title: '到达时间应大于出发时间!',
               buttons: ['确定']
             });
             msgAlert.present();
          }else{
            this.navCtrl.push(FlightqueryPage,{
              'routingType':   this.searchView.rountingType,
              'deptCity':      this.searchView.depCityCode,
              'arrCity':       this.searchView.arrCityCode,
              'deptStartDate': this.searchView.depTimePost,
              'deptEndDate':   this.searchView.arrTimePost,
              'seatClass':     this.searchView.cabin,
              'adtCnt':        this.searchView.aduNum,
              'chdCnt':        this.searchView.chdNum,
              'infCnt':        0,
              'deptCityName':  this.searchView.depCity,
              'arrCityName':   this.searchView.arrCity
            });
          }
      }
  }

}
