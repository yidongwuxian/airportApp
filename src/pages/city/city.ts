import { Component,ViewChildren, ViewChild, ChangeDetectorRef, ElementRef, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';
import { Contacts } from '../../service/contacts.service';
import { HttpService } from '../../service/http.service';
import { SearchPage } from '../../pages/search/search';
declare var AMap:any;

@IonicPage()
@Component({
  selector: 'page-city',
  templateUrl: 'city.html',
  providers:[Contacts,HttpService]
})
export class CityPage implements OnInit{
  change: string = 'internal';  
  index: string = 'A';
  showModal: boolean = false;
  timeout: any;
  indexes: Array<string> = "#热ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''); 
  _indexes: Array<string>;
  offsetTops: Array<number> = [];
  contactsGN: Array<any> = [];
  contactsGJ: Array<any> = [];
  contactsData: Array<any> =[];
  contactsStorage: Array<any> = [];
  cityParam: any;
  hisParam: any;
  inlandHotCitys: Array<any> = [];
  localCountry: string;
  curCountryGn: Array<any> = [];
  curCountryGj: Array<any> = [];
  stockpileFlag: boolean= true;
  map: any;
  type: any;
  @ViewChildren('IonItemGroup') ionItemGroup;
  @ViewChild(Content) content: Content;	
  @ViewChild('mydiv') mydiv: ElementRef;
  @ViewChild('currentCountry') currentCountry: ElementRef;

  constructor(public navCtrl: NavController,
	            public contactsSev: Contacts,
	            public _HttpService: HttpService,
	            public alertCtrl: AlertController,
	            public navParams: NavParams,
	            public ref: ChangeDetectorRef) {
	}

  ionViewDidLoad() {
      let localCountry = localStorage.getItem('localCountry');
        if(localCountry){
          this.localCountry = localCountry
        } 
    }

    ionViewDidEnter() {
        this.getOffsetTops();
    }

    ngOnInit(){ 
        this.type = this.navParams.get('type'); 
        this.initializeGnItems();
        this.switchHis('historyCityDep','historyCityArr');
    }

    switchHis(obj1,obj2){
      if(this.type == 'dep'){
        this.addHistory(obj1);
      }
      if(this.type == 'arr'){
        this.addHistory(obj2);
      }
    }

    getCountry(name){
        var citysearch = new AMap.CitySearch();
        citysearch.getLocalCity(function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city) {
                    var cityinfo = result.city;
                    document.getElementById(name).innerHTML = cityinfo;
                    localStorage.setItem('localCountry', cityinfo);
                }
            } else {
                    document.getElementById(name).innerHTML = result.info;
            }
        });
    }

    initializeItems(){
      if(this.change === 'internal'){    
          this.contactsSev.getContactsGn()
		      .then(res => {
               this.contactsGN = this.contactsSev.grouping(res);
               sessionStorage.removeItem('gj-country');
               this.initialView('gn',this.contactsGN);
		      })
      }
      if(this.change === 'international'){
		      this.contactsSev.getContactsGj()
		      .then(res => {
             this.contactsGJ = this.contactsSev.grouping(res);
             sessionStorage.removeItem('gn-country');
             this.initialView('gj',this.contactsGJ);
		      })
      }
    }

    initialView(name,objName){
        let indexsData = [];
        for(let i=0; i<objName.length; i++){
          indexsData.push(objName[i].groupName);
        } 
        this._indexes = indexsData;
        sessionStorage.setItem(name+'-country', JSON.stringify(objName));
    }

    initialCountry(dataUrl){
      this._HttpService.get(dataUrl)
      .subscribe(
        (res) => { 
           this.inlandHotCitys = res;
        },
        (err) => console.log('err:'+err)
      );
    }

    initializeGnItems(){
      let gnCountryUrl = './assets/data/inlandHotCity.json';
      this.initializeItems()
      this.initialCountry(gnCountryUrl)
    }

    initializeGjItems(){
      let gjCountryUrl = './assets/data/interHotCity.json';
      this.initializeItems()
      this.initialCountry(gjCountryUrl)
    }

    switchTab(){
       if(this.change === 'internal'){
         this.initializeGnItems();
         this.switchHis('historyCityDep','historyCityArr');
       }else{
         this.initializeGjItems();
         this.switchHis('historyCityDepInt','historyCityArrInt');
       }
    }

    getItems(ev: any) {
	    let val = ev.target.value;
	    if (val && val.trim() != '') { 
         let tempData:Array<any> = [];
         for(let i=0; i<this.contactsData.length; i++){
           if(this.contactsData[i].match.indexOf(val.toUpperCase()) > -1){
             tempData.push(this.contactsData[i]);
           }
         }
         if(this.change === 'internal'){
           this.contactsGN = this.contactsSev.grouping(tempData);
         }else{
           this.contactsGJ = this.contactsSev.grouping(tempData);
         } 
	    }
	  }

    onCancel(ev: any){
      if(this.change === 'internal'){
        this.contactsGN = JSON.parse(sessionStorage.getItem('gn-country')) 
      }else{
        this.contactsGJ = JSON.parse(sessionStorage.getItem('gj-country')) 
      }
    }

    saveHistory(obj){
      let historyCity = JSON.parse(localStorage.getItem(obj));
      if(!historyCity){
          historyCity=[];
      }else{
          historyCity.forEach((item,n) => {
            if(item.cityCode === this.cityParam.cityCode){
              this.stockpileFlag = false;
            }
          })
      }
      if(this.stockpileFlag && historyCity.length < 3){
        localStorage.removeItem(obj);
        historyCity.push(this.cityParam);
      }else{
        historyCity.shift();
        historyCity.push(this.cityParam);
      }
      localStorage.setItem(obj, JSON.stringify(historyCity));
    }

    calling(objItem){
      this.cityParam = {
          'cityName': objItem.name,
          'cityCode': objItem.sanzima
      }
      if(this.cityParam.cityCode === ''){
         let cityParAlert = this.alertCtrl.create({
             title: '您选择的城市还没有开通机场哦!',
             buttons: ['确定']
          });
         cityParAlert.present();
         setTimeout(() => {
          cityParAlert.dismiss();
         }, 2000);
      }

      if(this.change === 'internal'){
          if(this.type == 'dep'){
            localStorage.setItem('fromCity', JSON.stringify(this.cityParam)); 
            let historyCity = JSON.parse(localStorage.getItem('historyCityDep'));
            this.saveHistory('historyCityDep');
            this.navCtrl.push(SearchPage,{'type':'depback'});
          }
          if(this.type == 'arr'){
            localStorage.setItem('toCity', JSON.stringify(this.cityParam)); 
            let historyCity = JSON.parse(localStorage.getItem('historyCityArr'));
            this.saveHistory('historyCityArr');
            this.navCtrl.push(SearchPage,{'type':'arrback'});
          }
      }
      if(this.change === 'international'){
          if(this.type == 'dep'){
            localStorage.setItem('fromCity', JSON.stringify(this.cityParam)); 
            let historyCity = JSON.parse(localStorage.getItem('historyCityDepInt'));
            this.saveHistory('historyCityDepInt');
            this.navCtrl.push(SearchPage,{'type':'depback'});
          }
          if(this.type == 'arr'){
            localStorage.setItem('toCity', JSON.stringify(this.cityParam)); 
            let historyCity = JSON.parse(localStorage.getItem('historyCityArrInt'));
            this.saveHistory('historyCityArrInt');
            this.navCtrl.push(SearchPage,{'type':'arrback'});
          }
      }
    }


    selectHistroy(objItem){
      this.cityParam = {
          'cityName': objItem.cityName,
          'cityCode': objItem.cityCode
      }
      if(this.cityParam.cityCode === ''){
         let cityParAlert = this.alertCtrl.create({
             title: '您选择的城市还没有开通机场哦!',
             buttons: ['确定']
          });
         cityParAlert.present();
         setTimeout(() => {
          cityParAlert.dismiss();
         }, 2000);
      }

      if(this.change === 'internal'){
        if(this.type == 'dep'){
          localStorage.setItem('fromCity', JSON.stringify(this.cityParam)); 
          let historyCity = JSON.parse(localStorage.getItem('historyCityDep'));
          this.saveHistory('historyCityDep');
          this.navCtrl.push(SearchPage,{'type':'depback'});
        }
        if(this.type == 'arr'){
          localStorage.setItem('toCity', JSON.stringify(this.cityParam)); 
          let historyCity = JSON.parse(localStorage.getItem('historyCityArr'));
          this.saveHistory('historyCityArr');
          this.navCtrl.push(SearchPage,{'type':'arrback'});
        }
      }else{
        if(this.type == 'dep'){
          localStorage.setItem('fromCity', JSON.stringify(this.cityParam)); 
          let historyCity = JSON.parse(localStorage.getItem('historyCityDepInt'));
          this.saveHistory('historyCityDepInt');
          this.navCtrl.push(SearchPage,{'type':'depback'});
        }
        if(this.type == 'arr'){
          localStorage.setItem('toCity', JSON.stringify(this.cityParam)); 
          let historyCity = JSON.parse(localStorage.getItem('historyCityArrInt'));
          this.saveHistory('historyCityArrInt');
          this.navCtrl.push(SearchPage,{'type':'arrback'});
        }
      }

    }



    addHistory(historyCity){
      let historyCityArr=JSON.parse(localStorage.getItem(historyCity));
      if(historyCityArr){
         historyCityArr.forEach((item,n) => {
           if(item.cityName == undefined){
              return;
            }else{
              if(this.change === 'internal'){
                  let CountryGN={
                    'cityName': item.cityName,
                    'cityCode': item.cityCode
                  }
                  this.curCountryGn.push(CountryGN);
              }else{
                  let CountryGJ={
                    'cityName': item.cityName,
                    'cityCode': item.cityCode
                  }
                  this.curCountryGj.push(CountryGJ);
              }
              console.log(this.curCountryGj);
            }
        })
      }
    }

    getOffsetTops() {
        this.offsetTops = this.ionItemGroup._results.map(ele => {
            return ele.nativeElement.offsetTop;
        })
    }

    selectIndex(index: number) {
        this.getOffsetTops();
        this.index = this._indexes[index];
        let offsetTop = this.offsetTops[index];
        this.content.scrollTo(0, offsetTop, 300);
        this.createModal();
        return false;
    }

    onScroll() {
        const threshold = 42;
        if (this.content.scrollTop < threshold) {
            this.index = this._indexes[0];
            return;
        }
        for (let i = this.offsetTops.length; i > 0; i--) {
            if (this.content.scrollTop + threshold >= this.offsetTops[i]) {
                this.index = this._indexes[i];
                this.ref.detectChanges();
                return;
            }
        }
    }

    createModal() {
        clearTimeout(this.timeout);
        this.showModal = true;
        this.timeout = setTimeout(() => {
            this.showModal = false;
            this.ref.detectChanges();
        }, 800)
    }

}
