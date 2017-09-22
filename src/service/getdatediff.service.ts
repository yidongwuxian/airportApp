import { Injectable } from '@angular/core';
@Injectable()  

export class GetDateDiffService{
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
}

	
 