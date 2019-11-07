import AUJpg from '@/assets/images/au.jpg'
import CAJpg from '@/assets/images/ca.jpg'
import DEJpg from '@/assets/images/de.jpg'
import ESJpg from '@/assets/images/es.jpg'
import FRJpg from '@/assets/images/fr.jpg'
import INJpg from '@/assets/images/IN.png'
import ITJpg from '@/assets/images/it.jpg'
import JPJpg from '@/assets/images/JP.png'
import MXJpg from '@/assets/images/MX.png'
import UKJpg from '@/assets/images/uk.jpg'
import USJpg from '@/assets/images/US.png'
import EUJpg from '@/assets/images/eu.jpg'

const zoneTime = [
  { key: "AU", time: 11, label: "澳大利亚" ,img: AUJpg },
  { key: "CA", time: -3, label: "加拿大" ,img: CAJpg },
  { key: "DE", time: 1, label: "德国" ,img: DEJpg },
  { key: "ES", time: 1, label: "西班牙" ,img: ESJpg },
  { key: "FR", time: 1, label: "法国" ,img: FRJpg },
  { key: "IN", time: 5, label: "印度" ,img: INJpg },
  { key: "IT", time: 1, label: "意大利" ,img: ITJpg },
  { key: "JP", time: 9, label: "日本" ,img: JPJpg },
  { key: "MX", time: -6, label: "墨西哥" ,img: MXJpg },
  { key: "UK", time: 0, label: "英国" ,img: UKJpg },
  { key: "US", time: -4, label: "美国" ,img: USJpg },
  { key: "EU", time: -4, label: "欧洲" ,img: EUJpg },
];
// 获取时间
export const handleGetZTimeObj = country => {
  const col = zoneTime.filter(item => {
    return country.toLowerCase() === item.key.toLowerCase();
  });
  let data = {
    label:col[0]["label"],
    img:col[0]["img"]
  }
  return data;
};
/**
 * 根据时区获取相应的时间
 * @author hutia
 * @param {Date} date 日期时间对象
 * @param {number} timezone 时区
 * @return {string} 返回时间字符串
 */
const getTimeString = (country, timezone,img) => {
  const dt = new Date();
  const tz = dt.getTimezoneOffset();
  dt.setTime(dt.getTime() + tz * 60000 + timezone * 3600000);
  const start = new Date(dt);
  const end = new Date(dt);
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
  end.setTime(end.getTime() - 3600 * 1000 * 24);
  return {
    country: country,
    time: [formatDate(start), formatDate(end)],
    img:img
  };
};
// 日期转换
const formatDate = date => {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  let h = date.getHours();
  h = h < 10 ? "0" + h : h;
  let min = date.getMinutes();
  min = min < 10 ? "0" + min : min;
  let s = date.getSeconds();
  s = s < 10 ? "0" + s : s;
  return y + "-" + m + "-" + d + " " + h + ":" + min + ":" + s;
};

// 获取时间
export const handleGetZTime = country => {
  const col = zoneTime.filter(item => {
    return country === item.key;
  });
  return getTimeString(col[0]["label"],  col[0]["time"],col[0]["img"]);
};
