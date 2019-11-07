const select = {
    state: {
        yt_select_cache:{},
        yt_select_cache_state:{}
    },
    mutations:{
        ADD_YT_SELECT_DATA(state,{data,code}){
            var sd = state['yt_select_cache']
            sd[code] = data
            state.yt_select_cache = {}
            state.yt_select_cache = sd
        },
        ADD_YT_SELECT_STATUE(state,{code,flag}){
            var sd = state['yt_select_cache_state']
            sd[code] = flag
            state.yt_select_cache_state = {}
            state.yt_select_cache_state = sd
        }
    },
    actions:{
        addSelectData({ state,commit },{data,code}){
            if(state['yt_select_cache'].hasOwnProperty(code)){
                return false
            }
            if(state['yt_select_cache_state'].hasOwnProperty(code)){
                return false
            }
            commit('ADD_YT_SELECT_STATUE',{code:code,flag:true})
            if(typeof data === 'object' && typeof data.then === 'function'){
                data.then(res=>{
                    //如果需要特殊处理返回对象 
                    if(Array.isArray(res)){

                    }
                    commit('ADD_YT_SELECT_DATA',{code:code,data:res})
                    commit('ADD_YT_SELECT_STATUE',{code:code,flag:false})
                })
                return false
            }
            if(Array.isArray(data)){
                commit('ADD_YT_SELECT_DATA',{code:code,data:data})
                commit('ADD_YT_SELECT_STATUE',{code:code,flag:false})
                return false
            }
            throw new Error(code + ' 加入vuex失败，无效的数据！'+data)
        }
    }
}

export default select;
