<template>
    <div>
        <div><Title  typename="导出销量数据"></Title></div>
        <div class="sales-volume-export">
            <Card class="card-div" :bordered="false">
                <div class="search">
                    日期：
                    <CommonDatePicker :time="time"  @Onchange="handleDatePickerOnChange"></CommonDatePicker>
                    
                    <Button type="primary" class="but-primary" @click="handleExport">导 出</Button>
                </div>
            </Card>
        </div>
    </div>
    
</template>
<script>
import Title from '../../../components/time/common-title'
import CommonDatePicker from "@/components/util/common-datePicker";
export default {
    components:{
        Title,
        CommonDatePicker
    },
    data(){
        return {
            time:[]
        }
    },
    created(){
        this.handleTime();
    },
    methods:{
        handleTime(){
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            this.time = [date, new Date()]
        },
        handleDatePickerOnChange(val){
            this.time = val;
        },
        handleExport(){}
    }
    
}
</script>
<style lang="scss" scoped>
    .sales-volume-export{
        margin-top:2%;
        .card-div{
            height: 500px;
            .but-primary{
                margin-left: 3%;
            }
            /deep/ .ivu-input-suffix i{
               line-height: 40px;
            }
        }
    }
</style>