<template>
    <div class="container">
        <div><Times typename="店铺报表"></Times></div>
        <div class="container-wrapper">
            <Tabs v-model="tabActive">
                <TabPane v-for="(item,index) in tabs" :key="'tab-pane-'+index" :name="item.key" :label="item.label">
                    <BuTable 
                            :data="item.url" 
                            :search="dataModel" 
                            :visible="tabActive == item.key" 
                            :tableColumns="item.cloumns" 
                            :tab="item.search.tab" 
                            :activeName="tabActive">
                        <Search :model="dataModel" :type="item.key" :tab="item.search.tab"></Search>
                    </BuTable>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
import Times from '../../../components/time/common-times';
import Search from './component/search';
import BuTable from './component/shop-table';
export default {
    components:{
        Times,
        Search,
        BuTable
    },
    data(){
        return {
            tabActive:'shop',
            tabs:[
                {
                    label: '店铺历史数据', 
                    key: 'shop', 
                    cloumns:[
                       {
                            key: "department_name",
                            title: "事业部",
                            fixed: "left",
                            align: "left",
                            minWidth: 100,
                            render: (h, params) => {
                                return h(
                                "span",
                                {},
                                params.row.department_name == "summary"
                                    ? "汇总"
                                    : params.row.department_name
                                );
                            }
                        },
                        {
                            key: "account",
                            title: "账号",
                            align: "left",
                            width: "100",
                            fixed: "left",
                            render: (h, params) => {
                                return h(
                                "span",
                                {},
                                params.row.department_name == "summary" ? "" : params.row.account
                                );
                            }
                        },
                        {
                            key: "country",
                            title: "国家",
                            fixed: "left",
                            width: "100",
                            render: (h, params) => {
                                return h(
                                "span",
                                {},
                                params.row.department_name == "summary" ? "" : params.row.country
                                );
                            }
                        },
                        {
                            key: "md-grid",
                            title: "天数据",
                            align: "left",
                            fixed: "left",
                            minWidth: 100,
                            render: (h, params) => {
                                return h("a", [
                                h("Icon", {
                                    props: {
                                    type: "ios-list-box",
                                    size: 24
                                    },
                                    style: {
                                    color: "#3a8ee6"
                                    },
                                    on: {
                                    click: () => {
                                        this.handleShowModalTable(params.row);
                                    }
                                    }
                                })
                                ]);
                            }
                        },
                        {
                            key: "total_sales",
                            title: "销售件数",
                            minWidth: 130,
                            align: "left",
                            filters: [
                                {
                                label: "Greater than 5000",
                                value: 1
                                },
                                {
                                label: "Less than 5000",
                                value: 2
                                }
                            ],
                            filterMultiple: false,
                            filterMethod(value, row) {
                                if (value === 1) {
                                return row.total_sales > 5000;
                                } else if (value === 2) {
                                return row.total_sales < 5000;
                                }
                            },
                            render: (h, params) => {
                                let that = this;
                                return h(
                                "span",
                                {
                                    style: {
                                    cursor: "pointer"
                                    },
                                    on: {
                                    click() {
                                        that.handleShowEcharts("total_sales", params.row);
                                    }
                                    }
                                },
                                params.row.total_sales
                                );
                            }
                        },
                        {
                            key: "total_orders",
                            title: "订单数",
                            minWidth: 100,
                            align: "left",
                            render: (h, params) => {
                                let that = this;
                                return h(
                                "span",
                                {
                                    style: {
                                    cursor: "pointer"
                                    },
                                    on: {
                                    click() {
                                        that.handleShowEcharts("total_orders", params.row);
                                    }
                                    }
                                },
                                params.row.total_orders
                                );
                            }
                        },
                        {
                            key: "total_amount",
                            title: "销售额（$）",
                            sortable: true,
                            minWidth: 120,
                            align: "left",
                            render: (h, params) => {
                                let that = this;
                                return h(
                                "span",
                                {
                                    style: {
                                    cursor: "pointer"
                                    },
                                    on: {
                                    click() {
                                        that.handleShowEcharts("total_amount", params.row);
                                    }
                                    }
                                },
                                params.row.total_amount
                                );
                            }
                        },
                        {
                            key: "discount_amount",
                            title: "折扣（$）/折扣率",
                            sortable: true,
                            align: "left",
                            minWidth: 150,
                            render: (h, params) => {
                                let that = this;
                                return h(
                                "span",
                                {
                                    style: {
                                    cursor: "pointer"
                                    },
                                    on: {
                                    click() {
                                        that.handleShowEcharts("discount_rate", params.row);
                                    }
                                    }
                                },
                                params.row.discount_amount + " / " + params.row.discount_rate
                                );
                            }
                        },
                        {
                            key: "sales_share",
                            title: "销售额占比",
                            sortable: true,
                            minWidth: 120,
                            align: "left",
                            render: (h, params) => {
                                let that = this;
                                return h(
                                "span",
                                {
                                    style: {
                                    cursor: "pointer"
                                    },
                                    on: {
                                    click() {
                                        that.handleShowEcharts("sales_share", params.row);
                                    }
                                    }
                                },
                                params.row.sales_share
                                );
                            }
                        },
                        {
                            key: "total_sessions",
                            title: "Session",
                            minWidth: 150,
                            sortable: true,
                            align: "left",
                            renderHeader: (h,params)=>{
                                return h('span',[
                                h('span','Session'),
                                h('Tooltip',{
                                    props:{
                                        content:'数据来源于上传到ERP的业务报告',
                                        placement:"top",
                                        transfer:true
                                    },
                                },[
                                        h('Icon',{
                                            props:{
                                                type:"md-alert",
                                                size:'16',
                                                transfer:true
                                            },
                                            style:{
                                                marginTop:'-3px'
                                            }
                                        })
                                    ])
                                ])
                            },
                            render: (h, params) => {
                                let that = this;
                                return h(
                                "span",
                                {
                                    style: {
                                    cursor: "pointer"
                                    },
                                    on: {
                                    click() {
                                        that.handleShowEcharts("date_sessions", params.row);
                                    }
                                    }
                                },
                                params.row.business_name == "summary"
                                    ? params.row.total_sessions
                                    : params.row.date_sessions
                                );
                            }
                        },
                        {
                            key: "percent_rate",
                            title: "转化率",
                            sortable: true,
                            minWidth: 120,
                            align: "left",
                            render: (h, params) => {
                                let that = this;
                                return h(
                                "span",
                                {
                                    style: {
                                    cursor: "pointer"
                                    },
                                    on: {
                                    click() {
                                        that.handleShowEcharts("conversion_rate", params.row);
                                    }
                                    }
                                },
                                params.row.business_name == "summary"
                                    ? params.row.percent_rate
                                    : params.row.conversion_val
                                );
                            }
                        }
                    ],
                    search: {
                        tab:1
                    },  
                    url: ''
                },
                {
                    label: 'ASIN历史数据', 
                    key: 'asin', 
                    search: {
                        tab:2
                    }, 
                    url: '',
                    cloumns:[
                         {
                            key: "department_name",
                            title: "事业部",
                            fixed: "left",
                            align: "left",
                            width: "110",
                            render: (h, params) => {
                                return h(
                                "span",
                                {},
                                params.row.department_name == "summary"
                                    ? "汇总"
                                    : params.row.department_name
                                );
                            }
                        },
                        {
                            key: "store_name",
                            title: "店铺",
                            align: "left",
                            fixed: "left",
                            width: "80",
                            render: (h, params) => {
                                return h(
                                "span",
                                {},
                                params.row.store_name == "-" ? "" : params.row.store_name
                                );
                            }
                        },
                        {
                            key: "img",
                            title: "主图",
                            fixed: "left",
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
                            key: "asin",
                            title: "ASIN/SKU",
                            align: "center",
                            width: "250",
                            fixed: "left",
                            ellipsis: true,
                            tooltip: true,
                            render: (h, params) => {
                                return h("span", {}, [
                                h(
                                    "div",
                                    {
                                    style: {
                                        color: "#3a8ee6",
                                        cursor: "pointer"
                                    },
                                    on: {
                                        click: () => {
                                        this.handleASINClick(params.row);
                                        }
                                    }
                                    },
                                    params.row.asin == "-" ? "" : params.row.asin
                                ),
                                h("div", params.row.sku == "-" ? "" : params.row.sku)
                                ]);
                            }
                        },
                        {
                            key: "md-grid",
                            title: "天数据",
                            align: "left",
                            fixed: "left",
                            minWidth: 100,
                            render: (h, params) => {
                                return h("a", [
                                h("Icon", {
                                    props: {
                                    type: "ios-list-box",
                                    size: 24
                                    },
                                    style: {
                                    color: "#3a8ee6"
                                    },
                                    on: {
                                    click: () => {
                                        this.handleShowModalTable(params.row);
                                    }
                                    }
                                })
                                ]);
                            }
                        },
                        {
                            key: "total_sales",
                            title: "销售件数",
                            minWidth: 130,
                            align: "left",
                            filters: [
                                {
                                label: "Greater than 5000",
                                value: 1
                                },
                                {
                                label: "Less than 5000",
                                value: 2
                                }
                            ],
                            filterMultiple: false,
                            filterMethod(value, row) {
                                if (value === 1) {
                                return row.total_sales > 5000;
                                } else if (value === 2) {
                                return row.total_sales < 5000;
                                }
                            },
                            render: (h, params) => {
                                let that = this;
                                return h(
                                "span",
                                {
                                    style: {
                                    cursor: "pointer"
                                    },
                                    on: {
                                    click() {
                                        that.handleShowEcharts("total_sales", params.row);
                                    }
                                    }
                                },
                                params.row.total_sales
                                );
                            }
                        },
                        {
                            key: "total_orders",
                            title: "订单数",
                            minWidth: 100,
                            align: "left",
                            render: (h, params) => {
                                let that = this;
                                return h(
                                "span",
                                {
                                    style: {
                                    cursor: "pointer"
                                    },
                                    on: {
                                    click() {
                                        that.handleShowEcharts("total_orders", params.row);
                                    }
                                    }
                                },
                                params.row.total_orders
                                );
                            }
                        },
                        {
                            key: "total_amount",
                            title: "销售额（$）",
                            sortable: true,
                            minWidth: 120,
                            align: "left",
                            render: (h, params) => {
                                let that = this;
                                return h(
                                "span",
                                {
                                    style: {
                                    cursor: "pointer"
                                    },
                                    on: {
                                    click() {
                                        that.handleShowEcharts("total_amount", params.row);
                                    }
                                    }
                                },
                                params.row.total_amount
                                );
                            }
                        },
                        {
                            key: "discount_amount",
                            title: "折扣（$）/折扣率",
                            sortable: true,
                            align: "left",
                            minWidth: 150,
                            render: (h, params) => {
                                let that = this;
                                return h(
                                "span",
                                {
                                    style: {
                                    cursor: "pointer"
                                    },
                                    on: {
                                    click() {
                                        that.handleShowEcharts("discount_rate", params.row);
                                    }
                                    }
                                },
                                params.row.discount_amount + " / " + params.row.discount_rate
                                );
                            }
                        },
                        {
                            key: "sales_share",
                            title: "销售额占比",
                            sortable: true,
                            minWidth: 120,
                            align: "left",
                            render: (h, params) => {
                                let that = this;
                                return h(
                                "span",
                                {
                                    style: {
                                    cursor: "pointer"
                                    },
                                    on: {
                                    click() {
                                        that.handleShowEcharts("sales_share", params.row);
                                    }
                                    }
                                },
                                params.row.sales_share
                                );
                            }
                        },
                        {
                            key: "total_sessions",
                            title: "Session",
                            minWidth: 150,
                            sortable: true,
                            align: "left",
                            renderHeader: (h,params)=>{
                                return h('span',[
                                h('span','Session'),
                                h('Tooltip',{
                                    props:{
                                        content:'数据来源于上传到ERP的业务报告',
                                        placement:"top",
                                        transfer:true
                                    },
                                },[
                                        h('Icon',{
                                            props:{
                                                type:"md-alert",
                                                size:'16',
                                                
                                            },
                                            style:{
                                                marginTop:'-3px'
                                            }
                                        })
                                    ])
                                ])
                            },
                            render: (h, params) => {
                                let that = this;
                                return h(
                                "span",
                                {
                                    style: {
                                    cursor: "pointer"
                                    },
                                    on: {
                                    click() {
                                        that.handleShowEcharts("date_sessions", params.row);
                                    }
                                    }
                                },
                                params.row.business_name == "summary"
                                    ? params.row.total_sessions
                                    : params.row.date_sessions
                                );
                            }
                        },
                        {
                            key: "percent_rate",
                            title: "转化率",
                            sortable: true,
                            minWidth: 120,
                            align: "left",
                            render: (h, params) => {
                                let that = this;
                                return h(
                                "span",
                                {
                                    style: {
                                    cursor: "pointer"
                                    },
                                    on: {
                                    click() {
                                        that.handleShowEcharts("conversion_rate", params.row);
                                    }
                                    }
                                },
                                params.row.business_name == "summary"
                                    ? params.row.percent_rate
                                    : params.row.conversion_val
                                );
                            }
                        }
                    ]
                },
            ],
            dataModel:{
                asin:''
            },
        }
    },
    methods: {
        handleShowEcharts(){}
    },
}
</script>
<style lang="scss" scoped>
    .container-wrapper{
        margin-top: 2%;
    }
</style>