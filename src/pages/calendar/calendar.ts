import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarComponentOptions, CalendarController, DayConfig } from 'ion2-calendar'
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage{
  date: string;
  constructor(public navCtrl: NavController,
              public calendarCtrl: CalendarController,) {

  }
  
  onChange($event) {
    console.log('event:'+$event);
  } 

  basic(){
    this.calendarCtrl.openCalendar({
      title: 'BASIC',
      canBackwardsSelected: true,
      color: 'cal-color',
      doneIcon: true,
      closeIcon: true
    })
    .then((res: any) => {
      console.log(res)
    })
    .catch(() => {
    }); 
  }

}
