<template>
    <Modal v-model="filterVisible" title="数据折线图" :footer-hide="true" width="900px">
        <Row class="echarts-tabs">
            <Tabs :value="activeName" @on-click="handleOnClick">
                <TabPane v-for="(item,index) in modalVChartsTable.tabPaneData"
                        :key="index"
                        :label="item.label"
                        :name="item.name" />
            </Tabs>
            <Row class="echarts-row">
                <ve-line :chart-data="echartsDataObject" :chart-type="activeName"></ve-line>
            </Row>
        </Row>
    </Modal>
</template>

<script>
    import VeLine from './ModalVeLine'
    export default {
        name: "ModalTable",
        components:{
            VeLine
        },
        props:{
            visible:{
                type:Boolean,
                default:function() {
                    return false
                }
            },
            type:{
                type:String,
                default:function() {
                    return 'total_sales'
                }
            },
            modalVChartsTable:{
                type:Object,
                default:function() {
                    return {}
                }
            }
        },
        data() {
            return {
                filterVisible:this.visible,
                activeName:this.type,
                echartsDataObject:{
                    time:this.modalVChartsTable.echartsData['local_at'],
                    data:this.modalVChartsTable.echartsData[this.type]
                }
            }
        },
        watch:{
            filterVisible(val){
                this.$emit('update:visible',val)
            },
            visible(val){
                this.filterVisible = val
            },
            type(val) {
                this.activeName = val
            },
        },
        methods:{
            handleOnClick(name) {
                this.activeName  = name;
                let newValue = {
                    time:this.modalVChartsTable.echartsData['local_at'],
                    data:this.modalVChartsTable.echartsData[this.activeName]
                }
                this.echartsDataObject = Object.assign({},newValue)

            }
        }
    }
</script>

<style lang="less" scoped>
    .echarts-row{
        background:#fff;
        margin-bottom:32px;
    }
    /deep/ .ivu-tabs-bar {
        margin-bottom: 0px;
    }
</style>
