<template>
    <div class="container">
        <div>
           <oneTime typename="订单自定义导出"></oneTime>
        </div>
        <div class="order-export-template">
            <Card class="card-div" :bordered="false">
                <div class="search">
                    <Form ref="formRef" :model="dataModel" inline>
                    <FormItem label="日期：" :label-width="80">
                        <CommonDatePicker :time="dataModel.time"  @Onchange="handleDatePickerOnChange"></CommonDatePicker>
                    </FormItem>
                    <FormItem label="国家：" :label-width="80">
                        <y-select clearable v-model="dataModel.country" code="country" :transfer="true" placeholder="请选择" style="width:150px"></y-select>                       
                    </FormItem>
                    <FormItem label="" :label-width="10" class="tip-select">
                        <Select v-model="dataModel.type" style="width: 80px;">
                            <Option value="asin">ASIN</Option>
                            <Option value="sku">SKU</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="" :label-width="-11" >
                        
                        <iInput v-model="dataModel.country" type="textarea"></iInput>
                    </FormItem>
                    <Button type="primary" class="but-primary" @click="handleExport">导 出</Button>
                    <Button type="success" class="but-primary" @click="isListShow = true">列表导出</Button>                    
                    </Form>
                </div>
                <div v-if="isListShow">
                    <listModal  :visible.sync="isListShow" ></listModal>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
import oneTime from '../../../components/time/common-oneTime';
import CommonDatePicker from "@/components/util/common-datePicker";
import listModal from './listModal';
export default {
    components:{
        oneTime,
        CommonDatePicker,
        listModal
    },
    data(){
        return {
            isListShow:false,
            dataModel:{
                time:[],
                country:'',
                type:'asin'
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
    .order-export-template{
        margin-top:2%;
        .card-div{
            height: 500px;
            .but-primary{
                margin-left: 3%;
            }
            /deep/ .ivu-input-suffix i{
               line-height: 40px;
            }
            /deep/ .tip-select .ivu-form-item-content{
                z-index: 2;
            }
           
        }
    }
</style>