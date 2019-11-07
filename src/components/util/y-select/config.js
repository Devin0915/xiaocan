import { getSessionStorage } from "@/utils";
/**
 * 转换方法
 * 该
 */
function transform(obj,format={label:'label',value:'value'}){
    let result = [];
    if(Array.isArray(obj)){
        var arr = Array.from(new Set(obj))
        for(let i in arr){
            let item = arr[i]
            if(typeof item !== 'undefined'&& item !== null && item !== ''){
                if(typeof item !== 'object'){
                    result.push({label:item,value:item})
                    continue;
                }
                Object.keys(format).forEach(key=>{
                    item[key] = item[format[key]] 
                })
                result.push(item)
            }
        }
    }
    return result;
}
import {
  getAccountList,
  getCountryList,
  getBusinessInfo,
  getTeamList,
  getThreeCategoryList
} from "@/axios/user";
const config = {
    // 事业部
    business:function(){
        return new Promise((resolve,reject) => {
            let obj = getSessionStorage("droplistCommonInfo").businessIds;
            let arr = []
            for (let i in obj) {
                arr.push(obj[i]); //属性
            }
            resolve(transform(arr))
        })
    },
    // 账号
    account:function(){
        return new Promise((resolve,reject) => {
            let obj = getSessionStorage("droplistCommonInfo").accounts;
            let arr = []
            for (let i in obj) {
                arr.push(obj[i]); //属性
            }
            resolve(transform(arr))
        })
    },
    // 国家
    country:function(){
        return new Promise((resolve,reject) => {
            let obj = getSessionStorage("droplistCommonInfo").countries;
            let arr = []
            for (let i in obj) {
                arr.push(obj[i]); //属性
            }
            resolve(transform(arr))
        })
    },
    // 三级类目
    threeCategory:function(){
        return new Promise((resolve,reject) => {
            let obj = getSessionStorage("droplistCommonInfo").threeCategory;
            let arr = []
            for (let i in obj) {
                arr.push(obj[i]); //属性
            }
            resolve(transform(arr))
        })
    },
}

export default config;