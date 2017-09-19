import { Component,Input } from '@angular/core';
import { OrdinalPipe } from '../../pipe/ordinal.pipe';

@Component({
  selector: 'ex-counter',
  templateUrl:'./counter.component.html',
  providers:[OrdinalPipe,]
})

export class CountComponent{
  name: string;
  today: Date;
  numbers: Array<string>;
  cabins: string;
  constructor(private pipe: OrdinalPipe){
    this.name = 'null' || '';
    this.today = new Date() || new Date();
    let numbers=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    this.numbers = numbers.map(number => this.pipe.transform(number));
    this.cabins = 'Q'
  }

  @Input() count: number = 0;

  increment(){
    if(this.count > 0 && this.count <  10){
      this.count++
    }else{
      this.count = 9;
    }
    
  }
  decrement(){
    if(this.count < 0){
      this.count = 0;
    }else{
      this.count--;
    }
  }
}