import { Pipe, PipeTransform } from '@angular/core';   

@Pipe({   
  name: 'otherStatus' 
})  

export class OtherStatusPipe implements PipeTransform {    
  transform(val: string): string { 
	let str = '';
  	switch(val){
  		case 'WAIT_AUDIT':
        	str = '退票待审核';
        	break;
  		case 'WAIT_REFUND':
  		  	str = '退票中';
  		  	break;
  		case 'REFUND_SUCCESS':
  		  	str = '退票成功';
  		  	break;
      case 'REFUND_FAILURE':
          str = '退票失败';
          break;
      case 'REFUND_OVER':
          str = '已退票';
          break;
      case 'waiting_for_review':
          str = '改签待审核';
          break;
      case 'waiting_for_process':
          str = '改签待处理';
          break;
      case 'payed':
          str = '改签已支付';
          break;
      case 'gathering_success':
          str = '改签成功';
          break; 
      case 'review_fail':
          str = '改签审核不通过';
          break; 
      case 'returned':
          str = '改签退回'; 
          return;
      case 'cancel':
          str = '改签取消';
          return; 
  		default:
  			str = '未知';
  		  	break;
  	}
    return str;
  }
}  