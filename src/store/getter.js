import { getToken} from "@/utils/auth";
export default {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,


  token: state => state.userInfo.token,
  user_info: state => state.userInfo,

  
  permission_info: state => state.permission,

  getToken:(state)=>()=>{
    return getToken()
  },
  menuList:(state)=>{
    return state.permission.routers
  },
  getCacheData: (state) => (code) => {
    if(state.select.hasOwnProperty('yt_select_cache')){
      if (state.select['yt_select_cache'].hasOwnProperty(code)) {
        return state.select.yt_select_cache[code]
      }
    }
    
    return []
  },
  //获取vuex缓存值状态
  getCacheDataState: (state) => (code) => {
    if(state.select.hasOwnProperty('yt_select_cache_state')){
      if (state.select['yt_select_cache_state'].hasOwnProperty(code)) {
        return true
      }
    }
    return false
  }
};
