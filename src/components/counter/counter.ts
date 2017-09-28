import { Component,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ex-counter',
  templateUrl:'./counter.html'
})

export class CountComponent{
  constructor(){
  }

  @Input()  count: number;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  increment(){
    if(this.count > -1 && this.count <  9){
      this.count++;
      this.change.emit(this.count);
    }
  }
  decrement(){
    this.count--;
    if(this.count < 1){
      this.count = 0; 
    }  
    this.change.emit(this.count);
  }
}