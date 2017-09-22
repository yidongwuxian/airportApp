import { Component,Input } from '@angular/core';
import { OrdinalPipe } from '../../pipe/ordinal.pipe';

@Component({
  selector: 'ex-counter',
  templateUrl:'./counter.component.html',
  providers:[OrdinalPipe,]
})

export class CountComponent{
  constructor(private pipe: OrdinalPipe){
  }

  @Input() count: number = 0;

  increment(){
    if(this.count > -1 && this.count <  9){
      this.count++
    }
  }
  decrement(){
    this.count--;
    if(this.count < 1){
      this.count = 0; 
    }  
    
  }
}