import Vue from "vue";
import Vuex from "vuex";

import modules from "./modules";
import getters from "./getter";

Vue.use(Vuex);
export default new Vuex.Store({
  modules,
  // strict: process.env.NODE_ENV !== "production",
  getters
});
