/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]));
};

/**
 * @description sessionStorage
 */
export const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
export const delSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};

/**
 * @returns {Array}
 */
export const getSessionStorage = key => {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : [];
};

export const jsonToQueryString = data => {
  var str = "?";
  var strArr = [];
  for(var k in data) {
      var item = data[k];
      if(item instanceof Array) {
          item.forEach(function(val){
              strArr.push(k + "[]=" + val);
          });
      } else {
          strArr.push(k + "=" + item);
      }
  }
  str += strArr.join("&");
  return str;
};

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
/**
 * @description 标准时间转换
 * @param {标准时间转换}
 * @returns {YYYY-MM-DD}
 */
export const changeStandardTime = date => {
  const reg = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/g;
  if (reg.test(date)) return date;
  if (!date && !Date.parse(date)) {
    return;
  }
  const d = new Date(date);
  const year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  if (month && month < 10) {
    month = "0" + month;
  }
  if (day && day < 10) {
    day = "0" + day;
  }
  return `${year}-${month}-${day}`;
};

/**
 * @description 判断对象是否为空
 * @param
 * @returns {Boolean}
 */
export const isEmptyObject = obj => {
  if (typeof obj !== "object" || obj instanceof Array) {
    return;
  }
  const $obj = Object.keys(obj);
  return $obj.length === 0 ? true : false;
};

/**
 * 根据国家码获取亚马逊网址
 * @param  [type] $country [description]
 * @param  string $path    [description]
 * @return [type]          [description]
 */
const getAmzUrlByCountry = (country, path) => {
  country = country.toUpperCase();
  var urla = "https://";
  switch (country) {
    case "US":
      urla += "www.amazon.com";
      break;
    case "UK":
      urla += "www.amazon.co.uk";
      break;
    case "DE":
      urla += "www.amazon.de";
      break;
    case "JP":
      urla += "www.amazon.co.jp";
      break;
    case "FR":
      urla += "www.amazon.fr";
      break;
    case "CA":
      urla += "www.amazon.ca";
      break;
    case "ES":
      urla += "www.amazon.es";
      break;
    case "IT":
      urla += "www.amazon.it";
      break;
    case "IN":
      urla += "www.amazon.in";
      break;
    case "MX":
      urla += "www.amazon.com.mx";
      break;
    case "AU":
      urla += "www.amazon.com.au";
      break;
    default:
      urla += "www.amazon.com";
      break;
  }
  urla += encodeURI(path);
  return urla;
};

export const listingUrl = (asin, country) => {
  return getAmzUrlByCountry(country, "/dp/" + asin);
};
//amz页面跳转
export const serpUrl = (country, keyword) => {
  const path =
    "/s/ref=nb_sb_noss_2?url=search-alias=aps&field-keywords=" + keyword;
  return getAmzUrlByCountry(country, path);
};

//对象挑选
export const pick = (obj, keys) => {
  return keys
    .map(k => (k in obj ? { [k]: obj[k] } : {}))
    .reduce((res, o) => Object.assign(res, o), {});
};
//按一定规则排序
export const sortByOrder = (val, keys) => {
  val.sort((a, b) => {
    // keys是规则  val是需要排序的数组
    return keys.indexOf(a) - keys.indexOf(b);
  });
};

//获取路由参数
export const queryURLParam = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}
// 准换时间
export const transitionTime = (time) => {
  var newTime = ''
  if(Array.isArray(time) && time.length > 0) {
    if(isNaN(time[0])&&!isNaN(Date.parse(time[0])) && isNaN(time[1])&&!isNaN(Date.parse(time[1]))) {
      newTime = time[0].substring(10,0) + ' - ' + time[1].substring(10,0)
    }else{
      let start = formatDate(time[0])
      let end = formatDate(time[1])
      newTime = start + ' - ' + end
    }
  }
  return newTime
}
export const dateFormat = (date) => {
  var d = new Date(date);
  var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  return datetime
}
// 准换时间
export const transitionTimeArr = () => {
  const end = new Date()
  end.setTime(end.getTime() - 3600 * 1000 * 24)
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
  return [start, end]
}
// 准换时间
export const timeArr = (time) => {
  var newTime = ''
  if(Array.isArray(time) && time.length > 0) {
    if(isNaN(time[0])&&!isNaN(Date.parse(time[0])) && isNaN(time[1])&&!isNaN(Date.parse(time[1]))) {
      newTime = [time[0].substring(10,0),time[1].substring(10,0)];
    }else{
      let start = formatDate(time[0])
      let end = formatDate(time[1])
      newTime = [start,end]
    }
  }
  return newTime
}
// 日期转换
export const formatDate = (date) => {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
} 
// 非空判断
export const isEmpty =(obj) => {
  return typeof obj === "undefined" || obj === null || obj === "";
}
export const GetUrlParam  =(paraName) => {
  var url = document.location.toString();
  var arrObj = url.split("?");

  if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;

      for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");

          if (arr != null && arr[0] == paraName) {
              return arr[1];
          }
      }
      return "";
  }
  else {
      return "";
  }
}