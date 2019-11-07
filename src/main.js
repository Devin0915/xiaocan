import Vue from "vue";
import app from "./app";
import router from "./router";
import store from "./store";
import "normalize.css/normalize.css";
import "./assets/styles/index.scss"; 
import "./iview";
import * as util from '@/utils';
import Echarts from 'echarts';
import VCharts from 'v-charts';
// import 'xe-utils'
// import VXETable from 'vxe-table'
// import 'vxe-table/lib/index.css'

import config from '@/config/config'
const rootApi = config.serverPath.server;

import moment from 'moment';
import YSelect from '@/components/util/y-select/index';

Vue.config.productionTip = false;
Vue.prototype.$rootApi = rootApi
Vue.prototype.$util = util
Vue.prototype.VUE_APP_SERVER = "http://xc.patozon.net/"
Vue.prototype.$echarts = Echarts 
Vue.prototype.$moment = moment
Vue.use(Echarts)
Vue.use(VCharts)
// Vue.use(VXETable)
Vue.component('YSelect', YSelect)


new Vue({
  router,
  store,
  render: h => h(app)
}).$mount("#app");
