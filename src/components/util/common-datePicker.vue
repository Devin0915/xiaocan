<template>
    <div class="date-picker-wrapper">
        <DatePicker 
            :value="time" 
            format="yyyy-MM-dd" 
            type="daterange" 
            placement="bottom-end" 
            :transfer="true"
            placeholder="Select date" 
            :options="options"
            @on-change="handleOnchange"
        ></DatePicker>
    </div>
</template>
<script>
export default {
    props:{
        time:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    data(){
        return {
             options: {
                shortcuts: [
                    {
                        text: '昨天',
                        value () {
                        const date = new Date()
                        date.setTime(date.getTime() - 3600 * 1000 * 24)
                        return [date, date]
                        },
                        onClick: (picker) => {
                        // this.$Message.info('Click yesterday');
                        }
                    },
                    {
                        text: '本周',
                        value () {
                        const end = new Date()
                        const start = new Date()
                        const num = start.getDay()
                        start.setDate(start.getDate() - num) // 本周第一天
                        end.setDate(end.getDate() + 5)// 本周最后一天
                        return [start, end]
                        }
                    },
                    {
                        text: '本月',
                        value () {
                        const end = new Date()
                        const start = new Date()
                        start.setDate(1)// 本月第一天
                        end.setTime(end.getTime() - 3600 * 1000 * 24)
                        return [start, end]
                        }
                    },
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
                        text: '30天',
                        value () {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        return [start, end]
                        }
                    },
                    {
                        text: '60天',
                        value () {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 60)
                        return [start, end]
                        }
                    },
                    {
                        text: '90天',
                        value () {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                        return [start, end]
                        }
                    }
                ]
            },
        }
    },
    methods:{
        handleOnchange(value){
            this.$emit('Onchange',value)
        },
    }
}
</script>
<style scoped>
    .date-picker-wrapper{
        display: inline
    }
</style>
