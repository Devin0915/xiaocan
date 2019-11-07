import axios from "axios";
import { getToken } from "../utils/auth";
import router from "@/router";
import store from "@/store";
import Vue from 'vue'
import {Message} from 'iview'
import { delSessionStorage } from "@/utils";


// 创建axios实例
const service = axios.create({
  withCredentials: true,
  baseURL: process.env.publicPath, // api 的 base_url
  // timeout: 10000 // 请求超时时间
});
service.interceptors.request.use(config => {
    config.headers["Accept"] = "application/json,text/javascript, */*; q=0.01";
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    let {login=true} = config
    if(login){
      var token = getToken()
      if(token){
        config.headers["X-CSRF-TOKEN"] = token;
        return config
      }
      //跳转到登陆页面
      var path = router.path
      router.push({name:'login',query:{redirect:path}})
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
const pending  = []
// respone拦截器
service.interceptors.response.use(response => {
    let {code,msg} = response.data
    if(code != 1){
      if(code === 19119){
        // Message.error({
        //   content:'token校验失败，请需重新登录!',
        //   duration:2
        // })
        // delSessionStorage('userInfo');
        // delSessionStorage('tagsList');
        // delSessionStorage('user');
        // delSessionStorage("droplistCommonInfo");
        // store.dispatch("SaveLogout");
      }else{
        if(code === 19110) msg = "后端url接口未授权，无法获取数据!";
        if(code === 10400) msg = "传参错误!";
        if(code === 10500) msg = msg;
        if(pending.length <= 0){
          Message.error({
            content:msg,
            duration:10
          })
          pending.push("msg")
        }
       
        return  Promise.reject(new Error(msg))
      }
    }
    return response.data;
  },error => {
    if (error.response) {
      const res = error.response.data;
      if (error.response.status && error.response.status !== 200) {
        switch (error.response.status) {
          case 401: // 用户未登录
            store.dispatch("SaveLogout");
            break;
          case 404:
            this.$Message.error("接口异常");
            break;
          default:
            this.$Message.error("系统异常");
            break;
        }
        return Promise.reject(res);
      }
    } else {
      return Promise.reject(error);
    }
  });



export default service;
