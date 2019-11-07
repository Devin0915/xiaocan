<template>
  <div>
    <Row class="search">
      <slot></slot>
    </Row>
    <Row class="tableRow">
      <div>
        <CommonTable
          :tableColumns="columns"
          :tableData="dataTable"
          :pageTotal="total"
          :currentPage="pagination.pageNum"
          :tableKey="'pricing-ebay-'+activeName"
          :num="200"
          :tableLoading="tableLoading"
          @handlePageChange="handleGetTableData"
        >
        </CommonTable>
      </div>
    </Row>
    <div v-if="showTable">
      <tableModal :visible.sync="showTable" :row="tableRow" ></tableModal>
    </div>
     <div v-if="echartShow">
      <echartsModal :visible.sync="echartShow" :row="echartRow" :type="echartType" :typeName="echartType == 'price' ? '价格'+ echartRow.currency_icon:'评分'"></echartsModal>
    </div>
  </div>
</template>
<script>
import CommonTable from "@/components/shard/common-table";
import axios from "@/axios/config";
import Cookies from "js-cookie";
import { getSessionStorage,listingUrl } from "@/utils";
import { getToken } from "@/utils/auth";
import tableModal from './tableModal';
import echartsModal from './echartsModal'
import qs from "qs";
import SparkLine from "@/components/shard/SparkLine"
export default {
  name: 'amsTable',
  componentName: 'amsTable',
  components: {
    CommonTable,
    SparkLine,
    tableModal,
    echartsModal
  },
  props: {
    data: {
      type: [String, Array],
      default() {
        return [];
      }
    },
    search: {
      type: Object,
      default() {
        return {};
      }
    },
    tab: {
      type: Number,
      default: 1
    },
    visible: false,
    activeName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
        showTable: false,
        tableRow: {},
        columns: [
          {title: 'ASIN', key: 'asin',align: 'center',width: 150,
            render(h, params) {
              return h('span',{
                style:{
                  color:' #7aa2ff',
                  cursor: 'default'
                },
                on: {
                  click: () => {
                    let url = listingUrl(params.row.asin,params.row.country)
                    window.open(url)
                  }
                }
              },params.row.asin)
            }
          },
          {
            key: "img",
            title: "主图",
            width: "90",
            render: (h, params) => {
              return h("img", {
                attrs: {
                  src: params.row.img
                },
                style: {
                  width: params.row.img ? "50px" : "0px",
                  height: params.row.img ? "50px" : "0px"
                }
              });
            }
          },
          {
            key: "operation",
            title: "操作",
            fixed: "right",
            align: "center",
            width: "250",
            render: (h, params) => {
              return h("span", [
                h("Tooltip",{
                  props:{
                    content:"点击查看每日数据明细",
                    placement:'top',
                    transfer:true
                  }
                },[
                  h("Icon",{
                      props: {
                        type: "ios-list-box",
                        size: 20
                      },
                      style: {
                        color: "#3a8ee6",
                        marginLeft: "20px"
                      },
                      on: {
                        click: () => {
                          this.handleASINDetails(params.row);
                        }
                      }
                  })
                ]),
                h("Tooltip",{
                  props:{
                    content:"点击查看ASIN分析数据",
                    placement:'top',
                    transfer:true
                  }
                },[
                  h("Icon",{
                      props: {
                        type: "md-trending-up",
                        size: 20
                      },
                      style: {
                        color: "#3a8ee6",
                        marginLeft: "20px"
                      },
                      on: {
                        click: () => {
                          this.handleShowTrend(params.row);
                        }
                      }
                  })
                ]),
                h("Tooltip",{
                  props:{
                    content:"点击查看广告数据",
                    placement:'top',
                    transfer:true
                  }
                },[
                  h("Icon",{
                      props: {
                        type: "md-easel",
                        size: 20
                      },
                      style: {
                        color: "#3a8ee6",
                        marginLeft: "20px"
                      },
                      on: {
                        click: () => {
                          this.handleShowTrend(params.row);
                        }
                      }
                  })
                ]),
                h("Tooltip",{
                  props:{
                    content:"关注ASIN",
                    placement:'top',
                    transfer:true
                  }
                },[
                  h("i-switch",{
                      props: {
                        type: "primary",
                        size:"small",
                        value:params.row.is_follow === 1
                      },
                      style: {
                        color: "#3a8ee6",
                        marginLeft: "20px"
                      },
                      on: {
                        'on-change':(value) => {
                          this.handleSwitch(params.row);
                        }
                      }
                  })
                ]),
              ]);
            }
          },
          {title: '价格', key: 'price',align: 'center',sortable:'custom',width: 150,
            render:(h,params) => {
              let priceHtml = "";
              let colorType = "#a5a5a5"
              if (0 >= (+params.row.price)) {
                priceHtml = '——';
              }else{
                let price = params.row.price.substring(0,params.row.price.indexOf(".")+3)
                priceHtml = params.row.currency_icon + price;
                colorType = "#7aa2ff"
              }
              return h('span',{
                style:{
                  color:colorType,
                  cursor: 'default'
                },
                on:{
                  click: () => {
                      if(colorType ==  "#7aa2ff") this.handlePriceClick(params.row,'price');
                    }
                }
              },priceHtml)
            }
          },
          {title: '今日件数', key: 'sales',align: 'center',sortable:'custom',width: 150},
          {title: '销售额', key: 'sub_total',align: 'center',sortable:'custom',width: 150},
          {title: '昨日件数/周环比', key: 'yst_sales',align: 'center',width: 180,sortable:'custom',sortType:"desc",
            render:(h,params) => {
              return h('span',params.row.yst_sales + ' / ' + (params.row.daily_chain * 100).toFixed(1) + '%' )
            }
          },
          {title: '七天件数/环比', key: 'days_1_7',align: 'center',width: 150,
            render:(h,params) => {
              var text = '';
              text += params.row.days_1_7 == -1 ? '——' : params.row.days_1_7;
              text += ' / ';
              text += params.row.days_8_14 > 0 && params.row.days_1_7 != 1 ? (((params.row.days_1_7 - params.row.days_8_14) / params.row.days_8_14 * 100).toFixed(1) + '%') : '——';
              return h('span',text)
            }
          },
          {title: '评分/总评论', key: 'score',align: 'center',width: 150,
           render:(h,params) => {
             let score = params.row.score.substring(0,params.row.score.indexOf(".")+2);
             let colorType = "#7aa2ff"
             if(score == '-1.0'){
               score = "——";
               colorType = "#a5a5a5"
             }
              return h('span',{
                style:{
                  cursor: 'default'
                },
              },[
                h("span",{
                  style:{
                    color:colorType,
                  },
                  on:{
                    click: () => {
                        if(colorType ==  "#7aa2ff") this.handlePriceClick(params.row,'score');
                      }
                  }
                },score),
                ' / ' + params.row.total_comments
              ])
            }
          },
          {title: '可售', key: 'fulfillable',align: 'center',sortable:'custom',width: 150},
          {title: '在途', key: 'inbound',align: 'center',sortable:'custom',width: 150},
          {title: '转仓中', key: 'transfers',align: 'center',sortable:'custom',width: 150},
          {title: 'Buybox', key: 'buy_box',align: 'center',sortable:'custom',width: 150,
            render:(h,params) => {
              return h('span', params.row.buy_box + '%')
            }
          },
          {title: '流量走势（近30天）', key: 'score',align: 'center',width: 200,
            render: (h, params) => {
              let rdata = params.row.sessions
              let item = Object.keys(rdata).map(key => {
                  return key
              })
              let data = Object.keys(rdata).map(key=>{
                  let data = rdata[key] ? rdata[key] : 0
                  return data
              })
              let chartData = {
                  time:item,
                  data:data,
              }
              return h("div", [
                  h(SparkLine,{
                      props:{
                          chartData:chartData,
                      }
                  })
              ]);
            }
          },
          {title: 'CVR走势（近30天）', key: 'score',align: 'center',width: 200,
            render: (h, params) => {
              let rdata = params.row.unit_sessions
              let item = Object.keys(rdata).map(key => {
                  return key
              })
              let data = Object.keys(rdata).map(key=>{
                  let data = rdata[key] ? rdata[key] : 0
                  return data
              })
              let chartData = {
                  time:item,
                  data:data,
              }
              return h("div", [
                  h(SparkLine,{
                      props:{
                          chartData:chartData,
                      }
                  })
              ]);
            }
          },
          {title: '销量走势（近30天）', key: 'score',align: 'center',width: 200,
            render: (h, params) => {
              let rdata = params.row.sales_datas
              let item = Object.keys(rdata).map(key => {
                  return key
              })
              let data = Object.keys(rdata).map(key=>{
                  let data = rdata[key] ? rdata[key] : 0
                  return data
              })
              let chartData = {
                  time:item,
                  data:data,
              }
              return h("div", [
                  h(SparkLine,{
                      props:{
                          chartData:chartData,
                      }
                  })
              ]);
            }
          },
        ],
        dataTable: [],
        total: 0,
        tableLoading: false,
        init: false,
        echartRow:{},
        echartType:'',
        echartShow:false,
        pagination: {
            pageNum: 1,
            pageSize: 25
        },
        sortObj:{
          sort_field:'',
          sort_type:''
        }
    };
  },
  watch: {
    visible(val) {
      if (val && !this.init) {
        this.handleSearch({});
      }
    }
  },
  mounted() {
    this.$on("Search.search", data => {
      this.handleSearch({});
    });
    if (this.visible) {
      setTimeout(() => {
        this.handleSearch({});
      }, 1500);
    }
  },
  methods: {
    handlePriceClick(row,type){
      this.echartRow= row;
      this.echartType = type;
      this.echartShow = true;
    },
    handleSwitch(row){
      let params = {
        storeId:getSessionStorage('userInfo').store_id,
        country: getSessionStorage('userInfo').user_country,
        account: getSessionStorage('userInfo').user_account,
        userId: getSessionStorage('user').userid,
        asin: row.asin,
        token:Cookies.get('Admin-Token'),
        is_follow:row.is_follow
      }
      axios.post( this.$rootApi + "/api/dashBoard/storeView/followAsin", params).then(res => {
        let {msg,code} = res;
        if(code === 1){
          if(row.is_follow === 1) this.$Message.success("关注成功！")
          else this.$Message.success("取关成功！")
        }else{
          this.$Message.error(msg);
        }
      })
    },
    handleASINDetails(row) {
      this.showTable = true;
      this.tableRow = row;
    },
    handleShowTrend(){
       this.$Message.error('开发中。。。');
    },
    handlefilteParams(obj) {
      const params = {
        storeId:getSessionStorage('userInfo').store_id,
        country: getSessionStorage('userInfo').user_country,
        account: getSessionStorage('userInfo').user_account,
        userId: getSessionStorage('user').userid,
        asin: this.search.asin,
        token:Cookies.get('Admin-Token')
      };
      if(this.activeName == 'tabOne') params.tab_shop = '0'
      if(this.activeName == 'tabTwo') params.tab_shop = '1'
      if(this.activeName == 'tabThree') params.tab_shop = '2'
      if(this.activeName == 'tabFour') params.tab_shop = '3'
      if (Object.keys(obj).length > 0) {
        params.page = obj.currentPage;
        params.per_page = obj.pageSize;
        params.order_column = obj.sort_field ? obj.sort_field : 'yst_sales';
        params.order_dir = obj.sort_type ? obj.sort_type : 'desc';
        this.pagination.pageNum = obj.currentPage;
        if(obj.sort_type == "normal"){
          params.order_column = '';
          params.order_dir = '';
        }
      } else {
        if(typeof  this.sortObj.sort_field !== 'undefined' &&  this.sortObj.sort_field !== '' &&  this.sortObj.sort_field !== null){
          params.order_column = this.sortObj.sort_field;
          params.order_dir = this.sortObj.sort_type;
        }else{
          params.order_column = 'yst_sales';
          params.order_dir = 'desc';
        }
        params.page = 1;
        params.per_page = 25;
        this.pagination.pageNum = 1;
      }
      return params;
    },
    handleSearch(pagination = {}) {
      if (Array.isArray(this.data)) {
        this.dataTable = this.data.splice(0);
        return;
      }
      let params = this.handlefilteParams(pagination);
      this.tableLoading = true;
      axios.post(this.$rootApi + this.data, params).then(res => {
        let { code, msg, data } = res;
        if (code === 1) {
          this.tableLoading = false;
          let {total,list} = data;       
          this.dataTable = list   
          this.total = total;
        }else{
          this.$Message.error(msg);
          this.tableLoading = false;
        }
      });
    },
    // 分页
    handleGetTableData(data) {
      this.sortObj.sort_field = data.sort_field;
      this.sortObj.sort_type = data.sort_type;
      this.handleSearch(data);
    }
  }
};
</script>
<style lang="less" scoped>
.tableRow {
  margin-right: 10px;
}
/deep/ th .ivu-table-cell {
  color: black !important;
}
</style>
