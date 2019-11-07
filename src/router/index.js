import router from "./config";
import store from "../store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // getToken from cookie
import {  setMenu, removeMenu } from '@/utils/store.js'
import { delSessionStorage,getSessionStorage,setSessionStorage,GetUrlParam } from "@/utils";
import { getDroplistCommon,avoidLanding} from "@/axios/user";
import Cookies from "js-cookie";
NProgress.configure({ showSpinner: true }); 
const whiteList = ["login", "error401", "error404"]; // no redirect whitelist
const loginWhiteList = ['login','singleSignOn'] //不拦截的name 之所以这样配置 以后可能会写注册页面
const indexName = 'shopview'//首页name
router.beforeEach((to, from, next) => {
  NProgress.start();
  let token = getToken();
  let name = to.name;
  if(name == 'singleSignOn'){
    let tokenStr = GetUrlParam('token')    
      avoidLanding(tokenStr).then(res => {
        let {code,data} = res;
        if(code === 1){
          let {pscUsername,pscUserId} = data;
          let user = {username:pscUsername,userid:pscUserId}
          setSessionStorage("user",user);
          Cookies.set('Admin-Token', tokenStr);  
          store.dispatch("GetInfo").then(() => {}); 
          getDroplistCommon().then(res => {
            let {data} = res;
            setSessionStorage("droplistCommonInfo", data.droplistCommon);
          })
          setMenu().then(res => {});

          //跳转到首页
          next({ name: indexName });
        }else{
          next({ name: 'login' })
        }
      })
  }
  //已经登陆
  if (token) {
    //name可能没设置 建议使用name跳转
    if (typeof name !== 'undefeated' && loginWhiteList.indexOf(name) !== -1) {
      NProgress.done();
      //跳转到首页
      next({ name: indexName });
      return false
    }
    if(typeof getSessionStorage('userInfo') === 'undefined' || getSessionStorage('userInfo') === '' || getSessionStorage('userInfo').length <= 0){
      store.dispatch("GetInfo").then(() => {});
    }
    getDroplistCommon().then(res => {
      let {data} = res;
      setSessionStorage("droplistCommonInfo", data.droplistCommon);
    })
    setMenu().then(res => {});
    next(); 
    return false
  }
  let path = to.path
  if (path === '/') {
    // removeMenu();
    // delSessionStorage('userInfo');
    // delSessionStorage('tagsList');
    // delSessionStorage('droplistCommonInfo');
    // delSessionStorage('user');
    // Cookies.remove('Admin-Token');
    next({ name: 'login' })
    NProgress.done();
    return false
  }
  //未登陆
  if (whiteList.indexOf(name) !== -1 || loginWhiteList !== -1) {
    // 在免登录白名单，直接进入
    setTimeout(() => {
      next();
      NProgress.done();
    }, 500);
    return false
  }
  next({ name: 'login', query: { redirect: to.path } })
  NProgress.done();
  removeMenu();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;