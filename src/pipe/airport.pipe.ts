import { Pipe, PipeTransform } from '@angular/core';   

@Pipe({   
  name: 'airport' 
})  

export class AirportPipe implements PipeTransform {    
  transform(val: string, airport:any, input: string): string { 
  	 for(let val of airport){
		if(input==val.airportCode){
			return val.airportCn;
		}
	}
  }
}  