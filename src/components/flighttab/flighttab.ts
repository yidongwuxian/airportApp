import { Component,Input, Output, EventEmitter } from '@angular/core';
import { UtilsService } from '../../service/utils.service';
@Component({
  selector: 'flightTab',
  templateUrl:'./flighttab.html',
  providers:[UtilsService]
})

export class FlightTabComponent{
  @Input()  date: string;
  @Input()  week: string;
  @Output() switchFlight: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _UtilsService: UtilsService){
  }

  prevDate(){
  	if(this.date > this._UtilsService.getNow() ){
  		let deptPrevDate = this._UtilsService.addDateStr(this.date, -1,2);
      let deptPrevDateStr = this._UtilsService.addDateStr(this.date, -1,'');
  		this.date = deptPrevDate;
  		this.switchFlight.emit(deptPrevDateStr);
  	}	
  }

  nextDate(){
  		let deptNextDate = this._UtilsService.addDateStr(this.date, 1,2);
      let deptNextDateStr = this._UtilsService.addDateStr(this.date, 1,'');
  		this.date = deptNextDate;
  		this.switchFlight.emit(deptNextDateStr);
  }

}