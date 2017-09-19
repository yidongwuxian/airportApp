import { Pipe, PipeTransform } from '@angular/core';   
@Pipe({   
  name: 'sexReform',
  pure:false  
})  

export class SexReformPipe implements PipeTransform {    
  transform(value: number): string { 
  	let sex = '';
  	switch(value){
  		case 1:
        sex = '男';
        break;
  		case 2:
  		  sex = '女';
  		  break;
  		default:
  		  sex = '男';
  		  break;
  	}
    return sex;
  }
}  