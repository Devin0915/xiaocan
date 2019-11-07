import Vue from "vue";
import Router from "vue-router";
import Layout from "@/components/container/Layout";
Vue.use(Router);
export const routesConfig = [
  {
    path: "/login",
    component: () => import("@/page/user/login"),
    name:'login',
    hidden: true
  },
  {
    path: "/singleSignOn",
    component: () => import("@/page/user/singleSignOn"),
    name:'singleSignOn',
    hidden: true
  },
  {
    path: "/401",
    name:'error401',
    component: () => import("@/page/user/401"),
    hidden: true
  },
  {
    path: "/404",
    name:'error404',
    component: () => import("@/page/user/404"),
    hidden: true
  },
  
  {
    path: "/",
    component: Layout,
    name: "dashboard",
    meta: { title: "仪表盘", icon: "md-speedometer" },
    children: [
      {
        path: "/shopview",
        name: "shopview",
        component:  resolve => require(['@/page/dashboard/shopviews'], resolve),
        meta: {
          title: "店铺视图",
          icon: "md-radio-button-off",
          affix: true,
          api: "xc_dashBoard_storeView"
        }
      },
      {
        path: "test",
        name: "test",
        component: resolve => require(['@/page/salesStatement/shopSatement/index'], resolve),
        meta: { title: "实时数据", icon: "md-radio-button-off", api: "xc_dashBoard_realtimeData" }
      },
      {
        path: "test2",
        name: "test2",
        component: resolve => require(['@/page/salesStatement/shopSatement/index'], resolve),
        meta: { title: "实时数据", icon: "md-radio-button-off", api: "bbb" }
      },
      {
        path: "test3",
        name: "test3",
        component: resolve => require(['@/page/salesStatement/shopSatement/index'], resolve),
        meta: { title: "实时数据", icon: "md-radio-button-off", api: "ccc" }
      },
    ]
  },

  {
    path: "/market",
    component: Layout,
    redirect: "/store_historical",
    name: "market",
    meta: { title: "销售报表", icon: "md-trending-up" },
    children: [
      {
        path: "business_historical",
        name: "business_historical",
        component: resolve => require(['@/page/salesStatement/BUsSatement/index'], resolve),
        meta: {
          title: "事业部报表",
          icon: "md-radio-button-off",
          api: "xc_sellReport_businessDivision"
        }
      },
    ]
  },
  {
    path: "/pricing",
    component: Layout,
    redirect: "/pricing_ebay",
    name: "pricing",
    meta: { title: "价格核算-自采产品", icon: "md-calculator" },
    children: [
      {
        path: "pricing_ebay",
        name: "自采-Ebay平台",
        component: resolve => require(['@/page/salesStatement/shopSatement/index'], resolve),
        meta: { title: "自采-Ebay平台", icon: "md-radio-button-off", api: "xc_priceCalSelfProduct_ebay" }
      },
      {
        path: "pricing_wish",
        name: "自采-Wish平台",
        component: resolve => require(['@/page/salesStatement/exportAmazonOrderTemp/index'], resolve),
        meta: { title: "自采-Wish平台", icon: "md-radio-button-off", api: "xc_priceCalSelfProduct_wish" }
      },
      {
        path: "pricing_shopee",
        name: "自采-Shopee平台",
        component: resolve => require(['@/page/salesStatement/salesVolumeExport/index'], resolve),
        meta: { title: "自采-Shopee平台", icon: "md-radio-button-off", api: "xc_priceCalSelfProduct_shopee" }
      },
      {
        path: "pricing_synthesize",
        name: "自采-综合平台",
        component: resolve => require(['@/page/salesStatement/orderExportTemplate/index'], resolve),
        meta: { title: "自采-综合平台", icon: "md-radio-button-off", api: "xc_priceCalSelfProduct_wish" }
      },
      {
        path: "pricing_excel",
        name: "自采-数据导入",
        component: resolve => require(['@/page/dashboard/shopviews'], resolve),
        meta: { title: "自采-数据导入", icon: "md-radio-button-off", api: "xc_priceCalSelfProduct_import" }
      },
      {
        path: "pricing_export",
        name: "自采-导出列表",
        component: resolve => require(['@/page/dashboard/shopviews'], resolve),
        meta: { title: "自采-导出列表", icon: "md-radio-button-off", api: "xc_priceCalSelfProduct_export" }
      },
    ]
  },
  {
    path: "/self_pricing",
    component: Layout,
    redirect: "/self_pricing_ebay",
    name: "self_pricing",
    meta: { title: "价格核算-公司产品", icon: "ios-podium" },
    children: [
      {
        path: "self_pricing_ebay",
        name: "公司-Ebay平台",
        component: resolve => require(['@/page/dashboard/shopviews'], resolve),
        meta: { title: "公司-Ebay平台", icon: "md-radio-button-off", api: "xc_priceCalCompanyProduct_ebay" }
      },
      {
        path: "self_pricing_wish",
        name: "公司-Wish平台",
        component: resolve => require(['@/page/dashboard/shopviews'], resolve),
        meta: { title: "公司-Wish平台", icon: "md-radio-button-off", api: "xc_priceCalCompanyProduct_wish" }
      },
      {
        path: "self_pricing_shopee",
        name: "公司-Shopee平台",
        component: resolve => require(['@/page/dashboard/shopviews'], resolve),
        meta: { title: "公司-Shopee平台", icon: "md-radio-button-off", api: "xc_priceCalCompanyProduct_shopee" }
      },
      {
        path: "self_pricing_synthesize",
        name: "公司-综合平台",
        component: resolve => require(['@/page/dashboard/shopviews'], resolve),
        meta: { title: "公司-综合平台", icon: "md-radio-button-off", api: "xc_priceCalCompanyProduct_summary" }
      },
      {
        path: "self_pricing_excel",
        name: "公司-数据导入",
        component: resolve => require(['@/page/dashboard/shopviews'], resolve),
        meta: { title: "公司-数据导入", icon: "md-radio-button-off", api: "xc_priceCalCompanyProduct_import" }
      },
      {
        path: "self_pricing_export",
        name: "公司-导出列表",
        component: resolve => require(['@/page/dashboard/shopviews'], resolve),
        meta: { title: "公司-导出列表", icon: "md-radio-button-off", api: "xc_priceCalCompanyProduct_export" }
      }
    ]
  },
];

export default new Router({
  mode: "history",
  base: process.env.publicPath,
  routes: routesConfig
});