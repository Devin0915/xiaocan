<template>
  <div class="container-wrapper">
      <Card>
        <Tabs @on-click="changeTable" :animated="false">
          <TabPane v-for="item in tabList" :label="item.warehouse" :name="item.id+''" :key="item.id" @on-click="changeTable(item.value)">
            <div>
              <Row class="search">
                <search  @search="search"></search>
              </Row>
              <Row class="tableRow">
                <div>
                  <CommonTable
                    :tableColumns="columns"
                    :tableData="listData"
                    :pageTotal="totalNum"
                    :currentPage="listParams.page"
                    :tableKey="'pricing-ebay-'+activeName"
                    :num="200"
                    :tableLoading="loading"
                    @handlePageChange="handleGetTableData"
                  >
                  </CommonTable>
                </div>
              </Row>
            </div>
          </Tabpane>
        </Tabs>
      </Card>
    </div>
</template>
<script>
import CommonTable from "@/components/shard/common-table";
// import Search from './components/search'
import Search from './search'
import { getWarehouseListSelf,getTableHeaderSelf,getSkuPriceCalListSelf} from '@/axios/pricing'
import { getColumns } from "@/utils/columns";
export default {
    components:{
      Search,CommonTable
    },
    props:{
      platform:{
        type: String
      }
    },
    data(){
    return{
      tabList:[
      ],
      columns:[ 
      ],
      listData:[],
      //筛选条件
      listParams:{
        warehouse_id : 1,
        search:"",
        is_price_change:0,
        is_new_putaway:0,
        is_manager:"",
        page:1,
        page_size:20,
        date_type:"",
        start_date:"",
        end_date:"",
        sort_field:"",
        sort_rule:""
      },
      //数据总条件
      totalNum :0,
      //条件切换
      pageSizeNum:[20,50,100,250],
      loading:true,
      gridHeight:0,
      activeName:""
    }
  },
  methods:{
    getTitle(index){
      const count =  this.columns
      return count
    },
    //切换tab
    changeTable(name){
      this.resetFilter()
      this.getTableHeader(name)
      this.listParams.warehouse_id = name
      this.getSkuPriceCalList(this.listParams)
    },
    //列表高度
    confirmGridHeight(){
      this.gridHeight =  window.innerHeight-334
    },
    //获取仓库列表
    getWarehouseList(){
      let params = {
        "platform":this.platform
      }
      getWarehouseListSelf(params).then(res =>{
        this.tabList = res.data
        this.listParams.warehouse_id = this.tabList[0].id
        this.getTableHeader(this.tabList[0].id)
        this.getSkuPriceCalList(this.listParams)
        // this.listParams.warehouse_id = res.data[0].id
      })
    },
    //获取表头字段
    getTableHeader(index){
      let _this =this
      let params = {
        "warehouse_id":index
      }
      getTableHeaderSelf(params).then(res =>{
        // getColumns(res.data)
        this.columns = getColumns(res.data,_this.listParams.is_price_change)
      })
    },
    //获取列表信息
    getSkuPriceCalList(params){
      this.loading = true
      getSkuPriceCalListSelf(params).then(res =>{
        this.listData = res.data.record
        this.totalNum = res.data.total
        this.loading = false
      })
    },
    //排序
    changeSort(info){
      console.log(info)
      this.listParams.sort_field = info.column.key
      this.listParams.sort_rule = info.order
      this.getSkuPriceCalList(this.listParams)
    },
    //重置筛选条件
    resetFilter(){
      this.listParams.warehouse_id = 1
      this.listParams.search = ""
      this.listParams.is_price_change = 0
      this.listParams.is_new_putaway = 0
      this.listParams.is_manager = ""
      this.listParams.page = 1
      this.listParams.page_size = 20
      this.listParams.date_type = ""
      this.listParams.start_date = ""
      this.listParams.end_date = ""
      this.listParams.sort_field =""
      this.listParams.sort_rule =""
    },
    //切换页码
    // changePage(pageIndex){
    //   this.listParams.page = pageIndex
    //   this.getSkuPriceCalList(this.listParams)
    // },
    // //切换每页条数
    // changePageSize(pageSize){
    //   this.listParams.page_size = pageSize
    //   this.listParams.page = 1
    //   this.getSkuPriceCalList(this.listParams)
    // },
    handleGetTableData(data) {
      // this.sortObj.sort_field = data.sort_field;
      // this.sortObj.sort_type = data.sort_type;
      this.listParams.page =  data.currentPage
      this.listParams.page_size =  data.pageSize
      this.listParams.sort_field = data.sort_field
      this.listParams.sort_rule = data.sort_type
      this.getSkuPriceCalList(this.listParams);
    },
    search(searchData){
      this.listParams = Object.assign(this.listParams,searchData)
      delete this.listParams.date
      this.getTableHeader(this.listParams.warehouse_id)
      this.getSkuPriceCalList(this.listParams)
      
    }
  },
  mounted(){
    this.getWarehouseList()
    this.confirmGridHeight()
  }
}
</script>
<style>
.ivu-tabs-nav-scrollable span{
  line-height:58px
}
</style>