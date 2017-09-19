import { Pipe, PipeTransform } from '@angular/core';   

@Pipe({   
  name: 'orderStatus' 
})  

export class OrderStatusPipe implements PipeTransform {    
  transform(val: string): string { 
	let str = '';
  	switch(val){
  		case '0':
        	str = '待支付';
        	break;
  		case '1':
  		  	str = '已支付';
  		  	break;
  		case '2':
  		  	str = '待出票';
  		  	break;
      case '4':
          str = '出票完成';
          break;
      case '5':
          str = '已取消';
          break;
      case '6':
          str = '待确认人数';
          break;
      case '9':
          str = '已退款';
          break;
      case '-1':
          str = '押金未支付';
          break;   
  		default:
        str = '未知';
          break;
  	}
    return str;
  }
}  