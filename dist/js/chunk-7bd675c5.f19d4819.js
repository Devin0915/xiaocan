(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7bd675c5"],{"0e8f":function(e,t,a){"use strict";var n=a("b9fc"),r=a.n(n);r.a},"1b0f":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",[a("Times",{attrs:{typename:"店铺报表"}})],1),a("div",{staticClass:"container-wrapper"},[a("Tabs",{model:{value:e.tabActive,callback:function(t){e.tabActive=t},expression:"tabActive"}},e._l(e.tabs,function(t,n){return a("TabPane",{key:"tab-pane-"+n,attrs:{name:t.key,label:t.label}},[a("BuTable",{attrs:{data:t.url,search:e.dataModel,visible:e.tabActive==t.key,tableColumns:t.cloumns,tab:t.search.tab,activeName:e.tabActive}},[a("Search",{attrs:{model:e.dataModel,type:t.key,tab:t.search.tab}})],1)],1)}),1)],1)])},r=[],o=a("31a5"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"search"},[a("Form",{ref:"formRef",attrs:{model:e.dataModel,inline:""}},[a("FormItem",{attrs:{label:"时间：","label-width":60}},[a("CommonDatePicker",{attrs:{time:e.dataModel.time},on:{Onchange:e.handleDatePickerOnChange}})],1),a("FormItem",{attrs:{label:"事业部：","label-width":80}},[a("y-select",{staticStyle:{width:"150px"},attrs:{clearable:"",code:"business",transfer:!0,placeholder:"请选择"},model:{value:e.dataModel.business,callback:function(t){e.$set(e.dataModel,"business",t)},expression:"dataModel.business"}})],1),a("FormItem",{attrs:{label:"三级类目：","label-width":100}},[a("y-select",{staticStyle:{width:"150px"},attrs:{clearable:"",code:"threeCategory",transfer:!0,placeholder:"请选择"},model:{value:e.dataModel.business,callback:function(t){e.$set(e.dataModel,"business",t)},expression:"dataModel.business"}})],1),a("FormItem",{attrs:{label:"账号：","label-width":80}},[a("y-select",{staticStyle:{width:"150px"},attrs:{clearable:"",code:"account",transfer:!0,placeholder:"请选择"},model:{value:e.dataModel.business,callback:function(t){e.$set(e.dataModel,"business",t)},expression:"dataModel.business"}})],1),a("FormItem",{attrs:{label:"国家：","label-width":80}},[a("y-select",{staticStyle:{width:"150px"},attrs:{clearable:"",code:"country",transfer:!0,placeholder:"请选择"},model:{value:e.dataModel.business,callback:function(t){e.$set(e.dataModel,"business",t)},expression:"dataModel.business"}})],1),"asin"==e.type?a("FormItem",{attrs:{label:"","label-width":10}},[a("iInput",{attrs:{placeholder:"产品SKU/ASIN/店铺SKU"},model:{value:e.dataModel.campaign_name,callback:function(t){e.$set(e.dataModel,"campaign_name",t)},expression:"dataModel.campaign_name"}})],1):e._e(),a("FormItem",{staticClass:"form-but"},[a("Button",{attrs:{type:"primary"},on:{click:e.handleSearch}},[e._v("查 询")])],1)],1)],1)},i=[],l=a("2708"),c=a("f341"),d={mixins:[l["a"]],props:{type:{type:String,default:""},model:{type:Object,default:function(){return{}}}},components:{CommonDatePicker:c["a"]},data:function(){return{dataModel:this.model}},created:function(){},methods:{handleDatePickerOnChange:function(e){},handleSearch:function(){var e={asin:this.dataModel.asin};this.dispatch("amsTable","Search.search",e),this.$emit("search",this.dataModel)}}},u=d,h=(a("98c4"),a("2877")),p=Object(h["a"])(u,s,i,!1,null,"54906296",null);p.options.__file="search.vue";var f=p.exports,m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Row",{staticClass:"search"},[e._t("default")],2),a("div",{staticClass:"statistics"},[a("v-statistics")],1),a("Row",{staticClass:"tableRow"},[a("div",[a("CommonTable",{attrs:{tableColumns:e.columns,tableData:e.dataTable,pageTotal:e.total,currentPage:e.pagination.pageNum,tableKey:"pricing-ebay-"+e.activeName,num:200,tableLoading:e.tableLoading},on:{handlePageChange:e.handleGetTableData}},[a("span",{attrs:{slot:"toolList"},slot:"toolList"},[a("Tooltip",{attrs:{placement:"top",transfer:"",content:"导出汇总数据"}},[a("Button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"primary",icon:"md-cloud-download"}})],1),a("Tooltip",{attrs:{placement:"top-end",transfer:"",content:"导出每日数据"}},[a("Button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"primary",icon:"md-download"}})],1)],1)])],1)]),e.showTable?a("div",[a("tableModal",{attrs:{visible:e.showTable,row:e.tableRow},on:{"update:visible":function(t){e.showTable=t}}})],1):e._e(),e.echartShow?a("div",[a("echartsModal",{attrs:{visible:e.echartShow,row:e.echartRow,type:e.echartType,typeName:"price"==e.echartType?"价格"+e.echartRow.currency_icon:"评分"},on:{"update:visible":function(t){e.echartShow=t}}})],1):e._e()],1)},b=[],w=a("a745"),_=a.n(w),y=a("a4bb"),g=a.n(y),v=(a("386d"),a("c5f6"),a("cadf"),a("551c"),a("097d"),a("5d79")),S=a("f380"),k=a("ea77"),T=a("ed08"),x=a("5f87"),M=(a("4328"),{name:"amsTable",componentName:"amsTable",components:{CommonTable:v["a"],VStatistics:k["a"]},props:{data:{type:[String,Array],default:function(){return[]}},search:{type:Object,default:function(){return{}}},tableColumns:{type:Array,default:function(){return[]}},tab:{type:Number,default:1},visible:!1,activeName:{type:String,default:""}},data:function(){return{showTable:!1,tableRow:{},columns:this.tableColumns,dataTable:[],total:0,tableLoading:!1,init:!1,echartRow:{},echartType:"",echartShow:!1,pagination:{pageNum:1,pageSize:25},sortObj:{sort_field:"",sort_type:""}}},watch:{visible:function(e){e&&!this.init&&this.handleSearch({})}},mounted:function(){var e=this;this.$on("Search.search",function(t){e.handleSearch({})}),this.visible&&this.handleSearch({})},methods:{handlePriceClick:function(e,t){this.echartRow=e,this.echartType=t,this.echartShow=!0},handleSwitch:function(e){var t=this,a={storeId:Object(T["getSessionStorage"])("userInfo").store_id,country:Object(T["getSessionStorage"])("userInfo").user_country,account:Object(T["getSessionStorage"])("userInfo").user_account,userId:Object(T["getSessionStorage"])("user").userid,asin:e.asin,token:Object(x["a"])(),is_follow:e.is_follow};S["a"].post(this.$rootApi+"/api/dashBoard/storeView/followAsin",a).then(function(a){var n=a.msg,r=a.code;1===r?1===e.is_follow?t.$Message.success("关注成功！"):t.$Message.success("取关成功！"):t.$Message.error(n)})},handleASINDetails:function(e){this.showTable=!0,this.tableRow=e},handlefilteParams:function(e){var t={storeId:Object(T["getSessionStorage"])("userInfo").store_id,country:Object(T["getSessionStorage"])("userInfo").user_country,account:Object(T["getSessionStorage"])("userInfo").user_account,userId:Object(T["getSessionStorage"])("user").userid,asin:this.search.asin,token:Object(x["a"])()};return"tabOne"==this.activeName&&(t.tab_shop="0"),"tabTwo"==this.activeName&&(t.tab_shop="1"),"tabThree"==this.activeName&&(t.tab_shop="2"),"tabFour"==this.activeName&&(t.tab_shop="3"),g()(e).length>0?(t.page=e.currentPage,t.per_page=e.pageSize,t.order_column=e.sort_field?e.sort_field:"yst_sales",t.order_dir=e.sort_type?e.sort_type:"desc",this.pagination.pageNum=e.currentPage):("undefined"!==typeof this.sortObj.sort_field&&""!==this.sortObj.sort_field&&null!==this.sortObj.sort_field?(t.order_column=this.sortObj.sort_field,t.order_dir=this.sortObj.sort_type):(t.order_column="yst_sales",t.order_dir="desc"),t.page=1,t.per_page=25,this.pagination.pageNum=1),t},handleSearch:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(_()(this.data))this.dataTable=this.data.splice(0);else this.handlefilteParams(e)},handleGetTableData:function(e){this.sortObj.sort_field=e.sort_field,this.sortObj.sort_type=e.sort_type,this.handleSearch(e)}}}),I=M,O=(a("0e8f"),Object(h["a"])(I,m,b,!1,null,"5d7ad902",null));O.options.__file="shop-table.vue";var j=O.exports,C={components:{Times:o["a"],Search:f,BuTable:j},data:function(){var e=this;return{tabActive:"shop",tabs:[{label:"店铺历史数据",key:"shop",cloumns:[{key:"department_name",title:"事业部",fixed:"left",align:"left",minWidth:100,render:function(e,t){return e("span",{},"summary"==t.row.department_name?"汇总":t.row.department_name)}},{key:"account",title:"账号",align:"left",width:"100",fixed:"left",render:function(e,t){return e("span",{},"summary"==t.row.department_name?"":t.row.account)}},{key:"country",title:"国家",fixed:"left",width:"100",render:function(e,t){return e("span",{},"summary"==t.row.department_name?"":t.row.country)}},{key:"md-grid",title:"天数据",align:"left",fixed:"left",minWidth:100,render:function(t,a){return t("a",[t("Icon",{props:{type:"ios-list-box",size:24},style:{color:"#3a8ee6"},on:{click:function(){e.handleShowModalTable(a.row)}}})])}},{key:"total_sales",title:"销售件数",minWidth:130,align:"left",filters:[{label:"Greater than 5000",value:1},{label:"Less than 5000",value:2}],filterMultiple:!1,filterMethod:function(e,t){return 1===e?t.total_sales>5e3:2===e?t.total_sales<5e3:void 0},render:function(t,a){var n=e;return t("span",{style:{cursor:"pointer"},on:{click:function(){n.handleShowEcharts("total_sales",a.row)}}},a.row.total_sales)}},{key:"total_orders",title:"订单数",minWidth:100,align:"left",render:function(t,a){var n=e;return t("span",{style:{cursor:"pointer"},on:{click:function(){n.handleShowEcharts("total_orders",a.row)}}},a.row.total_orders)}},{key:"total_amount",title:"销售额（$）",sortable:!0,minWidth:120,align:"left",render:function(t,a){var n=e;return t("span",{style:{cursor:"pointer"},on:{click:function(){n.handleShowEcharts("total_amount",a.row)}}},a.row.total_amount)}},{key:"discount_amount",title:"折扣（$）/折扣率",sortable:!0,align:"left",minWidth:150,render:function(t,a){var n=e;return t("span",{style:{cursor:"pointer"},on:{click:function(){n.handleShowEcharts("discount_rate",a.row)}}},a.row.discount_amount+" / "+a.row.discount_rate)}},{key:"sales_share",title:"销售额占比",sortable:!0,minWidth:120,align:"left",render:function(t,a){var n=e;return t("span",{style:{cursor:"pointer"},on:{click:function(){n.handleShowEcharts("sales_share",a.row)}}},a.row.sales_share)}},{key:"total_sessions",title:"Session",minWidth:150,sortable:!0,align:"left",renderHeader:function(e,t){return e("span",[e("span","Session"),e("Tooltip",{props:{content:"数据来源于上传到ERP的业务报告",placement:"top",transfer:!0}},[e("Icon",{props:{type:"md-alert",size:"16",transfer:!0},style:{marginTop:"-3px"}})])])},render:function(t,a){var n=e;return t("span",{style:{cursor:"pointer"},on:{click:function(){n.handleShowEcharts("date_sessions",a.row)}}},"summary"==a.row.business_name?a.row.total_sessions:a.row.date_sessions)}},{key:"percent_rate",title:"转化率",sortable:!0,minWidth:120,align:"left",render:function(t,a){var n=e;return t("span",{style:{cursor:"pointer"},on:{click:function(){n.handleShowEcharts("conversion_rate",a.row)}}},"summary"==a.row.business_name?a.row.percent_rate:a.row.conversion_val)}}],search:{tab:1},url:""},{label:"ASIN历史数据",key:"asin",search:{tab:2},url:"",cloumns:[{key:"department_name",title:"事业部",fixed:"left",align:"left",width:"110",render:function(e,t){return e("span",{},"summary"==t.row.department_name?"汇总":t.row.department_name)}},{key:"store_name",title:"店铺",align:"left",fixed:"left",width:"80",render:function(e,t){return e("span",{},"-"==t.row.store_name?"":t.row.store_name)}},{key:"img",title:"主图",fixed:"left",width:"90",render:function(e,t){return e("img",{attrs:{src:t.row.img},style:{width:t.row.img?"50px":"0px",height:t.row.img?"50px":"0px"}})}},{key:"asin",title:"ASIN/SKU",align:"center",width:"250",fixed:"left",ellipsis:!0,tooltip:!0,render:function(t,a){return t("span",{},[t("div",{style:{color:"#3a8ee6",cursor:"pointer"},on:{click:function(){e.handleASINClick(a.row)}}},"-"==a.row.asin?"":a.row.asin),t("div","-"==a.row.sku?"":a.row.sku)])}},{key:"md-grid",title:"天数据",align:"left",fixed:"left",minWidth:100,render:function(t,a){return t("a",[t("Icon",{props:{type:"ios-list-box",size:24},style:{color:"#3a8ee6"},on:{click:function(){e.handleShowModalTable(a.row)}}})])}},{key:"total_sales",title:"销售件数",minWidth:130,align:"left",filters:[{label:"Greater than 5000",value:1},{label:"Less than 5000",value:2}],filterMultiple:!1,filterMethod:function(e,t){return 1===e?t.total_sales>5e3:2===e?t.total_sales<5e3:void 0},render:function(t,a){var n=e;return t("span",{style:{cursor:"pointer"},on:{click:function(){n.handleShowEcharts("total_sales",a.row)}}},a.row.total_sales)}},{key:"total_orders",title:"订单数",minWidth:100,align:"left",render:function(t,a){var n=e;return t("span",{style:{cursor:"pointer"},on:{click:function(){n.handleShowEcharts("total_orders",a.row)}}},a.row.total_orders)}},{key:"total_amount",title:"销售额（$）",sortable:!0,minWidth:120,align:"left",render:function(t,a){var n=e;return t("span",{style:{cursor:"pointer"},on:{click:function(){n.handleShowEcharts("total_amount",a.row)}}},a.row.total_amount)}},{key:"discount_amount",title:"折扣（$）/折扣率",sortable:!0,align:"left",minWidth:150,render:function(t,a){var n=e;return t("span",{style:{cursor:"pointer"},on:{click:function(){n.handleShowEcharts("discount_rate",a.row)}}},a.row.discount_amount+" / "+a.row.discount_rate)}},{key:"sales_share",title:"销售额占比",sortable:!0,minWidth:120,align:"left",render:function(t,a){var n=e;return t("span",{style:{cursor:"pointer"},on:{click:function(){n.handleShowEcharts("sales_share",a.row)}}},a.row.sales_share)}},{key:"total_sessions",title:"Session",minWidth:150,sortable:!0,align:"left",renderHeader:function(e,t){return e("span",[e("span","Session"),e("Tooltip",{props:{content:"数据来源于上传到ERP的业务报告",placement:"top",transfer:!0}},[e("Icon",{props:{type:"md-alert",size:"16"},style:{marginTop:"-3px"}})])])},render:function(t,a){var n=e;return t("span",{style:{cursor:"pointer"},on:{click:function(){n.handleShowEcharts("date_sessions",a.row)}}},"summary"==a.row.business_name?a.row.total_sessions:a.row.date_sessions)}},{key:"percent_rate",title:"转化率",sortable:!0,minWidth:120,align:"left",render:function(t,a){var n=e;return t("span",{style:{cursor:"pointer"},on:{click:function(){n.handleShowEcharts("conversion_rate",a.row)}}},"summary"==a.row.business_name?a.row.percent_rate:a.row.conversion_val)}}]}],dataModel:{asin:""}}},methods:{handleShowEcharts:function(){}}},E=C,N=(a("e70d"),Object(h["a"])(E,n,r,!1,null,"778bc988",null));N.options.__file="index.vue";t["default"]=N.exports},"317f":function(e,t,a){},"98c4":function(e,t,a){"use strict";var n=a("f44c"),r=a.n(n);r.a},b9fc:function(e,t,a){},e70d:function(e,t,a){"use strict";var n=a("317f"),r=a.n(n);r.a},f44c:function(e,t,a){}}]);