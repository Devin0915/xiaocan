<template>
    <div class="search">
        <Form ref="formRef" :model="dataModel" inline>
            <Row :gutter="16">
                <iCol span="4">
                    <Form-item>
                        <Select v-model="dataModel.date_type" style="width:100%" >
                            <Option value="">不限时间</Option>
                            <Option value="development_date">更新时间</Option>
                            <Option value="price_update_date">开发时间</Option>
                        </Select>
                    </Form-item>
                </iCol>
                <iCol span="4">
                   <FormItem>
                        <div class="date-picker-wrapper">
                            <DatePicker
                                v-model="dataModel.date"
                                
                                format="yyyy-MM-dd" 
                                type="daterange" 
                                placement="bottom-end" 
                                :transfer="true"
                                placeholder="Select date" 
                                :options="options"
                                @on-change="handleOnchange"
                            ></DatePicker>
                        </div>
                    </FormItem>
                </iCol>
                <iCol span="4">
                     <FormItem >
                        <iInput v-model="dataModel.search" placeholder="SPU/SKU/标题"></iInput>
                    </FormItem>
                </iCol>
                <iCol span="4">
                    <FormItem  class="form-but">
                        <Button type="primary" @click="handleSearch">查 询</Button>
                    </FormItem>
                </iCol>
            </Row>
            <Row>
                <iCol span="3">
                    <FormItem>
                        <Checkbox v-model="dataModel.is_price_change" :true-value='1' :false-value="0" @on-change="priceChange" > 价格变动</Checkbox>
                    </FormItem>
                </iCol>
                <iCol span="3">
                    <FormItem>
                        <Checkbox v-model="dataModel.is_new_putaway"  :true-value='1' :false-value="0"  @on-change="priceChange" > 新上价</Checkbox>
                    </FormItem>
                </iCol>
                <iCol span="4" offset="14">
                    <Button type="primary">导出列表</Button>
                    <Button type="success">导出</Button>
                </iCol>
            </Row>
        </Form>
    </div>
</template>
<script>
export default {
    components:{
    },
    data(){
        return{
             options: {
                shortcuts: [
                    // {
                    //     text: '昨天',
                    //     value () {
                    //     const date = new Date()
                    //     date.setTime(date.getTime() - 3600 * 1000 * 24)
                    //     return [date, date]
                    //     },
                    //     onClick: (picker) => {
                    //     // this.$Message.info('Click yesterday');
                    //     }
                    // },
                    // {
                    //     text: '本周',
                    //     value () {
                    //     const end = new Date()
                    //     const start = new Date()
                    //     const num = start.getDay()
                    //     start.setDate(start.getDate() - num) // 本周第一天
                    //     end.setDate(end.getDate() + 5)// 本周最后一天
                    //     return [start, end]
                    //     }
                    // },
                    // {
                    //     text: '本月',
                    //     value () {
                    //     const end = new Date()
                    //     const start = new Date()
                    //     start.setDate(1)// 本月第一天
                    //     end.setTime(end.getTime() - 3600 * 1000 * 24)
                    //     return [start, end]
                    //     }
                    // },
                    {
                        text: '最近7天',
                        value () {
                        const end = new Date()
                        end.setTime(end.getTime() - 3600 * 1000 * 24)
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        return [start, end]
                        }
                    },
                    {
                        text: '最近14天',
                        value () {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 14)
                        return [start, end]
                        }
                    },
                    {
                        text: '最近30天',
                        value () {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        return [start, end]
                        }
                    },
                    // {
                    //     text: '90天',
                    //     value () {
                    //     const end = new Date()
                    //     const start = new Date()
                    //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                    //     return [start, end]
                    //     }
                    // }
                ]
            },
            dataModel:{},
            time:"",
            searchData:{}
        }
    },
    methods:{
        //查询
        handleSearch(){
            this.searchData  = this.dataModel
            if(this.dataModel.date[0]){
                this.searchData.start_date = this.format(this.dataModel.date[0],"yyyy-MM-dd")
                this.searchData.end_date = this.format(this.dataModel.date[1],"yyyy-MM-dd")
            }
            if(this.dataModel.is_price_change){this.searchData.is_price_change = 1}else{this.searchData.is_price_change=0}
            if(this.dataModel.is_new_putaway){this.searchData.is_new_putaway = 1}else{this.searchData.is_new_putaway=0}
            this.$emit('search', this.searchData)
        },
        //是否显示价格变动
        priceChange(){
             this.searchData  = this.dataModel
            if(this.dataModel.date[0]){
                this.searchData.start_date = this.format(this.dataModel.date[0],"yyyy-MM-dd")
                this.searchData.end_date = this.format(this.dataModel.date[1],"yyyy-MM-dd")
            }
            if(this.dataModel.is_price_change){this.searchData.is_price_change = 1}else{this.searchData.is_price_change=0}
            if(this.dataModel.is_new_putaway){this.searchData.is_new_putaway = 1}else{this.searchData.is_new_putaway=0}
            this.$emit('search', this.searchData)
        },
        //是不是新上价
        newProduct(){
            this.searchData  = this.dataModel
            if(this.dataModel.date[0]){
                this.searchData.start_date = this.format(this.dataModel.date[0],"yyyy-MM-dd")
                this.searchData.end_date = this.format(this.dataModel.date[1],"yyyy-MM-dd")
            }
            if(this.dataModel.is_price_change){this.searchData.is_price_change = 1}else{this.searchData.is_price_change=0}
            if(this.dataModel.is_new_putaway){this.searchData.is_new_putaway = 1}else{this.searchData.is_new_putaway=0}
            this.$emit('search', this.searchData)
        },
        //修改时间
        handleOnchange(){},
        //时间格式
        format(time, format) {
            var t = new Date(time);
            var tf = function (i) {
                return (i < 10 ? '0' : '') + i
            };
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                switch (a) {
                    case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                    case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                    case 'mm':
                    return tf(t.getMinutes());
                    break;
                    case 'dd':
                    return tf(t.getDate());
                    break;
                    case 'HH':
                    return tf(t.getHours());
                    break;
                    case 'ss':
                    return tf(t.getSeconds());
                    break;
                }
            })
        }
    }
}
</script>
<style>
 .ivu-form-item{
     width: 100%
 }
</style>