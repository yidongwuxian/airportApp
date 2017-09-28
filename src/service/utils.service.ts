import { Injectable } from '@angular/core';
@Injectable()  

export class UtilsService{
    constructor(){}
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
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            if(type === 'str'){
                val = d.getFullYear() + "年" + month + "月" + day +"日";
            }
            else if(type === 'months'){
                val = month + "月" + day +"日";
            }
            else{
                val = d.getFullYear() + "-" + month + "-" + day;
            }
            return val;
    }

    getWeek(d){
        let date = d.replace(/-/g, '/');   
        let day = new Date(date).getDay();   
        const today = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        const week = today[day];
        return week;
    };
}

	
 