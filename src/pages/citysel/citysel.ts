import { Component,ViewChildren, ViewChild, ChangeDetectorRef, ElementRef, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Contacts } from '../../service/contacts.service';
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
                         [class.activate]="item === index"  *ngFor="let item of indexes;index as i; trackBy:trackByIndexes" (click)='selectIndex(i)'>
                         {{ item }}
                    </div>
                </div>
                <ion-list #scheduleList>
                    <ion-item-group *ngFor="let item of contacts" #IonItemGroup>
                        <ion-item-divider sticky index-key="item.belong">
                            <ion-label>
                                {{item.groupName}}
                            </ion-label>
                        </ion-item-divider>
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
          <div *ngSwitchCase="'international'">
                <div #IndexedMenu class="indexed-menu">
                    <div class="indexed-item"
                         [class.activate]="item === index"  *ngFor="let item of indexes;index as i; trackBy:trackByIndexes" (click)='selectIndex(i)'>
                         {{ item }}
                    </div>
                </div>
                <ion-list #scheduleList>
                    <ion-item-group *ngFor="let item of contacts" #IonItemGroup>
                        <ion-item-divider sticky index-key="item.belong">
                            <ion-label>
                                {{item.groupName}}
                            </ion-label>
                        </ion-item-divider>
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
  providers:[Contacts]
})
export class CityselPage implements OnInit{
  change: string = 'internal';  
  index: string = 'A';
  showModal: boolean = false;
  timeout: any;
  indexes: Array<string> = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split(''); 
  offsetTops: Array<number> = [];
  contacts: Array<any> = [];
  contactsData: Array<any> =[];
  contactsStorage: Array<any> = [];
  tempData:Array<any> = [];
  cityParam: Object = {};
  @ViewChildren('IonItemGroup') ionItemGroup;
  @ViewChild(Content) content: Content;	
  @ViewChild('mydiv') mydiv: ElementRef;

    constructor(public navCtrl: NavController,
                public contactsSev: Contacts,
                public navParams: NavParams,
                public ref: ChangeDetectorRef) {}

    ionViewDidEnter() {
        this.getOffsetTops();
    }

    ngOnInit(){
        this.initializeGnItems();
    }

    initializeItems(dataUrl){
      this.contactsSev.getContacts(dataUrl)
      .then(res => {
          this.contactsData =res;
          this.contacts = this.contactsSev.grouping(res);
          sessionStorage.setItem('gn-country', JSON.stringify(this.contacts));
      })
    }

    initializeGnItems(){
    	const dataUrl = '../assets/data/inlandData.json';
    	this.initializeItems(dataUrl)
    }

    initializeGjItems(){
      const dataUrl = '../assets/data/internationalData.json';
      this.initializeItems(dataUrl)
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
         for(let i=0; i<this.contactsData.length; i++){
           if(this.contactsData[i].match.indexOf(val) > -1){
             this.tempData.push(this.contactsData[i]);
           }
         }
         this.contacts = this.contactsSev.grouping(this.tempData);
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
        this.index = this.indexes[index];
        let offsetTop = this.offsetTops[index];
        this.content.scrollTo(0, offsetTop, 300);
        this.createModal();
    }

    onScroll() {
        const threshold = 42;
        if (this.content.scrollTop < threshold) {
            this.index = this.indexes[0];
            return;
        }
        for (let i = this.offsetTops.length; i > 0; i--) {
            if (this.content.scrollTop + threshold >= this.offsetTops[i]) {
                this.index = this.indexes[i];
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
