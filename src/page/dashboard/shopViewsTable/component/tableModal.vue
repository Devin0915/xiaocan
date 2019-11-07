<template>
    <Modal
        v-model="filterVisible"
        :title="'产品详情 ' + row.asin"
        width="1000px"
        :footer-hide="true"
        :mask-closable="true"
    >       
        <Row class="time-class">
            <Row class="t-c-left">
                <CommonDatePicker :time="timeModel" @Onchange="handleDatePickerOnChange"></CommonDatePicker>
            </Row>
            <Row class="t-c-right">
                <Button type="primary" @click="handleExportSingleFba">导 出</Button>
            </Row>
        </Row>
        
        <Table border 
        :columns="columns" 
        :data="dataTable" 
        :loading="tableLoading"
         height="350"></Table>
        <Row style="margin: 10px 0px;">  
            共计：{{total}} 条
        </Row>
    </Modal>
</template>
<script>
import axios from '@/axios/config'
import qs from 'qs'
import CommonTable from '@/components/shard/common-table'
import { jsonToQueryString } from "@/utils";
import CommonDatePicker from "@/components/util/common-datePicker";
import { getToken } from "@/utils/auth";
export default {
    components:{
        CommonTable,
        CommonDatePicker
    },
    props:{
        row: {
            type: Object,
            default: () => {
                return {};
            }
        },
        visible: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            filterVisible:this.visible,
            columns:[
                {title: '日期', key: 'local_at',align: 'center',width: 100,sortable:true},
                {title: '订单数', key: 'orders',align: 'center',width: 100,sortable:true,},
                {title: '件数', key: 'sales',align: 'center',width: 100,sortable:true},
                {title: '销售额', key: 'asin_amount',align: 'center',width: 100,sortable:true,
                 render: (h, params) => {
                        return h("span", params.row.currency + " "+ params.row.asin_amount);
                    }
                },
                {title: '流量', key: 'sessions',align: 'center',width: 100,sortable:true},
                {title: '转化率', key: 'cvr',align: 'center',width: 100,sortable:true,
                    render: (h, params) => {
                        let cvr = params.row.cvr + '%'
                        if(params.row.cvr == '--'){
                            cvr = params.row.cvr
                        }
                        return h("span", cvr);
                    }
                },
                {title: 'Buybox', key: 'buy_box',align: 'center',width: 100,sortable:true,
                    render: (h, params) => {
                        return h("span", params.row.buy_box +"%");
                    }
                },
                {title: '可售库存', key: 'fulfillable',align: 'center',width: 100,sortable:true},
                {title: '在途库存', key: 'inbound',align: 'center',width: 100,sortable:true},
                {title: '转仓中库存', key: 'reserved',align: 'center',width: 120},
                {title: '价格', key: 'price',align: 'center',width: 150,
                    render: (h, params) => {
                        return h("span", params.row.currency + " "+ params.row.price);
                    }
                },
                {title: '评分', key: 'stars',align: 'center',width: 100},
                {title: '新增评论', key: 'new_comments',align: 'center',width: 130,sortable:true,},
            ],
            total:0,
            dataTable:[],
            timeModel:this.$util.transitionTimeArr(),
            tableLoading:false,
            sortParams:{
                order_column:'',
                order_dir:''
            }
        }
    },
    watch: {
        filterVisible(val) {            
            this.$emit("update:visible", val);
        },
        visible(val) {
            this.filterVisible = val;
        },
    },
    created() {
        this.handleSearch()
    },
    methods:{
        handleDatePickerOnChange(value){
            this.timeModel= value;
            this.handleSearch();            
        },
        handleSortChange({column, key, order}) {
            if(order == 'normal'){
                this.sortParams.order_column = '';
                this.sortParams.order_dir = '';
                this.handleSearch(this.sortParams);
            }else{
                this.sortParams.order_column = key;
                this.sortParams.order_dir = order;
                this.handleSearch(this.sortParams);
            }
        },
        handleExportSingleFba() {
            let params = {
                account: this.row.account,
                country: this.row.country,
                storeId: this.row.store_id,
                asin: this.row.asin,
                start_date:this.$util.timeArr(this.timeModel)[0],
                end_date:this.$util.timeArr(this.timeModel)[1],
                token:getToken()
            }
         
            var query = jsonToQueryString(params);
            location.href = this.$rootApi + "/api/dashBoard/storeView/exportAsinHistoryDaily" + query;
        },
        handleSearch(obj) {
            let params = Object.assign({},obj);            
            params.account = this.row.account,
            params.country = this.row.country,
            params.storeId = this.row.store_id,
            params.asin = this.row.asin,
            params.start_date =this.$util.timeArr(this.timeModel)[0],
            params.end_date = this.$util.timeArr(this.timeModel)[1],
            params.token = getToken()
            this.tableLoading = true
            axios.post(this.$rootApi + '/api/dashBoard/storeView/getAsinHistoryDaily',params).then(res => {
                let {data,code,msg} = res
                if(code === 1) {
                    this.tableLoading = false;
                    let {list} = data;
                    this.dataTable = list;
                    this.total = list.length;
                }else{
                    this.$Message.error(msg);
                }
            })
        },
    }
    
}
</script>
<style lang="less" scoped>
    .time-class{
        display: flex;
        flex-direction: row;
        margin-bottom: 5px;
        .t-c-left{
            width:50%;
            text-align:left;
        }
        .t-c-right{
            width:50%;
            text-align:right;
        }
    }
</style>


