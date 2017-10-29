import { Component,Input } from '@angular/core';

@Component({
  selector: 'msgicon',
  templateUrl:'./msgicon.html'
})

export class MsgIconComponent{
  @Input()  msg: any;
  constructor(){
  	
  }
}