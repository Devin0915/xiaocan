import { login, getCurrentStore,logout } from "@/axios/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { setSessionStorage } from "@/utils";
const user = {
  state: {
    token: getToken(),
    user_name: "",
    user_department: "",
    user_accountCountry: "",
    user_country: "",
    user_account: "",
    store_id: "",
    locaTime: "",
  },

  mutations: {
    SET_MENU_DATA:(state,data)=>{
      state.menu_data = data
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERINF:(state,params)=>{
      Object.assign(state,params);
      setSessionStorage("userInfo", state);
    },
    LOGOUT:(state)=>{
      removeToken();
      state = {roles:[]}  
    }
  },

  actions: {
    SaveLogout({ commit }){
      commit("LOGOUT");
    },
    // 登录
    Login({ commit }, userInfo) {
      
      const username = userInfo.username;
      const password = userInfo.password;
      const rememberMe = userInfo.rememberMe;
      return new Promise((resolve, reject) => {
        login(username, password).then(res => {
          let { code, msg, data } = res;
          if (code === 1) {
            setToken(data.token, rememberMe);
            commit("SET_TOKEN", data.token);
            let params = {username:data.userName,userid:data.userId}
            setSessionStorage("user",params );           
          } else {
            this.$Message.error(msg);
          }
          resolve();
        })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 面板切换值
    SaveInfo({ commit }, params){
      let accountCountry = params.account+'-'+params.country;
      let paramsObj = {
        user_department: params.departmentId,
        user_accountCountry:accountCountry,
        user_country: params.country,
        user_account: params.account,
        store_id: params.storeId,
        locaTime:params.locaTime,
      }
      commit("SET_USERINF", paramsObj);
    },
    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getCurrentStore().then(res=>{
          let {code,data,msg} = res;
          if(code === 1){
            let {locaTime,country,account,storeId,departmentId,departmentName} = data.currentStore;
            let accountCountry = account+'-'+country;
            let paramsObj = {
              user_department: departmentId,
              user_accountCountry:accountCountry,
              user_country: country,
              user_account: account,
              store_id: storeId,
              locaTime:locaTime,
            }
            commit("SET_USERINF", paramsObj);
            setSessionStorage("userInfo", paramsObj);
          }
          resolve(res) 
        }).catch(error => {
          reject(error);
        });
        
      });
    },
    // 登出
    LogOut({ commit }) {
      return new Promise(resolve => {
        logout().then(res=>{
          commit("LOGOUT");
          resolve();
        })
        
      });
    }
  }
};

export default user;
