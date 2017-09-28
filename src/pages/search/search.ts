import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController,Slides } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { AirportService } from '../../service/airport.service';
import { UtilsService } from '../../service/utils.service';
import { CalendarModal, CalendarModalOptions, DayConfig } from "ion2-calendar";
import { ContactPage } from '../contact/contact'; 
import { FlightqueryPage } from '../flightquery/flightquery';
import { CountComponent } from '../../components/counter/counter';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers:[HttpService,AirportService,UtilsService,CountComponent]
})
export class SearchPage {
  count: number = 0;
  adultcount: number = 1;
  singleAduNum: number = 1;
  aduNum: any = 1;
  chdNum: any = 0;
  depCity: string = '出发城市';
  arrCity: string = '到达城市';	
  isEx: boolean = true;
  dependentColumns: any[];
  currentDate: String;
  rountingType:string ='OW';
  depCityCode:string;
  arrCityCode:string;
  depCityNameEn: any;
  isRT: boolean;
  isShow: boolean = false;
  isAdult: boolean = true;
  isChd: boolean = false;
  isMsg: boolean = true;
  cabin: string = 'Y';
  countryEn: string;
  formCityCode: any;
  toCityCode: any;
  diffType: string;
  undeTx:   string;
  depTimePost: string;
  arrTimePost: string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private _AirportService: AirportService,
              private _UtilsService: UtilsService) {
}
  @ViewChild('cityGo') cityGo: ElementRef;
  @ViewChild('cityBack') cityBack: ElementRef;
  @ViewChild('dep') dep: ElementRef;
  @ViewChild('arr') arr: ElementRef;
  @ViewChild('depWeek') depWeek: ElementRef;
  @ViewChild('arrWeek') arrWeek: ElementRef;
  @ViewChild(Slides) slides: Slides;
  ionViewDidLoad() {
    const fromCity = JSON.parse(localStorage.getItem('fromCity'));
    const toCity   = JSON.parse(localStorage.getItem('toCity'));
    const countryType = sessionStorage.getItem('countryType');
    let depTime  = sessionStorage.getItem('depTime');
    let arrTime  = sessionStorage.getItem('arrTime');
    if(fromCity){
      if(fromCity.cityName){
         this.depCity = fromCity.cityName;
         this.depCityCode = fromCity.cityCode;
      }else{
         this.depCity = '出发城市';
      }
    }
    if(toCity){
      if(toCity.cityName){
         this.arrCity = toCity.cityName;
         this.arrCityCode = toCity.cityCode;
      }else{
         this.arrCity = '到达城市';
      }
    }
    if(countryType){
       if(countryType === 'inland'){
          this.isAdult = true;
          this.isChd  = false;
       }
       if(countryType === 'international'){
          this.isAdult = false;
          this.isChd  = true;
       }
    }
    if(depTime){
      let depTimeStr = JSON.parse(depTime);
      this.dep.nativeElement.value = depTimeStr.string.substr(5,2)+'月'+depTimeStr.string.substr(8,2) +'日';
      this.depTimePost = depTimeStr.string;
      this.depWeek.nativeElement.innerHTML = this._UtilsService.getWeek(depTimeStr.string);
    }else{
      this.undeTx = this._UtilsService.addDate(1,'');
      this.dep.nativeElement.value = this._UtilsService.addDate(1,'months');
      this.depTimePost = this._UtilsService.addDate(1,'');
      this.depWeek.nativeElement.innerHTML = this._UtilsService.getWeek(this.undeTx);
    }
    if(arrTime){
      let arrTimeStr = JSON.parse(arrTime);
      this.arr.nativeElement.value = arrTimeStr.string.substr(5,2)+'月'+arrTimeStr.string.substr(8,2) +'日';
      this.arrTimePost = arrTimeStr.string;
      this.arrWeek.nativeElement.innerHTML = this._UtilsService.getWeek(arrTimeStr.string);
    }
   
    const type = this.navParams.get('type');
      if(type == 'depback'){
         this.judgeGnorGj();
      }  
      if(type == 'arrback'){
         this.judgeGnorGj();
      }
  }

  ionViewWillEnter(){
    this.slides.startAutoplay();
  }
  ionViewWillLeave(){
    this.slides.stopAutoplay();
  }

  exchange() {  
  	this.depCity = this.cityBack.nativeElement.innerText;
  	this.arrCity = this.cityGo.nativeElement.innerText;
    this.isEx = !this.isEx;
  }

  depCityGo(){
    this.navCtrl.push(ContactPage,{
      'type':'dep'
    });
  }
  arrCityGo(){
    this.navCtrl.push(ContactPage,{
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
         this.depWeek.nativeElement.innerHTML = this._UtilsService.getWeek(date.string);
         this.depTimePost = date.string;
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
         this.arrWeek.nativeElement.innerHTML = this._UtilsService.getWeek(date.string);
         this.arrTimePost = date.string;
         sessionStorage.setItem('arrTime', JSON.stringify(date));
      }else{
         this.arr.nativeElement.value = '请选择返回日期';
      }
    })
  }

  updateRT(){
    if(this.isRT == true){
      this.isShow = true;
      this.rountingType = 'RT';
    }else{
      this.isShow = false;
      this.rountingType = 'OW';
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
                    if(res[i].cityCode === this.depCityCode || res[i].cityCode === this.arrCityCode){
                      formCityCode = res[i].countryEn;
                      toCityCode = res[i].countryEn;
                    }
                 } 
                 if(formCityCode !="CHINA"){
                   const count = {
                     'adtCnt': 1,
                     'chdCnt': 0
                   }
                   sessionStorage.setItem('internaCount',JSON.stringify(count));
                   sessionStorage.setItem('countryType','international');
                   this.isAdult = false;
                   this.isChd  = true;
                 }else{
                   sessionStorage.setItem('countryType','inland');
                   this.isAdult = true;
                   this.isChd  = false;
                 } 
                 if(toCityCode !="CHINA"){
                   const count = {
                     'adtCnt': 1,
                     'chdCnt': 0
                   }
                   sessionStorage.setItem('internaCount',JSON.stringify(count));
                   sessionStorage.setItem('countryType','international');
                   this.isAdult = false;
                   this.isChd  = true;
                 }else{
                   sessionStorage.removeItem('internaCount');
                   sessionStorage.setItem('countryType','inland');
                   this.isAdult = true;
                   this.isChd  = false;
                 }   
          },  
          (err) => console.log('err:'+err)
        ); 
  }


  aduChange(event: number) {
    this.aduNum = `${event}`;
  }

  chdChange(event:number){
    this.chdNum = `${event}`
    if(this.chdNum > this.aduNum){
      console.log('一成人最多能携带两名儿童！请重新选择');
    }
  }

  searchbtn(){ 
    if(this.rountingType == 'OW'){
          sessionStorage.setItem('routingType','OW'); 
          if(this.depCity === '出发城市' || this.arrCity === '到达城市' || this.depCityCode === '' || this.arrCityCode === '' || 
          this.cabin === undefined || this.dep.nativeElement.value === '出发时间'){
            let msgAlert = this.alertCtrl.create({
               title: '请填写完整信息!',
               buttons: ['确定']
             });
             msgAlert.present();
          }else if(this.depCity === this.arrCity){
            let msgAlert = this.alertCtrl.create({
               title: '出发到达城市不能相同!',
               buttons: ['确定']
             });
             msgAlert.present();
          }else{
            this.navCtrl.push(FlightqueryPage,{
              'routingType':   this.rountingType,
              'deptCity':      this.depCityCode,
              'arrCity':       this.arrCityCode,
              'deptStartDate': this.depTimePost,
              'seatClass':     this.cabin,
              'adtCnt':        this.singleAduNum,
              'chdCnt':        0,
              'infCnt':        0,
              'deptCityName':  this.depCity,
              'arrCityName':   this.arrCity
            });
          }
          
      }else{
          sessionStorage.setItem('routingType','RT');
          if(this.arr.nativeElement.value =='请选择返回日期'){
           let msgAlert = this.alertCtrl.create({
               title: '请填写完整信息!',
               buttons: ['确定']
             });
             msgAlert.present();
          }else if(this._UtilsService.datediff(this.depTimePost,this.arrTimePost, "day") < 0 ){
            let msgAlert = this.alertCtrl.create({
               title: '到达时间应大于出发时间!',
               buttons: ['确定']
             });
             msgAlert.present();
          }else{
            this.navCtrl.push(FlightqueryPage,{
              'routingType':   this.rountingType,
              'deptCity':      this.depCityCode,
              'arrCity':       this.arrCityCode,
              'deptStartDate': this.depTimePost,
              'deptEndDate':   this.arrTimePost,
              'seatClass':     this.cabin,
              'adtCnt':        this.aduNum,
              'chdCnt':        this.chdNum,
              'infCnt':        0,
              'deptCityName':  this.depCity,
              'arrCityName':   this.arrCity
            });
          }
      }
  }

}
