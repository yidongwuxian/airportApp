import { Component,ViewChildren, ViewChild, ChangeDetectorRef, ElementRef, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';
import { Contacts } from '../../service/contacts.service';
import { HttpService } from '../../service/http.service';
import { SearchPage } from '../../pages/search/search';
declare var AMap:any;
@IonicPage()
@Component({
  selector: 'citysel',
  templateUrl: 'citysel.html',
  providers:[Contacts,HttpService]
})
export class CityselComponent implements OnInit{
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
  inlandHotCitys: Array<any> = [];
  localCountry: string;
  curCountry: Array<any> = [];
  stockpileFlag: boolean= true;
  @ViewChildren('IonItemGroup') ionItemGroup;
  @ViewChild(Content) content: Content;	
  @ViewChild('mydiv') mydiv: ElementRef;
  @ViewChild('currentCountry') currentCountry: ElementRef;
  map: any;
  type: any;
    constructor(public navCtrl: NavController,
                public contactsSev: Contacts,
                public _HttpService: HttpService,
                public alertCtrl: AlertController,
                public navParams: NavParams,
                public ref: ChangeDetectorRef) {
        this.getCountry('currentCountryGN');

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
        if(this.change === 'internal'){
           this.initializeGnItems();
            if(this.type == 'dep'){
              this.addHistory('historyCityDep');
            }else{
              this.addHistory('historyCityArr');
            }
        }else{ 
           this.initializeGjItems();
           if(this.type == 'dep'){
              this.addHistory('historyCityDep');
            }else{
              this.addHistory('historyCityArr');
            }
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

    initializeItems(dataUrl){
      this.contactsSev.getContacts(dataUrl)
      .then(res => {
          this.contactsData =res;
          this.initialData(res);
      })
    }

    initialData(res){ 
        if(this.change === 'internal'){
           this.contactsGN = this.contactsSev.grouping(res);
           sessionStorage.removeItem('gj-country');
           this.initialView('gn',this.contactsGN);
         }else{
           this.contactsGJ = this.contactsSev.grouping(res);
           sessionStorage.removeItem('gn-country');
           this.initialView('gj',this.contactsGJ);
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
    	const dataUrl = '../assets/data/inlandData.json';
      const gnCountryUrl = '../assets/data/inlandHotCity.json';
    	this.initializeItems(dataUrl)
      this.initialCountry(gnCountryUrl)
    }

    initializeGjItems(){
      const dataUrl = '../assets/data/internationalData.json';
      const gjCountryUrl = '../assets/data/interHotCity.json';
      this.initializeItems(dataUrl)
      this.initialCountry(gjCountryUrl)
    }

    switchTab(){
       if(this.change === 'internal'){
         this.getCountry('currentCountryGN');
         this.initializeGnItems();
       }else{
         this.getCountry('currentCountryGJ');
         this.initializeGjItems();
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
        historyCity.push(this.cityParam);
      }else{
        historyCity.shift();
        historyCity.push(this.cityParam);
      }
      localStorage.setItem(obj, JSON.stringify(historyCity));
    }

    calling(contactItem){

      console.log(contactItem);
      this.cityParam = {
          'cityName': contactItem.name,
          'cityCode': contactItem.sanzima
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
         return false;
      }

      if(this.type == 'dep'){
        localStorage.setItem('fromCity', JSON.stringify(this.cityParam));  
        this.saveHistory('historyCityDep');
        this.navCtrl.push(SearchPage,{'type':'depback'});
      }
      if(this.type == 'arr'){
        localStorage.setItem('toCity', JSON.stringify(this.cityParam));
        this.saveHistory('historyCityArr');
        this.navCtrl.push(SearchPage,{'type':'arrback'});
      } 
    }

    // hisData(obj){
    //   console.log(obj);
     
    //   if(this.type == 'dep'){
    //     localStorage.setItem('historyDep', obj);  
    //     //this.saveHistory('historyCityDep');
    //     this.navCtrl.push(SearchPage,{'type':'depback'});
    //   }
    //   if(this.type == 'arr'){
    //     localStorage.setItem('historyArr', obj);
    //     //this.saveHistory('historyCityArr');
    //     this.navCtrl.push(SearchPage,{'type':'arrback'});
    //   } 
    // }


    addHistory(historyCity){
      var historyCity=JSON.parse(localStorage.getItem(historyCity));
      if(!historyCity){
        historyCity=[];
      };

      historyCity.forEach((item,n) => {
         if(item.cityName == undefined){
            return;
          }else{
            if(this.type == 'dep'){
              let CountryGN={
                'cityName': item.cityName,
                'cityCode': item.sanzima
              }
              this.curCountry.push(CountryGN);
            }else{
              let CountryGJ={
                'cityName': item.cityName,
                'cityCode': item.sanzima
              }
              //this.curCountryGJ=item.cityName;
              this.curCountry.push(CountryGJ);
              console.log(this.curCountry);
            }
          }
      });
    };

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
