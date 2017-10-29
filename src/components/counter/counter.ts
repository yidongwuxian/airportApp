import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'ex-counter',
  templateUrl:'./counter.html'
})

export class CountComponent{
  @Input()  count: number;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  flag:boolean = false;
  constructor(){
    if(this.count === 1){
      this.flag = true;
    }else{
      this.flag = false;
    }
  }

 
  increment(){
    console.log(this.flag);
    if(this.flag === true){
      if(this.count >0  && this.count <  9){
        this.count++;
      }
    }else{
      if(this.count > -1  && this.count <  9){
        this.count++;
      }
    }
    this.change.emit(this.count);
  }
  
  decrement(){
    this.count--;   
    if(this.count < 1){
      this.count = 0; 
    }  
    this.change.emit(this.count);
  }
}