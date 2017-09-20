import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController } from 'ionic-angular';
import { CalendarModal, CalendarModalOptions, DayConfig } from "ion2-calendar";
import { ContactPage } from '../contact/contact'; 
import { FlightqueryPage } from '../flightquery/flightquery';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  depCity: string = '出发城市';
  arrCity: string = '到达城市';	
  isEx: boolean = true;
  dependentColumns: any[];
  currentDate: String;
  rountingType:string ='OW';
  depCityCode:string;
  arrCityCode:string;
  isRT: Boolean;
  isShow: Boolean = false;
  isAdult: Boolean = true;
  isChd: Boolean = false;
  cabin: string = 'Y';
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController) {
    //cabin start
    // Independent columns
    
    //cabin end
    //time start
    this.currentDate = (new Date()).toISOString();
      //time end
      //adult start
      this.dependentColumns = [
        {
          columnWidth: '100px',
          options: [
            { text: '成人1', value: '1' },
            { text: '成人2', value: '2' },
            { text: '成人3', value: '3' },
            { text: '成人4', value: '4' },
            { text: '成人5', value: '5' },
            { text: '成人6', value: '6' },
            { text: '成人7', value: '7' },
            { text: '成人8', value: '8' },
            { text: '成人9', value: '9' },
            { text: '成人10', value: '10' }]
        },
        {
          columnWidth: '100px',
          options: [
            { text: '儿童0', value: '0', parentVal: '1' },
            { text: '儿童1', value: '1', parentVal: '1' },
            
            { text: '儿童0', value: '0', parentVal: '2' },
            { text: '儿童1', value: '1', parentVal: '2' },
            { text: '儿童2', value: '2', parentVal: '2' },

            { text: '儿童0', value: '0', parentVal: '3' },
            { text: '儿童1', value: '1', parentVal: '3' },
            { text: '儿童2', value: '2', parentVal: '3' },
            { text: '儿童3', value: '3', parentVal: '3' },
            
            { text: '儿童0', value: '0', parentVal: '4' },
            { text: '儿童1', value: '1', parentVal: '4' },
            { text: '儿童2', value: '2', parentVal: '4' },
            { text: '儿童3', value: '3', parentVal: '4' },
            { text: '儿童4', value: '4', parentVal: '4' },

            { text: '儿童0', value: '0', parentVal: '5' },
            { text: '儿童1', value: '1', parentVal: '5' },
            { text: '儿童2', value: '2', parentVal: '5' },
            { text: '儿童3', value: '3', parentVal: '5' },
            { text: '儿童4', value: '4', parentVal: '5' },
            { text: '儿童5', value: '5', parentVal: '5' },

            { text: '儿童0', value: '0', parentVal: '6' },
            { text: '儿童1', value: '1', parentVal: '6' },
            { text: '儿童2', value: '2', parentVal: '6' },
            { text: '儿童3', value: '3', parentVal: '6' },
            { text: '儿童4', value: '4', parentVal: '6' },
            { text: '儿童5', value: '5', parentVal: '6' },
            { text: '儿童6', value: '6', parentVal: '6' },

            { text: '儿童0', value: '0', parentVal: '7' },
            { text: '儿童1', value: '1', parentVal: '7' },
            { text: '儿童2', value: '2', parentVal: '7' },
            { text: '儿童3', value: '3', parentVal: '7' },
            { text: '儿童4', value: '4', parentVal: '7' },
            { text: '儿童5', value: '5', parentVal: '7' },
            { text: '儿童6', value: '6', parentVal: '7' },
            { text: '儿童7', value: '7', parentVal: '7' },

            { text: '儿童0', value: '0', parentVal: '8' },
            { text: '儿童1', value: '1', parentVal: '8' },
            { text: '儿童2', value: '2', parentVal: '8' },
            { text: '儿童3', value: '3', parentVal: '8' },
            { text: '儿童4', value: '4', parentVal: '8' },
            { text: '儿童5', value: '5', parentVal: '8' },
            { text: '儿童6', value: '6', parentVal: '8' },
            { text: '儿童7', value: '7', parentVal: '8' },
            { text: '儿童8', value: '8', parentVal: '8' },

            { text: '儿童0', value: '0', parentVal: '9' },
            { text: '儿童1', value: '1', parentVal: '9' },
            { text: '儿童2', value: '2', parentVal: '9' },
            { text: '儿童3', value: '3', parentVal: '9' },
            { text: '儿童4', value: '4', parentVal: '9' },
            { text: '儿童5', value: '5', parentVal: '9' },
            { text: '儿童6', value: '6', parentVal: '9' },
            { text: '儿童7', value: '7', parentVal: '9' },
            { text: '儿童8', value: '8', parentVal: '9' },
            { text: '儿童9', value: '9', parentVal: '9' },

            { text: '儿童0', value: '0', parentVal: '10' },
            { text: '儿童1', value: '1', parentVal: '10' },
            { text: '儿童2', value: '2', parentVal: '10' },
            { text: '儿童3', value: '3', parentVal: '10' },
            { text: '儿童4', value: '4', parentVal: '10' },
            { text: '儿童5', value: '5', parentVal: '10' },
            { text: '儿童6', value: '6', parentVal: '10' },
            { text: '儿童7', value: '7', parentVal: '10' },
            { text: '儿童8', value: '8', parentVal: '10' },
            { text: '儿童9', value: '9', parentVal: '10' },
            { text: '儿童10', value: '10', parentVal: '10' }]
        }
    ]  
      //adult end
  }
  @ViewChild('cityGo') cityGo: ElementRef;
  @ViewChild('cityBack') cityBack: ElementRef;
  @ViewChild('dep') dep: ElementRef;
  @ViewChild('arr') arr: ElementRef;
  ionViewDidLoad() {
    const fromCity = JSON.parse(localStorage.getItem('fromCity'));
    const toCity   = JSON.parse(localStorage.getItem('toCity'));
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
        date: new Date(2017, 9, 15),
        subTitle: `¥500`
      },
      {
        date: new Date(2017, 10, 25),
        subTitle: `¥1500`
      }
      )
    }
    const options: CalendarModalOptions = {
      canBackwardsSelected: true,
      monthFormat: 'yyyy 年 MM 月 ',
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      weekStart: 1,
      defaultDate: new Date(),
      title: '出发时间',
      closeLabel: '取消',
      doneLabel: '确定',
      daysConfig: _daysConfig
    };

    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss(date => {
      if(date){
         this.dep.nativeElement.innerText = date.string;
      }else{
         this.dep.nativeElement.innerText ='出发时间';
      }
    })

  }

  toDate() {
  	let _daysConfig1: DayConfig[] = [];
    for (let i = 0; i < 31; i++) {
      _daysConfig1.push(
      {
        date: new Date(2017, 12, 15),
        subTitle: `¥800`
      },
      {
        date: new Date(2017, 8, 25),
        subTitle: `¥730`
      }
      )
    }
    const options1: CalendarModalOptions = {
      monthFormat: 'yyyy 年 MM 月 ',
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      weekStart: 1,
      defaultDate: new Date(),
      title: '返回时间',
      closeLabel: '取消',
      doneLabel: '确定',
      daysConfig: _daysConfig1
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options1
    });
    myCalendar.present();

    myCalendar.onDidDismiss(date => {
      if(date){
         this.arr.nativeElement.innerText = date.string;
      }else{
         this.arr.nativeElement.innerText = '请选择返回日期';
      }
    })
  }

  updateRT(){
    if(this.isRT == true){
      this.isShow = true;
      this.isAdult = false;
      this.isChd  = true;
      this.rountingType = 'RT';
    }else{
      this.isShow = false;
      this.isAdult = true;
      this.isChd  = false;
      this.rountingType = 'OW';
    }
  }
   
   //sumbit search start
   searchbtn(){
    if(this.rountingType == 'OW'){
        sessionStorage.setItem('routingType','OW'); 
        this.navCtrl.push(FlightqueryPage,{
            'routingType':   this.rountingType,
            'deptCity':      this.depCityCode,
            'arrCity':       this.arrCityCode,
            'deptStartDate': this.dep.nativeElement.innerText,
            'seatClass':     this.cabin,
            'adtCnt':        1,
            'chdCnt':        0,
            'infCnt':        0,
            'deptCityName':  this.depCity,
            'arrCityName':   this.arrCity
          });
    }else{
        sessionStorage.setItem('routingType','RT');
        if(this.arr.nativeElement.innerText =='请选择返回日期'){
         let msgAlert = this.alertCtrl.create({
           title: '请填写完整信息!',
           buttons: ['确定']
         });
         msgAlert.present();
        }else{
          this.navCtrl.push(FlightqueryPage,{
            'routingType':   this.rountingType,
            'deptCity':      this.depCityCode,
            'arrCity':       this.arrCityCode,
            'deptStartDate': this.dep.nativeElement.innerText,
            'deptEndDate':   this.arr.nativeElement.innerText,
            'seatClass':     this.cabin,
            'adtCnt':        1,
            'chdCnt':        1,
            'infCnt':        1,
            'deptCityName':  this.depCity,
            'arrCityName':   this.arrCity
          });
        }
    }

    
 
    
    //sumbit search end

    
  }

}
