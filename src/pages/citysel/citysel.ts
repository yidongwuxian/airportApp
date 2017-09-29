import { Component,ViewChildren, ViewChild, ChangeDetectorRef, ElementRef, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Contacts } from '../../service/contacts.service';
import { HttpService } from '../../service/http.service';
import { SearchPage } from '../search/search';

@IonicPage()
@Component({
  selector: 'citysel',
  template: `
      <ion-header >
          <ion-navbar class="search_hd">
            <ion-searchbar (ionInput)="getItems($event)" (ionCancel)="onCancel($event)" (ionClear)="onCancel($event)" ></ion-searchbar> 
          </ion-navbar>
          <ion-segment class="search_box" [(ngModel)]="change">
                <ion-segment-button value="internal">
                  <p (click)="switchTab()">国内</p>
                </ion-segment-button>
                <ion-segment-button value="international">
                  <p (click)="switchTab()">国际</p>
                </ion-segment-button>
            </ion-segment>  
      </ion-header>
      <ion-content (ionScroll)="onScroll()">
      <div [ngSwitch]="change">
          <div *ngSwitchCase="'internal'">
                <div #IndexedMenu class="indexed-menu" style="top:100px">
                    <div class="indexed-item"
                         [class.activate]="item === index" *ngFor="let item of _indexes;index as i; trackBy:trackByIndexes" (click)='selectIndex(i)'>
                         {{ item }}
                    </div>
                </div>
                <ion-list #scheduleList>
                    <ion-item-group *ngFor="let item of contacts" #IonItemGroup>
                        <div *ngIf="item.groupName == '#'">
                            <div class="in_bd">
                                <div class="history_record">
                                  <p>当前/历史</p>
                                  <ul>
                                      <li>北京</li>
                                      <li>澳门</li>
                                      <li>长沙</li>
                                      <li>福州</li>
                                  </ul>
                                </div>
                            </div>
                        </div>
                        <div *ngIf="item.groupName == '热门'">
                          <div class="in_bd">
                            <div class="hot_city">
                                  <p>热门</p>
                                  <ul>
                                      <li *ngFor="let inlandHotCity of inlandHotCitys" (click)="calling(inlandHotCity)">{{inlandHotCity.name}}</li>
                                  </ul>
                                </div>
                          </div>
                        </div>
                        <div *ngIf="item.groupName != '#' && item.groupName != '热门' ">
                          <ion-item-divider sticky index-key="item.belong">
                              <ion-label>
                                  {{item.groupName}}
                              </ion-label>
                          </ion-item-divider>
                        </div>
                        
                        <ion-item-sliding *ngFor="let contactItem of item.contacts" #slidingItem (click)="calling(contactItem)">
                            <ion-item>
                                {{ contactItem.name }}
                            </ion-item>
                        </ion-item-sliding>
                    </ion-item-group>
                </ion-list>
                <div class="modal"
                     [class.show]="showModal">
                    {{index}}
                </div>
          </div>
          <div *ngSwitchCase="'international'">
                <div #IndexedMenu class="indexed-menu">
                    <div class="indexed-item"
                         [class.activate]="item === index"  *ngFor="let item of _indexes;index as i; trackBy:trackByIndexes" (click)='selectIndex(i)'>
                         {{ item }}
                    </div>
                </div>
                <ion-list #scheduleList>
                    <ion-item-group *ngFor="let item of contacts" #IonItemGroup>
                        <div *ngIf="item.groupName == '#'">
                            <div class="in_bd">
                                <div class="history_record">
                                  <p>当前/历史</p>
                                  <ul>
                                      <li>北京</li>
                                      <li>澳门</li>
                                      <li>长沙</li>
                                      <li>福州</li>
                                  </ul>
                                </div>
                            </div>
                        </div>
                        <div *ngIf="item.groupName == '热门'">
                          <div class="in_bd">
                            <div class="hot_city">
                                  <p>热门</p>
                                  <ul>
                                      <li *ngFor="let inlandHotCity of inlandHotCitys" (click)="calling(inlandHotCity)">{{inlandHotCity.name}}</li>
                                  </ul>
                                </div>
                          </div>
                        </div>
                        <div *ngIf="item.groupName != '#' && item.groupName != '热门' ">
                          <ion-item-divider sticky index-key="item.belong">
                              <ion-label>
                                  {{item.groupName}}
                              </ion-label>
                          </ion-item-divider>
                        </div>
                        <ion-item-sliding *ngFor="let contactItem of item.contacts" #slidingItem (click)="calling(contactItem)">
                            <ion-item >
                                {{ contactItem.name }}
                            </ion-item>
                        </ion-item-sliding>
                    </ion-item-group>
                </ion-list>
                <div class="modal"
                     [class.show]="showModal">
                    {{index}}
                </div>
         </div>
    </div>
</ion-content>   
  `,
  providers:[Contacts,HttpService]
})
export class CityselPage implements OnInit{
  change: string = 'internal';  
  index: string = 'A';
  showModal: boolean = false;
  timeout: any;
  indexes: Array<string> = "#热ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''); 
  _indexes: Array<string>;
  offsetTops: Array<number> = [];
  contacts: Array<any> = [];
  contactsData: Array<any> =[];
  contactsStorage: Array<any> = [];
  cityParam: Object = {};
  showhotcity: boolean = false;
  inlandHotCitys: Array<any> = [];
  @ViewChildren('IonItemGroup') ionItemGroup;
  @ViewChild(Content) content: Content;	
  @ViewChild('mydiv') mydiv: ElementRef;

    constructor(public navCtrl: NavController,
                public contactsSev: Contacts,
                public _HttpService: HttpService,
                public navParams: NavParams,
                public ref: ChangeDetectorRef) {}

    ionViewDidEnter() {
        this.getOffsetTops();
    }

    ngOnInit(){
        this.initializeGnItems();
        this.showhotcity = true;
    }

    initializeItems(dataUrl){
      this.contactsSev.getContacts(dataUrl)
      .then(res => {
          this.contactsData =res;
          this.contacts = this.contactsSev.grouping(res);
          let indexsData = [];
          for(let i=0; i<this.contacts.length; i++){
            indexsData.push(this.contacts[i].groupName);
          }  
          this._indexes = indexsData;
          sessionStorage.setItem('gn-country', JSON.stringify(this.contacts));
      })
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
         this.initializeGnItems();
       }else{
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
         this.contacts = this.contactsSev.grouping(tempData);
	    }
	  }

    onCancel(ev: any){
      this.contacts = JSON.parse(sessionStorage.getItem('gn-country')) 
    }

    calling(contactItem){
      this.cityParam = {
          'cityName': contactItem.name,
          'cityCode': contactItem.sanzima
      }
      const type = this.navParams.get('type');
      if(type == 'dep'){
        localStorage.setItem('fromCity', JSON.stringify(this.cityParam));
        this.navCtrl.push(SearchPage,{'type':'depback'});
      }
      if(type == 'arr'){
        localStorage.setItem('toCity', JSON.stringify(this.cityParam));
        this.navCtrl.push(SearchPage,{'type':'arrback'});
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
