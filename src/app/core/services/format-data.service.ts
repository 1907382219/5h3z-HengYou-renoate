import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormatDateService {

    constructor() { }

    public format(date: string | Date, fmt: string) {
        const dateObj = date instanceof Date ? date : new Date(date);
        if (dateObj.toString() === 'Invalid Date') {
            return date.toString();
        }
        let ret;
        const opt = {
            "Y+": dateObj.getFullYear().toString(),        // 年
            "M+": (dateObj.getMonth() + 1).toString(),     // 月
            "D+": dateObj.getDate().toString(),            // 日
            "h+": dateObj.getHours().toString(),           // 时
            "m+": dateObj.getMinutes().toString(),         // 分
            "s+": dateObj.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
    }
    
}