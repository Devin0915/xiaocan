<template>
    <Modal
        v-model="filterVisible"
        title="趋势图"
        width="1000px"
        :footer-hide="true"
        :mask-closable="true"
    >       
        <Row>
             <div id="priceChart" :style="{ height: '400px'}"></div>
             <Spin size="large" fix v-if="spinShow"></Spin>
        </Row>
    </Modal>
</template>
<script>
import axios from '@/axios/config'
import { jsonToQueryString } from "@/utils";
import { getToken } from "@/utils/auth";
export default {
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
        type:{
            type:String,
            default:''
        },
        typeName:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            filterVisible:this.visible,
            tableLoading:false,
            priceChart:"",
            spinShow:false,
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
        handleSearch() {
            let params = {
                account:this.row.account,
                country:this.row.country,
                storeId:this.row.store_id,
                price:this.row.price,
                score:this.row.score,
                asin:this.row.asin,
                type:this.type,
                token:getToken()
            };  
            this.spinShow = true;
            axios.post(this.$rootApi + '/api/dashBoard/storeView/getScorePriceChange',params).then(res => {
                let {data,code,msg} = res
                this.spinShow = false;
                if(code === 1) {
                    let {rows} = data.chartData;
                    this.hanleEchart(rows)
                }else{
                    this.$Message.error(msg);
                }
            })
        },
        getKeyTransformArray (obj, key) {
            let arr = []
            Object.keys(obj).map((item,index)=>{
                arr.push(obj[item][key] == null ? 0 : obj[item][key])
            })
            return arr;
        },
        hanleEchart(rows){
            this.priceChart = this.$echarts.init(document.getElementById('priceChart'))
            let option = {                
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: [this.typeName],
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: this.getKeyTransformArray(rows, 'local_at'),
                        axisLabel:{
                            show: true,
                            textStyle: {
                                color: '#999',
                                fontFamily: 'Montserrat-Regular',
                            }
                        },
                        axisLine: {
                            show: true,  
                            lineStyle: {
                                color:  '#F6F6F6'
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
                                color: '#999',
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
                ],
                series: [
                    {
                        name: this.typeName,
                        type:'line',
                        data:this.getKeyTransformArray(rows, this.type),
                        itemStyle: {
                            normal: {
                                color: this.type == 'price' ? '#FB96EA' : '#FFD037'
                            }
                        },
                    },  
                ]
            };
            this.priceChart.clear();
            this.priceChart.setOption(option);
        },
    }
    
}
</script>
<style lang="less" scoped>

</style>


