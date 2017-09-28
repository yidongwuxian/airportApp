import { Pipe, PipeTransform } from '@angular/core';   

@Pipe({   
  name: 'week' 
})  

export class WeekPipe implements PipeTransform {    
  transform(val: string): string { 
  	let weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
	let myDate = new Date(Date.parse(val)); 
	return weekDay[myDate.getDay()];
  }
}  