import { Component, ViewChild } from '@angular/core';
import { IonicPage,Tabs } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { AddpassengerPage } from '../addpassenger/addpassenger';
import { SearchPage } from '../search/search';
import { UserCenterPage } from '../usercenter/usercenter';
@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs: Tabs;
  tab1Root = SearchPage;
  tab2Root = AboutPage;
  tab3Root = AddpassengerPage;
  tab4Root = UserCenterPage;

  constructor() {

  }
}
