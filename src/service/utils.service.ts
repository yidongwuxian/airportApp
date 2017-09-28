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

    addDate(days){
        let d = new Date();
            d.setDate(d.getDate() + days);
            let month: any = d.getMonth() + 1;
            let day: any = d.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            let val = d.getFullYear() + "年" + month + "月" + day +"日";
            return val;
    }
}

	
 