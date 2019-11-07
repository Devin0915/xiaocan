import axios from "./config";
import { getToken } from "@/utils/auth";
import config from '@/config/config'
const rootApi = config.serverPath.server;
export const login = (username, password) => {
  /**
   * 不需要登陆的接口需要在此配置login:false 不然接口会被拦截
   */
  return axios({
    method: 'post',
    url: rootApi + '/api/auth/login/login',
    data:{ 
      name: username,
      password: password
    },
    login:false
  })
};

export const logout = () => {
  return axios.post(rootApi + "/api/auth/login/logout",{token:getToken()});
};
// 当前店铺，国家时间等基本信息
export const getCurrentStore = (params) => {
  var token = getToken()
  if(typeof token !== 'undefined' && token !==null && token !== ''){
    return axios.post(rootApi + "/api/auth/pub/getCurrentStore",{token:getToken()});
  }
  return new Promise((resolve, reject) => {
    resolve({})
  })
};
// 获取菜单
export const getMemu = () => {
  return axios.post( rootApi + "/api/auth/pub/getMemu",{token:getToken()});
};
// 面板
export const changeStore = (storeId) => {
  return axios.post(rootApi + "/api/auth/pub/changeStore",{token:getToken(),storeId:storeId});
};
// 获取店铺
export const getSearchStores = () => {
  return axios.post( rootApi + "/api/auth/pub/getSearchStores",{token:getToken()});
};
// 获取下拉数据
export const getDroplistCommon = () => {
  return axios.post(rootApi + "/api/auth/pub/getDroplistCommon",{token:getToken()});
};
// 免登陆 
export const avoidLanding = (token) => {
  return axios.post(rootApi +"/api/auth/login/avoidLanding",{token:token});
};
// 获取国家时间
export const getCountiesTime = (token) => {
  return axios.post(rootApi + "/api/auth/pub/getCountiesTime",{token:getToken()});
};