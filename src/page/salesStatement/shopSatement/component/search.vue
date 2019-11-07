<template>
    <div class="search">
        <Form ref="formRef" :model="dataModel" inline>
            <FormItem label="时间：" :label-width="60">
                <CommonDatePicker :time="dataModel.time" @Onchange="handleDatePickerOnChange"></CommonDatePicker>                    
            </FormItem>
            <FormItem label="事业部：" :label-width="80">
                <y-select clearable v-model="dataModel.business" code="business" :transfer="true" placeholder="请选择" style="width:150px"></y-select>                       
            </FormItem>
             <FormItem label="三级类目：" :label-width="100">
                <y-select clearable v-model="dataModel.business" code="threeCategory" :transfer="true" placeholder="请选择" style="width:150px"></y-select>                       
            </FormItem>
            <FormItem label="账号：" :label-width="80">
                <y-select clearable v-model="dataModel.business" code="account" :transfer="true" placeholder="请选择" style="width:150px"></y-select>                       
            </FormItem>
            <FormItem label="国家：" :label-width="80">
                <y-select clearable v-model="dataModel.business" code="country" :transfer="true" placeholder="请选择" style="width:150px"></y-select>                       
            </FormItem>
            <FormItem label="" :label-width="10" v-if="type == 'asin'">
                <iInput v-model="dataModel.campaign_name" placeholder="产品SKU/ASIN/店铺SKU"></iInput>
            </FormItem>
            <FormItem  class="form-but">
                <Button type="primary" @click="handleSearch">查 询</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import mixins from '@/utils/mixins.js';
import CommonDatePicker from "@/components/util/common-datePicker";
export default {
    mixins: [mixins],
    props: {
        type: {
            type: String,
            default: ''
        },
        model: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    components:{
        CommonDatePicker
    },
    data () {
        return {
            dataModel:this.model,
        }
    },
    created() {
       
    },
    
    methods: {
        handleDatePickerOnChange(val){},
        handleSearch () {
            // 上级抛出去
            let params = {
                asin:this.dataModel.asin
            }
            this.dispatch('amsTable', 'Search.search', params)
            this.$emit('search', this.dataModel)
        }
    }
}
</script>
<style lang="less" scoped>
    .search{
        margin-bottom: 1%;
    }
</style>
