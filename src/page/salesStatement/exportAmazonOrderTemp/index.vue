<template>
    <div class="container">
        <div>
           <oneTime typename="订单报表下载"></oneTime>
        </div>
        <div class="export-amazon-orderTemp">
            <Card class="card-div" :bordered="false">
                <div class="search">
                    <Form ref="formRef" :model="dataModel" inline>
                    <FormItem label="日期：" :label-width="80">
                        <CommonDatePicker :time="dataModel.time"  @Onchange="handleDatePickerOnChange"></CommonDatePicker>
                    </FormItem>
                    <FormItem label="事业部：" :label-width="80">
                        <y-select clearable v-model="dataModel.business" code="business" :transfer="true" placeholder="请选择" style="width:150px"></y-select>                       
                    </FormItem>
                    <Button type="primary" class="but-primary" @click="handleExport">导 出</Button>
                    <div class="tip-div">
                        <Icon type="ios-alert" color="#FF9800" size="20"/><span class="tip-span"> 注：数据来自从亚马逊MWS-API获取的订单明细；</span>
                    </div>
                    
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
import oneTime from '../../../components/time/common-oneTime';
import CommonDatePicker from "@/components/util/common-datePicker";
export default {
    components:{
        oneTime,
        CommonDatePicker
    },
    data(){
        return {
            dataModel:{
                time:[],
                business:''
            },
            
        }
    },
    created(){
        this.handleTime();
    },
    methods:{
        handleTime(){
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            this.dataModel.time = [date, new Date()]
        },
        handleDatePickerOnChange(val){
            this.dataModel.time = val;
        },
        handleExport(){}
    }
}
</script>
<style lang="scss" scoped>
    .export-amazon-orderTemp{
        margin-top:2%;
        .card-div{
            height: 500px;
            .but-primary{
                margin-left: 3%;
            }
            /deep/ .ivu-input-suffix i{
               line-height: 40px;
            }
            .tip-div{
                display: inline-block;
                margin-left: 3%;
                .tip-span{
                  vertical-align: middle;
                }
            }
           
        }
    }
</style>