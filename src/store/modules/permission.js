
const permission = {
  state: {
    routers: [],
    addRouters: [],
    country: [],
    account: [],
    departments: [],
    stores: [],
    one_category_code: [],
    two_category_code: [],
    three_category_code: [],
    shop_name: [],
    business:[],
    time:[],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = routers.map(e => {
        return e["url"];
      });
    },
    DROP_LIST_COMMON:(state,obj)=>{
      Object.assign(state,obj)
    }
  },
  actions: {
    droplistCommon({ commit }, obj){
      commit('DROP_LIST_COMMON',obj)
    },
    GenerateRoutes({ commit }, asyncRouter) {
      commit("SET_ROUTERS", asyncRouter);
    },
  }
};

export default permission;
