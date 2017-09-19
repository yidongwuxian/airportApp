import { Pipe, PipeTransform } from '@angular/core';   

@Pipe({   
  name: 'toNull' 
})  

export class ToNullPipe implements PipeTransform {    
  transform(val: string): string { 
  	if(val == null || val == undefined || val == "" || val == "null"){
      return val = "";
    }else{
      return val;
    }
  }
}  