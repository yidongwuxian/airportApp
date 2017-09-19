import { Pipe, PipeTransform } from '@angular/core';   

@Pipe({   
  name: 'cabin' 
})  

export class CabinPipe implements PipeTransform {    
  transform(val: string): string { 
	let str = '';
  	switch(val){
  		case 'Y':
        	str = '经济舱';
        	break;
  		case 'F':
  		  	str = '头等舱';
  		  	break;
  		case 'C':
  		  	str = '商务舱';
  		  	break;
  		default:
  			str = val
  		  	break;
  	}
    return str;
  }
}  