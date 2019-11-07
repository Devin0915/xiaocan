import {getMemu} from "@/axios/user";

import store from '@/store/index.js'

/**
 * 请求数据
 */
function requestMenuData(){
    return new Promise((resolve,reject)=>{        
        getMemu().then(res=>{
            let {code,data} = res
            let menu = [];
            handleData(data.menu,menu);
            store.dispatch("GenerateRoutes", menu)
            resolve(menu)
        })
    })
}

function handleData(obj,arr){
    if(Array.isArray(obj)&&obj.length>0){
        obj.forEach(item=>{
            let {children} = item
            arr.push({title:item.name,url:item.htmlId})
            handleData(children,arr)
        })
    }
    return false
}

/**
 * 设置JSON数据
 * @param {*} key 
 * @param {*} value 
 */
function setJsonItem(value){
 try {
    let str = JSON.stringify(value)
    setItem('_yt_category_code',str)
    return value
 } catch (error) {
     
 }
 return false
}
/**
 * 获取JSON数据
 * @param {*} key 
 */
export function getJsonItem(){
    return new Promise((resolve,reject)=>{
        try {
            let str = getItem('_yt_category_code')
            var data =  JSON.parse(str)
            if(data && data.country){
                resolve(data)
                return true
            }
            requestMenuData().then(({category={}})=>{
                resolve(category)
            })
        } catch (e) {
            console.error(e)
        }
        return null
    })
    
}
/**
 * 存放数据到localStore中
 * @param {*} key 
 * @param {*} value 
 */
export function setItem(key,value){
    try{
        localStorage.setItem(key,value)
        return true
    }catch(e){
        console.error(e)
    }
    return false
}
/**
 * 存放菜单数据到localStore中
 * @param {*} obj 
 */
export function setMenu(obj){
    return new Promise((resolve,reject)=>{
        try {
            requestMenuData().then(res=>{
                //如果考虑数据安全 可以在此加密
                // var str = JSON.stringify(res)
                // setItem('_yt_menu_data_cache',str)
                resolve(res)
            })
            return true
        } catch (e) {
            console.error(e)
        }
        resolve([])
        return false
    }) 
} 
/**
 * 获取localStorage中的数据
 * @param {*} key 
 */
export function getItem(key){
    try {
        return localStorage.getItem(key)
    } catch (e) {
        console.error(e)
    }
    return null
}
/**
 * 获取菜单数据
 */
export function getMenu(){  
    return new Promise((resolve,reject)=>{
        try {
            let str = getItem('_yt_menu_data_cache');
            if(typeof str !== 'undefined'&&str!==null && str!==''){
                var data =  JSON.parse(str)
                resolve(data)  
                return  false
            }
            requestMenuData().then(res=>{
                var str = JSON.stringify(res)
                setItem('_yt_menu_data_cache',str)
                resolve(res) 
            })
            return false
        } catch (e) {
            console.error(e)
        }
        
})
        
       
}

export  function removeItem(key){
    try {
        localStorage.removeItem(key)
        return true
    }catch(e){
        console.error(e)
    }
    return false
}

export function removeMenu(){
    return removeItem('_yt_menu_data_cache')
}
