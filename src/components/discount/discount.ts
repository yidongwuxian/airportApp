import { Component,OnInit } from '@angular/core';
@Component({
  selector: 'discount',
  templateUrl: 'discount.html'
})
export class DisCountComponent implements OnInit{
  flightData: any;
  isMinus: boolean = false;
  minusType: string = '';
  minusAmount: number;
  constructor() {
    console.log('Hello DisCountComponent Component');
  }

  ngOnInit(){
      
      this.flightData = JSON.parse(sessionStorage.getItem("flightData"));
      for(let k of this.flightData.data){
        if(k.activity.actContent){
          if(k.activity.actContent == 0){
            this.minusType = '票面立减';
          } 
          if(k.activity.actContent == 1){
            this.minusType = '保险立减';
          } 
          this.minusAmount = k.activity.actMoney;
          if(k.activity.actMoney){
            this.isMinus = true;
          }
        }
      }

    
  }

  

}
