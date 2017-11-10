import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
@Injectable()  

export class UtilsService{
    constructor(private toastCtrl: ToastController){}

    zerofill(n){
        if(n < 10){
         return  n = '0' + n;
        }else{
         return n;
        }
    }

    datediff(startTime,endTime,diffType) {  
        const _startTime = startTime.replace(/\-/g, "/");
        const _endTime   = endTime.replace(/\-/g, "/");
        const _diffType = diffType.toLowerCase();
        let sTime = new Date(_startTime);     
        let eTime = new Date(_endTime); 
        let divNum = 1;
        switch (_diffType) {
            case "second":
                divNum = 1000;
                break;
            case "minute":
                divNum = 1000 * 60;
                break;
            case "hour":
                divNum = 1000 * 3600;
                break;
            case "day":
                divNum = 1000 * 3600 * 24;
                break;
            default:
                break;
        }
        return (eTime.getTime() - sTime.getTime()) / divNum;       
    }

    addDate(days,type){
        let d = new Date();
            d.setDate(d.getDate() + days);
            let month: any = d.getMonth() + 1;
            let day: any = d.getDate();
            let val: string;
            if(type === 'str'){
                val = d.getFullYear() + "年" + this.zerofill(month) + "月" + this.zerofill(day) +"日";
            }
            else if(type === 'months'){
                val = this.zerofill(month) + "月" + this.zerofill(day) +"日";
            }
            else{
                val = d.getFullYear() + "-" + this.zerofill(month) + "-" + this.zerofill(day);
            }
            return val;
    }

    getWeek(d,isWeek){
        //let date = d.replace(/-/g, '/');   
        let day = new Date(d).getDay();   
        let fullWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        let tinyWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        let week: string;
        switch(isWeek){
            case 1:
              week = tinyWeek[day];
              break;
            default:
              week = fullWeek[day];
              break;
        }

        return week;
    }

    getNow(){
        let d = new Date();
        let month: any = d.getMonth() + 1;
        let day:   any = d.getDate();
        const val = d.getFullYear() + '-' + this.zerofill(month) + '-' + this.zerofill(day);
        return val; 
    }

    addDateStr(date,days,isYear){
        let d = new Date(date);
        let val: string;
        if(days < 0){
            if(d > new Date()){
                d.setDate(d.getDate() + days);
            }
        }else{
            d.setDate(d.getDate() + days);
        }

        let month: any = d.getMonth() + 1;
        let day:   any = d.getDate();
        if(month < 10){
            month = '0' + month;
        }
        if(day < 10){
            day = '0' + day;
        }

        switch(isYear){
            case 1:
              val = d.getFullYear() + '年' + month + '月' + day + '日';
              break;
            case 2:
              val = month + '月' + day + '日';
              break;
            default:
              val = d.getFullYear() + '-' + month + '-' + day;
              break;
        }
       
        return val; 
    }

    getCurrentDate(date,isYear) {
        let today = new Date(date);
        const d = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        let mon:any = today.getMonth() + 1;
        let day:any = today.getDate();
        let val: string;

        if(isYear == true){
           val = today.getFullYear() + "年" + this.zerofill(mon) + "月" + this.zerofill(day) + "日　" + d[today.getDay()];
        }else{
           val = this.zerofill(mon) + "月" + this.zerofill(day) + "日　" + d[today.getDay()]; 
        }
        return val;
    }

    filterPrice(prices){
        let len = prices.length;
        if(len < 2){return prices}
        let pricess = [];
        if(len == 2){
            const p1 = prices[0];
            const p2 = prices[1];
            const supplierId1 = p1.supplierId;
            const supplierId2 = p2.supplierId;
            const price1 = p1.adultFacePrice;
            const price2 = p2.adultFacePrice;
            if(price1 == price2){//
                if(supplierId1 == supplierId2){
                    pricess.push(p1);
                }else{
                    if(supplierId1=="TDXD"){
                        pricess.push(p1)
                    }
                    if(supplierId2=="TDXD"){
                        pricess.push(p2)
                    }
                }
                return pricess;
            }else{
                return prices;
            }
        }else if(len>2){
            let isjh = false;
            const p1 = prices[0];
            const p2 = prices[1];
            const supplierId1 = p1.supplierId;
            const supplierId2 = p2.supplierId;
            const price1 = p1.adultFacePrice;
            const price2 = p2.adultFacePrice;
            if(price1 == price2){//
                if(supplierId1 == supplierId2){
                    pricess.push(p1);
                }else{
                    if(supplierId1=="TDXD"){
                        pricess.push(p1)
                    }
                    if(supplierId2=="TDXD"){
                        pricess.push(p2)
                    }
                }
            }else{
                if(price1 > price2){
                    pricess.push(p2);
                    if(supplierId2=="JHAD"){
                        isjh= true;
                    }
                }else{
                    pricess.push(p1);
                    if(supplierId1=="JHAD"){
                        isjh= true;
                    }
                }
            }

            if(isjh){
                for(let i=0; i< prices.length; i++){
                    let supplierId = prices[i].supplierId;
                    let price = prices[i].adultFacePrice;
                    if(supplierId=="TDXD"){
                        pricess.push(prices[i]);
                        return false;
                    }
                }
            }
            const p3 = prices[len-2];
            const p4 = prices[len-1];
            const supplierId3 = p3.supplierId;
            const supplierId4 = p4.supplierId;
            const price3 = p3.adultFacePrice;
            const price4 = p4.adultFacePrice;
            if(price3 == price4){
                if(supplierId3 == supplierId4){
                    pricess.push(p3);
                }else{
                    if(supplierId3=="TDXD"){
                        pricess.push(p3)
                    }
                    if(supplierId4=="TDXD"){
                        pricess.push(p4)
                    }
                }
            }else{
                if(price3 > price4){
                    pricess.push(p3);
                }else{
                    pricess.push(p4);
                }
            }
            return pricess;
        }
    }

    presentToast(obj,str){
        obj = this.toastCtrl.create({
            message: str,
            duration:1000,
            position:'middle'
        });
        obj.present();
        setTimeout(() => {
          obj.dismiss();
        }, 1000);
    }

    //数组去重
    unique(arr,key){
        let tempArr = arr;
        for(let i = 0;i < tempArr.length;i++){
            for(let j = i+1;j< tempArr.length;j++){
                if(tempArr[i][key] == tempArr[j][key]){
                    arr.splice(j,1);
                 }
            }
        }
        return arr;    
    }
    
    //将一个item合并到数组的头部
    preArrays(arr,item){
        return [item].concat(arr);
    }
}

	
 