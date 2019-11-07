import axios from "./config";
import config from '@/config/config'
const rootApi = config.serverPath.server;
import Cookies from "js-cookie";
import { getToken } from "@/utils/auth";

// 销售业绩
export const sales = params => {
  params.token = getToken();
  return axios.post(rootApi +"/api/dashBoard/storeView/sales", params);
};
// 消息中心
export const msgCenter = params => {
  params.token = getToken();
  return axios.post(rootApi +"/api/dashBoard/storeView/msgCenter", params);
};
// 获取广告助手时间区间
export const getStartPeriods = params => {
  params.token = getToken();
  return axios.post(rootApi +"/api/dashBoard/storeView/getStartPeriods", params);
};
// 广告助手
export const sponsoredAdData = params => {
  params.token = getToken();
  return axios.post(rootApi +"/api/dashBoard/storeView/sponsoredAdData", params);
};
// 三级类目销售额
export const threeCategorySales = params => {
  params.token = getToken();
  return axios.post(rootApi +"/api/dashBoard/storeView/threeCategorySales", params);
};
// 当天销售额和件数
export const storeViewIndex = params => {
  params.token = getToken();
  return axios.post(rootApi +"/api/dashBoard/storeView/index", params);
};

