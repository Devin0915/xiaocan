import axios from "./config";
import qs from 'qs';
import { getToken } from "@/utils/auth";

//仓库列表
export const getWarehouseListSelf = params => {
  params.token = getToken();
  return axios.post("/api//priceCal/selfProduct/getWarehouseList", params);
};
//获取表头字段列表
export const getTableHeaderSelf = params => {
  params.token = getToken();
  return axios.post("/api/priceCal/selfProduct/getTableHeader", params);
};
//获取列表数据
export const getSkuPriceCalListSelf = params => {
  params.token = getToken();
  return axios.post("/api/priceCal/selfProduct/getSkuPriceCalList", params);
};