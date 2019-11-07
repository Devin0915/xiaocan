<template>
  <div>
    <Row class="search">
      <slot></slot>
    </Row>
    <div class="statistics">
      <v-statistics ></v-statistics>
    </div>
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
        <span slot="toolList">
            <Tooltip placement="top" transfer content="导出汇总数据">
              <Button
                size="small"
                type="primary"
                icon="md-cloud-download"
                style="margin-left: 10px;"
              ></Button>
            </Tooltip>
            <Tooltip placement="top-end" transfer content="导出每日数据">
              <Button
                size="small"
                type="primary"
                style="margin-left: 10px;"
                icon="md-download"
              ></Button>
            </Tooltip>
          </span>
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
import VStatistics from "@/components/shard/common-total";
import { getSessionStorage,listingUrl } from "@/utils";
import { getToken } from "@/utils/auth";
import qs from "qs";
export default {
  name: 'amsTable',
  componentName: 'amsTable',
  components: {
    CommonTable,
    VStatistics
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
    tableColumns:{
      type:Array,
      default(){
        return []
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
        columns: this.tableColumns,
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
      this.handleSearch({});
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
        token:getToken(),
        is_follow:row.is_follow
      }
      axios.post(this.$rootApi + "/api/dashBoard/storeView/followAsin", params).then(res => {
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
    handlefilteParams(obj) {
      const params = {
        storeId:getSessionStorage('userInfo').store_id,
        country: getSessionStorage('userInfo').user_country,
        account: getSessionStorage('userInfo').user_account,
        userId: getSessionStorage('user').userid,
        asin: this.search.asin,
        token:getToken()
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
      // this.tableLoading = true;
      // axios.post( this.$rootApi + this.data, params).then(res => {
      //   let { code, msg, data } = res;
      //   if (code === 1) {
      //     this.tableLoading = false;
      //     let {total,list} = data;       
      //     this.dataTable = list   
      //     this.total = total;
      //   }else{
      //     this.$Message.error(msg);
      //     this.tableLoading = false;
      //   }
      // });
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
