import { Pipe, PipeTransform } from '@angular/core';   

@Pipe({   
  name: 'minues' 
})  

export class MinuesPipe implements PipeTransform {    
  transform(val: number): string { 
	  let str = '';
    let totalNumber = (val/60).toFixed(2);
  	if((val/60) >= 1){
      let seFirst = String(totalNumber).split('.')[0]
      let seLast =  String(totalNumber).split('.')[1]
      str = seFirst + 'h' + seLast + 'm';
    }else{
      str = val + 'm';
    }
    return str;
  }
}  