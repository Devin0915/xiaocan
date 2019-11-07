<template>
    <div class="container">
       <div>
           <oneTime typename="店铺视图"></oneTime>
        </div>
        <div class="line">
            <Row>
                <iCol span="17">
                    <div class="line-one-left">
                        <Card class="line-one-left-card-title card-div" :bordered="false">
                            <div slot="title" class="one-left-title">
                                <Row>
                                    <iCol span="12" class="one-title-style">销售业绩</iCol>
                                    <iCol span="12" class="one-more-style">
                                        <div >more</div>
                                    </iCol>
                                </Row>
                            </div>
                            <div class="one-left-time">
                                <Row>
                                    <iCol span="12" class="time-time-style">{{dayTotal.country}}时间：{{dayTotal.today}}  <span class="t-t-span"> 当天：<span class="t-t-day">{{dayTotal.amount}}</span> {{dayTotal.sales}} 件</span></iCol>
                                    <iCol span="12" class="time-total-style">
                                        时间段：
                                        <CommonDatePicker :time="saleTime"  @Onchange="handleDatePickerOnChange"></CommonDatePicker>
                                        <span class="t-t-span">合计：<span class="t-t-day">{{total.total_amount}}</span> {{total.total_sales}} 件</span>
                                    </iCol>
                                </Row>
                            </div>
                            <div class="one-left-line" style="position: relative;">
                                <div id="myChart" :style="{ height: '400px'}"></div>
                                <div>
                                    <Spin size="large" fix v-if="spinShowLine"></Spin>
                                </div>
                            </div>
                        </Card>
                    </div>
                </iCol>
                <iCol span="7">
                    <div class="line-one-right">
                        <Card class="line-one-right-card-title card-div" :bordered="false">
                            <div slot="title" class="one-right-title">
                                <Row>
                                    <iCol span="12" class="one-title-style">消息中心</iCol>
                                    <iCol span="12" class="one-more-style">
                                        <div >more</div>
                                    </iCol>
                                </Row>
                            </div>    
                            <div class="one-right-context">
                                <div class="o-r-c-item" v-for="(item,index) in messageData" :key="index">
                                    <div class="o-r-item-left">{{item.context}}</div>
                                    <div class="o-r-item-right">
                                        <a :href="item.to"><span class="o-r-c-num">{{item.total}}</span></a> 个 </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </iCol>
            </Row>
        </div>   
        <div class="line">
            <Row>
                <iCol span="11">
                    <div class="line-two-left">
                        <Card class="line-two-left-card-title card-div-div" :bordered="false">
                            <div slot="title" class="two-left-title">
                                <Row>
                                    <iCol span="12" class="two-title-style">广告助手</iCol>
                                    <iCol span="12" class="two-more-style">
                                        <div >more</div>
                                    </iCol>
                                </Row>
                            </div>
                            <div class="ad-div">
                                <div class="ad-div-adbtn">Sponsored Ad</div>
                                <div class="ad-div-adtime">
                                     时间段：
                                     <CommonDatePicker :time="adTime"  @Onchange="handleDatePickerOnChangeAdTime"></CommonDatePicker>
                                </div>
                            </div>
                            <div class="ad-total-div">
                                <div class="ad-total-div-item"><span class="ad-total-div-span">广告花费：</span>{{adTotal.spend_total}}</div>
                                <div class="ad-total-div-item"><span class="ad-total-div-span">广告销售额：</span>{{adTotal.sales_total}}</div>
                            </div>
                            <div class="ad-total-div">
                                 <div class="ad-total-div-item"><span class="ad-total-div-span">Acos：</span>{{(adTotal.acos_total * 100).toFixed(2) }}%</div>
                                <div class="ad-total-div-item"><span class="ad-total-div-span">广告花费占比：</span>{{ (adTotal.sales_proportion_total  * 100).toFixed(2)}}%</div>
                            </div>
                            <div style="position: relative;">
                                <div id="adAssistantChart" :style="{ height: '400px'}"></div>
                                <div>
                                    <Spin size="large" fix v-if="spinShowLineAd"></Spin>
                                </div>
                            </div>
                        </Card>
                    </div>
                    
                </iCol>
                <iCol span="13">
                    <div class="line-two-right">
                        <Card class="line-two-right-card-title card-div-div" :bordered="false">
                            <div slot="title" class="two-right-title">
                                <Row>
                                    <div class="two-title-style">三级类目销售业绩</div>
                                </Row>
                            </div>    
                            <div class="one-right-context">
                                <Table border stripe 
                                height="550" 
                                :columns="CtColumns"
                                @on-sort-change="handleSortChange"
                                :data="CtData" :loading="CtLoading"></Table>
                            </div>
                        </Card>
                    </div>
                </iCol>
            </Row>
        </div>   
        <div class="line">
            <ShopViewTable></ShopViewTable>
        </div>      
    </div>
</template>
<script>
import CommonDatePicker from "@/components/util/common-datePicker";
import oneTime from '../../components/time/common-oneTime';
import { getSessionStorage ,formatDate } from "@/utils";
import ShopViewTable from "./shopViewsTable/index"
import { sales,msgCenter,getStartPeriods,sponsoredAdData,threeCategorySales,storeViewIndex } from '@/axios/dashboard'
export default {
    components:{
        oneTime,
        CommonDatePicker,
        ShopViewTable
    },
    data(){        
        return {
            spinShowLine:false,
            spinShowLineAd:false,
            shopCountry:"",
            shopTime:"",
            saleTime:[],
            adTime:[],
            threeActive:1,
            messageData: [
                {context:'正在进行中的Deal：',total:0,to:"/monitoring/deal" },
                {context:'销量下跌的ASIN：',total:0,to:"/commercial/shop_warn"},
                {context:'销量激增的ASIN：',total:0,to:"/commercial/shop_warn?tab=sales_surge"},
                {context:'类目变动ASIN：',total:0,to:"/commercial/shop_warn?tab=bsrpath_change"},
                {context:'排名下降的ASIN：',total:0,to:"/commercial/shop_warn?tab=ranking_change"},
                {context:'Acos异常的ASIN：',total:0,to:"/commercial/shop_warn?tab=acos_exception"},
                {context:'连续7天未出单的ASIN：',total:0,to:"/commercial/shop_warn?tab=sleep_asin"},
            ],
            salesChart:'',
            adAssistantChart:'',
            total:{
                total_sales:'0',
                total_amount:'0'
            },
            dayTotal:{
                today:'',
                country:'',
                amount:'',
                sales:''
            },
            adTotal:{
                acos_total:'0',
                sales_proportion_total:'0',
                sales_total:'0',
                spend_total:'0'
            },
            CtLoading:false,
            CtColumns: [
                {title: '三级类目名', key: 'three_category_name',width:150,},
                {title: '日销售额',key: 'day_amount',sortable:'custom',width:110,},
                {title: '本周累计销售额',key: 'week_amount',sortable:'custom',width:150,sortType:"desc"},
                {title: '周环比',key: 'week_percent',sortable:'custom',width:100,},
                {title: '上周销售额',key: 'prev_month_amount',sortable:'custom',width:130,},
                {title: '本月累计销售',key: 'month_amount',sortable:'custom',width:150,},
                {
                    key: "month_percent",
                    title: "月环比",
                    sortable: 'custom',
                    drageHeader:true,
                    width:150,
                    renderHeader: (h,params)=>{
                        return h('span',[
                        h('span','月环比'),
                            h('Tooltip',{
                                props:{
                                    content:'本月累计销售额和上月，同时段内销售额环比数据',
                                    placement:"top",
                                    transfer:true,
                                    maxWidth:150
                                },
                            })
                        ])
                    },
                    render:(h,params) => {
                        return h('span',params.row.month_percent)
                    },
                    
                },
            ],
            CtData: [],
        }
    },
    methods:{
        handleStoreViewIndex(){
            let params = {
                storeId:getSessionStorage('userInfo').store_id,
                country:getSessionStorage('userInfo').user_country,
                account:getSessionStorage('userInfo').user_account,
            }
            storeViewIndex(params).then(res => {
                let {data,code,msg} = res;
                if(code === 1){
                    this.dayTotal.today = data.today;
                    this.dayTotal.country = data.country;
                    this.dayTotal.amount = data.salesToday.amount;
                    this.dayTotal.sales = data.salesToday.sales;
                    const end = new Date(data.today)
                    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                    const start = new Date(data.today)
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    let a= this.$util.dateFormat(start).split(" ");
                    let b = this.$util.dateFormat(end).split(" ");
                    let c =  new Date(a[0].replace('-', '/'));
                    let d =  new Date(b[0].replace('-', '/'));
                    let start_date= formatDate(c)
                    let end_date= formatDate(d)
                    this.saleTime = [start_date,end_date];
                    this.getData(); // 销售业绩
                }
            })
        },
        handleSortChange({column, key, order}){
            let sortParams = {}
            if(order == "normal"){
                sortParams.order_column = '';
                sortParams.order_dir = '';
            }else{
                sortParams.order_column = key;
                sortParams.order_dir = order;
            }
            this.handleThreeCategorySponsoredAdData(sortParams)
        },
        
        handleThreeCategorySponsoredAdData(obj={order_column:'week_amount',order_dir:'desc'}){
            this.CtLoading = true;   
            let params = {
                storeId:getSessionStorage('userInfo').store_id,
                country:getSessionStorage('userInfo').user_country,
                account:getSessionStorage('userInfo').user_account,
            }
            let parObj = Object.assign({},params,obj)
            threeCategorySales(parObj).then(res =>{
                let {data,code,msg} = res;
                if(code === 1){
                    this.CtLoading = false; 
                    let {total,list} = data;
                    let arr = []
                    arr.push(total)
                    this.CtData = arr.concat(list); 
                } 
            });
        },
        // 获取广告助手时间区间
        async handleGetStartPeriods(){
            let params = {
                storeId:getSessionStorage('userInfo').store_id,
                country:getSessionStorage('userInfo').user_country,
            }
            getStartPeriods(params).then(res => {
                let {code,data} = res;
                if(code === 1)  this.adTime = [data.periods.start,data.periods.end]
                this.handleSponsoredAdData();
            })
        },
        handleDatePickerOnChange(value){
            if(Array.isArray(value) && value.length > 0){
                if((typeof value[0] !== 'undefined' && value[0] !== '' && value[0] !== null) && (typeof value[1] !== 'undefined' && value[1] !== '' && value[1] !== null)){
                    this.saleTime = value;
                    this.getData();
                }else{
                    this.$Message.error("请选择时间段！")
                }
            }
            
        },
        handleDatePickerOnChangeAdTime(value){
            if(Array.isArray(value) && value.length > 0){
                if((typeof value[0] !== 'undefined' && value[0] !== '' && value[0] !== null) && (typeof value[1] !== 'undefined' && value[1] !== '' && value[1] !== null)){
                    this.adTime = value;
                    this.handleSponsoredAdData();
                }else{
                    this.$Message.error("请选择时间段！")
                }
            }
        },
        async handleSponsoredAdData(){
            this.spinShowLineAd = true;
            let params = {
                start_date:this.$util.timeArr(this.adTime)[0],
                end_date:this.$util.timeArr(this.adTime)[1],
                storeId:getSessionStorage('userInfo').store_id,
                country:getSessionStorage('userInfo').user_country,
                account:getSessionStorage('userInfo').user_account,
                addata_type:'apa'
            }
            sponsoredAdData(params).then(res => {
                let { code, data,msg } = res;
                this.spinShowLineAd = false;
                if (code === 1) {
                    let {total,chartData} = data;
                    if (chartData.rows) {
                        this.updateAdAssistantView(chartData.rows);
                        this.adTotal.acos_total = total.acos_total
                        this.adTotal.sales_proportion_total = total.sales_proportion_total
                        this.adTotal.sales_total = total.sales_total
                        this.adTotal.spend_total = total.spend_total
                    }
                }
            })    
        },
        async handleMessageCenter(){
            let params = {
                storeId:getSessionStorage('userInfo').store_id,
                country:getSessionStorage('userInfo').user_country,
                account:getSessionStorage('userInfo').user_account,
            }
            msgCenter(params).then(res => {
                let {code, data,msg} = res;
                if(code === 1){
                    let {deal,bsrpathChange,acosException,keyword,sleepAsin,rankingChange,salesDown,salesSurge} = data.total;
                    this.messageData = [
                        {context:'正在进行中的Deal：',total:deal,to:"/monitoring/deal" },
                        {context:'销量下跌的ASIN：',total:salesDown,to:"/commercial/shop_warn"},
                        {context:'销量激增的ASIN：',total:salesSurge,to:"/commercial/shop_warn?tab=sales_surge"},
                        {context:'类目变动ASIN：',total:bsrpathChange,to:"/commercial/shop_warn?tab=bsrpath_change"},
                        {context:'排名下降的ASIN：',total:rankingChange,to:"/commercial/shop_warn?tab=ranking_change"},
                        {context:'Acos异常的ASIN：',total:acosException,to:"/commercial/shop_warn?tab=acos_exception"},
                        {context:'连续7天未出单的ASIN：',total:sleepAsin,to:"/commercial/shop_warn?tab=sleep_asin"},
                    ]
                }
                
            }).catch(e => {
                this.$Message.error('消息中心接口异常!')
            })
        },
        async getData() {
            this.spinShowLine= true;
            let params = {
                start_date:this.$util.timeArr(this.saleTime)[0],
                end_date:this.$util.timeArr(this.saleTime)[1],
                storeId:getSessionStorage('userInfo').store_id,
                country:getSessionStorage('userInfo').user_country,
                account:getSessionStorage('userInfo').user_account,
            }
            try {
                let { code, data,msg } = await sales(params);
                this.spinShowLine= false;
                if (code === 1) {
                    let {total,chartData} = data;
                    if (Array.isArray(chartData.rows) && chartData.rows.length > 0) {
                        this.drawLine(chartData.rows);
                    }
                    this.total.total_sales = total.totalSales;
                    this.total.total_amount = total.totalAmount;
                } else {
                    this.$message.error(msg);
                }
            } catch (error) {
                this.$message.error(error);
            }
        },
        drawLine(showData){
            // 基于准备好的dom，初始化echarts实例
            this.salesChart = this.$echarts.init(document.getElementById('myChart'))
            var option = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    },
                    extraCssText:'width:300px;height:90px',
                    formatter(params){
                        let originData = [];
                        showData.map(item => {
                            originData.push({amount:item.amountPer,sales:item.salesPer})
                        })
                        let str = '<span style="width:150px;display: inline-block;">'  + params[0].name + '</span> '+'<span  style="margin-right: 10%;display: inline-block;" >VS</span> ' + '上周同比';
                        params.forEach(item => {
                            str += '<br/>' + '<div style="display: inline-block;width:150px;">' + item.seriesName + '：' + item.value + '</div>'+' <span  style="margin-right: 10%;display: inline-block;" >VS</span> '
                            if(item.seriesName == '销售额'){    
                                str += originData[item.dataIndex].amount > 0 ? '<span style="color:red"> ↑ </span>' : '<span style="color:#40ca40">  ↓ </span> ' 
                                str += ( originData[item.dataIndex].amount * 100 ).toFixed(2) +'%'
                            }else{
                                str += originData[item.dataIndex].sales > 0 ? '<span style="color:red"> ↑ </span>' : '<span style="color:#40ca40"> ↓ </span> ' 
                                str += ( originData[item.dataIndex].sales * 100 ).toFixed(2)  +'%' 
                            }
                        })
                        return str;
                    },
                },
                legend: {
                    data: ['销售额', '件数'],
                    x: 'center',
                    y: 'bottom'
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: this.getKeyTransformArray(showData, 'local_at'),
                        axisLabel:{
                            show: true,
                            textStyle: {
                                color: '#BFBFBF',
                                fontFamily: 'Montserrat-Regular',
                            }
                        },
                        axisLine: {
                            show: true,  
                            lineStyle: {
                                color: '#F6F6F6'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        scale: 2,
                        max: this.getKeyTransformMax(showData, 'sales'),
                        position: 'left',
                        axisLabel:{
                            show: true,
                            textStyle: {
                                color: '#BFBFBF',
                                fontFamily: 'Montserrat-Bold',
                            }
                        },
                        axisLine: {
                            show: true,  
                            lineStyle: {
                                color: '#F6F6F6'
                            }
                        }
                    },
                    {
                        type: 'value',
                        position: 'right',
                        splitLine: {
                            show: false
                        },
                        axisLabel:{
                            show: true,
                            textStyle: {
                                color: '#BFBFBF',
                                fontFamily: 'Montserrat-Bold',
                            }
                        },
                        axisLine: {
                            show: true,  
                            lineStyle: {
                                color: '#F6F6F6'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '销售额',
                        type: 'line',
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: '#FB96EA'
                            }
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#FB96EA' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#FB96EA' // 100% 处的颜色
                                },{
                                    offset: 1, color: '#fff' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        data: this.getKeyTransformArray(showData, 'amount')
                    },
                    {
                        name: '件数',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: '#FFD037'
                            }
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#FFD037' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#FFD037' // 100% 处的颜色
                                },{
                                    offset: 1, color: '#fff' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        data: this.getKeyTransformArray(showData, 'sales')
                    }
                ]
            };
            this.salesChart.clear();
            this.salesChart.setOption(option);
        },
        updateAdAssistantView(data){
            this.adAssistantChart = this.$echarts.init(document.getElementById('adAssistantChart'))
            let option = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    },
                    formatter(params){
                        let str = '日期：' + params[0].name + '<br/>';
                        params.forEach(item => {
                            if(item.seriesName === "Acos" || item.seriesName === "广告花费占比"){
                                str += item.seriesName + '：' + (item.value*100).toFixed(2)+ "%" +'<br/>'
                            }else{
                                str += item.seriesName + '：' + item.value +'<br/>'
                            }
                        })
                        return str
                    }
                },
                grid: {
                    left: '2%',
                    right: '2%',
                    top: '10%',
                    bottom: '10%',
                    containLabel: true
                },
                legend: {
                    data: ['广告花费', '广告销售额', 'Acos', '广告花费占比'],
                    x: 'center',
                    y: 'bottom'
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: this.getKeyTransformArray(data, 'local_at'),
                        axisLabel:{
                            show: true,
                            textStyle: {
                                color: '#BFBFBF',
                                fontFamily: 'Montserrat-Regular',
                            }
                        },
                        axisLine: {
                            show: true,  
                            lineStyle: {
                                color: '#F6F6F6'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        position: 'left',
                        axisLabel:{
                            show: true,
                            textStyle: {
                                color: '#BFBFBF',
                                fontFamily: 'Montserrat-Bold',
                            }
                        },
                        axisLine: {
                            show: true,  
                            lineStyle: {
                                color: '#F6F6F6'
                            }
                        }
                    },
                    {
                        type: 'value',
                        splitNumber: 10,
                        position: 'right',
                        axisLabel: {
                            formatter: function (value) {
                                return (value*100).toFixed(0) + ' %'
                            },
                            textStyle: {
                                color: '#BFBFBF',
                                fontFamily: 'Montserrat-Bold',
                            }
                        },
                        axisLine: {
                            show: true,  
                            lineStyle: {
                                color: '#F6F6F6'
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: '广告花费',
                        type: 'bar',
                        barGap: '5%',// 柱子的间距, 默认30%
                        barCategoryGap: '33.3%',
                        itemStyle: {
                            normal: {
                                color: '#7AA2FF'
                            }
                        },
                        data: this.getKeyTransformArray(data, 'spend')
                    },
                    {
                        name: '广告销售额',
                        type: 'bar',
                        barGap: '5%',
                        barCategoryGap: '33.3%',
                        itemStyle: {
                            normal: {
                                color: '#FB96EA'
                            }
                        },
                        data: this.getKeyTransformArray(data, 'sales')
                    },
                    {
                        name: 'Acos',
                        type: 'line',
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: '#e0744f'
                            }
                        },
                        data: this.getKeyTransformArray(data, 'acos')
                    },
                    {
                        name: '广告花费占比',
                        type: 'line',
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: '#ffd037'
                            }
                        },
                        data: this.getKeyTransformArray(data, 'sales_proportion')
                    }
                ]
            };
            this.adAssistantChart.clear();
            this.adAssistantChart.setOption(option);
        },
        getKeyTransformMax(obj, key){
            let arr = []
            Object.keys(obj).map((item,index)=>{
                arr.push(obj[item][key] == null ? 0 : obj[item][key])
            })
            let max = Math.max.apply(null, arr);
            let maxVal = (max * 1.6).toFixed(0);
            return maxVal;
        },
        getKeyTransformArray (obj, key) {
            let arr = []
            Object.keys(obj).map((item,index)=>{
                arr.push(obj[item][key] == null ? 0 : obj[item][key])
            })
            return arr;
        },
        async init() {
            this.handleStoreViewIndex();
            this.handleMessageCenter(); // 消息中心
            this.handleGetStartPeriods();
            this.handleThreeCategorySponsoredAdData();
        }
    },
    created(){
        let self = this
        if(typeof getSessionStorage('userInfo') == 'undefined' || getSessionStorage('userInfo') == '' || getSessionStorage('userInfo') == null){
            setTimeout(function(){
                self.shopCountry = getSessionStorage('userInfo').user_country;
                self.shopTime = getSessionStorage('userInfo').locaTime.split('：');
                self.init();
            },1500);
              
        }else{
            self.shopCountry = getSessionStorage('userInfo').user_country;
            self.shopTime = getSessionStorage('userInfo').locaTime.split('：');
            self.init();
        }
      
    }
   
}
</script>
<style lang="scss" scoped>
.card-div{
    height: 580px;
}
.card-div-div{
    height: 680px;
}
.container{
    padding: 10px 0px 10px 10px !important;
    .line{
        margin-top: 4%;
        .line-one-left{
            width: 98%;
            .line-one-left-card-title{
                padding: 0px 20px;
                .one-left-title{
                    .one-title-style{
                        font-family: 'Source Han Sans CN';
                        font-size: 18px;
                        color: #333;
                        height: 34px;
                        line-height: 34px;
                    }
                    .one-more-style{
                        text-align: right;
                        div{
                            border: 2px solid #BFBFBF;
                            color: #BFBFBF;
                            font-size: 14px;
                            width: 70px;
                            background-color: #FFFFFF;
                            line-height: 30px;
                            display: inline-block;
                            text-align: center;
                            border-radius: 4.4rem;
                            margin-left: 10px;
                            font-family: 'Source Han Sans CN';
                        }
                    }
                }                
                .one-left-time{
                    .time-time-style{
                        font-family: 'Source Han Sans CN';
                        color: #BFBFBF;
                        font-size: 16px;
                        height: 32px;
                        line-height: 32px;
                        .t-t-span{
                            margin-left: 2%;
                            font-family: 'Montserrat-Bold'
                        }
                        .t-t-day{
                            color: #9A96FB;
                            margin-right: 3%;
                        }
                    }
                    .time-total-style{
                        font-family: 'Source Han Sans CN';
                        color: #BFBFBF;
                        font-size: 16px;
                        /deep/ .ivu-select-dropdown{
                            font-size: 12px;
                        }
                        .t-t-span{
                            margin-left: 2%;
                            font-family: 'Montserrat-Bold'
                        }
                        .t-t-day{
                            color: #9A96FB;
                            margin-right: 3%;
                        }
                        /deep/ .ivu-date-picker{
                            width: 225px;
                        }
                        /deep/ .ivu-input{
                            font-family: 'Montserrat-Regular';
                            color: #7AA2FF;
                            font-size: 16px;
                        }
                    }
                }
                .one-left-line{
                    width: 100%;
                }
            }
        }
        .line-one-right{
            width: 98%;
            .line-one-right-card-title{
                padding: 0px 20px;
                .one-right-title{
                    .one-title-style{
                        font-family: 'Source Han Sans CN';
                        font-size: 18px;
                        color: #333;
                        height: 34px;
                        line-height: 34px;
                    }
                    .one-more-style{
                        text-align: right;
                        div{
                            border: 2px solid #7AA2FF;
                            color: #fff;
                            font-size: 14px;
                            width: 70px;
                            background-color: #7AA2FF;
                            line-height: 30px;
                            display: inline-block;
                            text-align: center;
                            border-radius: 4.4rem;
                            margin-left: 10px;
                            font-family: 'Source Han Sans CN';
                        }
                    }
                }  
                .one-right-context{
                    color: #888888;
                    font-size: 14px;
                    font-family: 'Source Han Sans CN';
                    
                    .o-r-c-item{
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        height: 40px;
                        .o-r-item-left{
                            width: 50%;
                            text-align: right;
                        }
                        .o-r-item-right{
                            width: 50%;
                            .o-r-c-num{
                                vertical-align: middle;
                                font-family: 'Montserrat-Bold';
                                font-size: 24px;
                                text-align: center;
                                display: inline-block;
                                width: 100px;
                                color: #FF8484;
                            }
                        }
                        
                    }
                    
                }  
            }
        }
        .line-two-left{
            width: 98%;
            .line-two-left-card-title{
                padding: 0px 20px;
                .two-left-title{
                    .two-title-style{
                        font-family: 'Source Han Sans CN';
                        font-size: 18px;
                        color: #333;
                        height: 34px;
                        line-height: 34px;
                    }
                    .two-more-style{
                        text-align: right;
                        div{
                            border: 2px solid #BFBFBF;
                            color: #BFBFBF;
                            font-size: 14px;
                            width: 70px;
                            background-color: #FFFFFF;
                            line-height: 30px;
                            display: inline-block;
                            text-align: center;
                            border-radius: 4.4rem;
                            margin-left: 10px;
                            font-family: 'Source Han Sans CN';
                        }
                    }
                } 
            }
            /deep/ .ivu-card-head{
                 border-bottom: 0px solid #e8eaec;
            }
        }
        .line-two-right{
            width: 98%;
            .line-two-right-card-title{
                padding: 0px 20px;
                .two-right-title{
                    .two-title-style{
                        font-family: 'Source Han Sans CN';
                        font-size: 18px;
                        color: #333;
                        height: 34px;
                        line-height: 34px;
                    }
                } 
            }
            /deep/ .ivu-card-head{
                border-bottom: 0px solid #e8eaec;
            }
        }
        .line-three-div{
            display: flex;
            flex-direction: row;
            .line-three-item{
                background: #FFFFFF;
                padding: 1% 3%;
                font-size: 16px;
                color: #888888;
                margin-right: 1%;
                cursor: default;
            }
            .threeActive{
                background: #9A96FB;
                color: #fff;
                padding: 1% 3%;
                font-size: 16px;
                margin-right: 1%;
                cursor: default;    
            }
        }
        .lin-three-table{
            margin-top: 2%;
            background: #fff;
            align-items: center;
        }
        .ad-div{
            background: #F6F6F6;
            height: 60px;
            display: flex;
            align-items: center;
            .ad-div-adbtn{
                 background: #9A96FB;
                height: 40px;
                width: 150px;
                text-align: center;
                line-height: 40px;
                color: #fff;
                font-size: 14px;
                border-radius: 4.4rem;
                margin-left: 3%;
                font-family: 'Source Han Sans CN';
            }
            .ad-div-adtime{
                color: #BFBFBF;
                font-size: 16px;
                margin-left: 15%;
                /deep/ .ivu-date-picker{
                    width: 250px;
                }
                /deep/ .ivu-input{
                    font-family: 'Montserrat-Regular';
                    color: #7AA2FF;
                    font-size: 16px;
                    font-family: 'Source Han Sans CN';
                }
            }
        }
        .ad-total-div{
            height: 40px;
            display: flex;
            align-items: center;
            .ad-total-div-item{
                margin-right: 5%;
                width: 50%;
                color: #9A96FB;
                font-size: 20px;
                font-family: 'Montserrat-Bold';
                .ad-total-div-span{
                    color: #A5A5A5;
                    font-size: 16px;
                }

            }
        }
    }
}
@media (min-width:1024px) and (max-width:1366px) {
    .ad-div-adbtn{
        font-size: 12px !important;
        height: 30px !important;
        line-height: 30px !important;
        width: 100px !important;
    }
    .ad-div-adtime{
        font-size: 12px !important;
    }
    .ad-total-div-item{
        font-size: 14px !important;
    }
    .ad-total-div-span{
        font-size: 14px !important;
    }
    .one-title-style{
        font-size: 16px !important;
        height: 29px !important;
        line-height: 29px !important;
    }
    .one-more-style{
        text-align: right;
        div{
            line-height: 25px !important;
        }
    }
    .two-title-style{
        font-size: 16px !important;
        height: 29px !important;
        line-height: 29px !important;
    }
    .two-more-style{
        text-align: right;
        div{
            line-height: 25px !important;
        }
    }
    .time-time-style{
        font-size: 12px !important;
       
    }
    .time-total-style{
        font-size: 12px !important;
    }
    .line-one-left-card-title{
        padding: 0px 10px !important;
    }
    /deep/ .ivu-card-head{
        padding: 14px 0px !important;
    }
    /deep/ .ivu-card-body{
        padding: 16px 0px !important;
    }
    /deep/ .ivu-date-picker{
        width: 190px !important;
    }
    /deep/ .ivu-input{
        font-size: 12px !important;
    }
    .o-r-c-num{
        font-size: 18px !important;
    }
}
</style>