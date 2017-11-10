import { Component,OnInit,Input } from '@angular/core';

@Component({
  selector: 'transcity',
  templateUrl: 'transcity.html'
})
export class TranscityComponent implements OnInit{
  istranCity: boolean = false;
  isstopCity: boolean = false;
  tranCity: string;
  stopoverCityName: string;
  stopOver:Array<any> = [];
  @Input()  data: any;
  @Input()  type: any;
  constructor() {
    
  }

  ngOnInit(){
  	//console.log(this.data.segments);

  	
  	

    if(this.data){
    	let rangeSegmentCount = this.data.rangeSegmentCount;
    	let flightTest:number;
  		let datas   = this.data.segments; 
  		for(let k=0; k<datas.length; k++){
			this.stopOver = datas[k].stopOver;
		    if(k< (datas.length-1)){
		      this.tranCity = datas[0].toCityCn;
		      this.istranCity     = true;
		    }
		}
		if(rangeSegmentCount.length > 3){ 
		  	if(this.type === 'from'){
		  		flightTest = rangeSegmentCount.split(',')[0].substr(-1);
		  	}else{
		  		flightTest = rangeSegmentCount.split(',')[1].substr(-1);
		  	}
		  }else{
		    flightTest = rangeSegmentCount.substr(-1);
		  } 

		  if(flightTest < 1){
		  	 if(this.stopOver && this.stopOver.length !=0 ){
		        let stopoverCity = '';
		        for (let stopItem of this.stopOver) {
		          stopoverCity += stopItem.stopAirport;
		        }
		        this.stopoverCityName = stopoverCity;
		        this.isstopCity = true;
		    }
		  }

		
  	}
  	

	  

   




  }

}
