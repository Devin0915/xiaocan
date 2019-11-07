<template>
    <div :class="className" :style="{marginLeft:'25%',height:height,width:width}"/>
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme
    import { debounce } from '@/utils'

    export default {
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '850px'
            },
            height: {
                type: String,
                default: '200px'
            },
            autoResize: {
                type: Boolean,
                default: true
            },
            chartData: {
                type: Object,
                required: true
            },
            chartType:{
                type: String,
                default: ""
            }
        },
        data() {
            return {
                chart: null,
                sidebarElm: null
            }
        },
        watch: {
            chartData: {
                deep: true,
                handler(val) {
                    this.setOptions(val)
                }
            }
        },
        mounted() {
            this.initChart()
            if (this.autoResize) {
                this.__resizeHandler = debounce(() => {
                    if (this.chart) {
                        this.chart.resize()
                    }
                }, 100)
                window.addEventListener('resize', this.__resizeHandler)
            }

            // 监听侧边栏的变化
            this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
            this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            if (this.autoResize) {
                window.removeEventListener('resize', this.__resizeHandler)
            }

            this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

            this.chart.dispose()
            this.chart = null
        },
        methods: {
            sidebarResizeHandler(e) {
                if (e.propertyName === 'width') {
                    this.__resizeHandler()
                }
            },
            setOptions({ time, data } = {}) {
                this.chart.setOption({
                    tooltip : {
                        trigger: 'axis',
                        // formatter: function(params, ticket, cb) {
                        //     var index = params[0]['dataIndex'];

                        //     return '<div>'+(data[index]['local_date'] || 0)+'<br>'
                        //             +'留评率：' + ((data[index]['ord_rev'] || 0) + '%')+ '&nbsp;&nbsp;&nbsp;评论数：'+(data[index]['review_count'] || 0)+'<br>'
                        //     +'五星：'+(data[index]['five'] || 0)+'&nbsp;&nbsp;四星：'+(data[index]['four'] || 0)+'<br>'
                        //     +'三星：'+(data[index]['three'] > 0 ? '<strong class="col-red">'+(data[index]['three'] || 0)+'</strong>': (data[index]['three'] || 0))
                        //     +'&nbsp;两星：'+(data[index]['two'] > 0 ? '<strong class="col-red">'+(data[index]['two'] || 0)+'</strong>': (data[index]['two'] || 0))
                        //     +'&nbsp;一星：'+(data[index]['one'] > 0 ? '<strong class="col-red">'+(data[index]['one'] || 0)+'</strong>': (data[index]['one'] || 0))+'</div>'

                        // }
                    },
                    grid: {
                        left: '1%',
                        right: '2%',
                        top: '6%',
                        bottom: '3%',
                        containLabel: true
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data :  time
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            scale: true,
                        }
                    ],
                    series: [
                        {
                            name: this.chartType,
                            type: 'line',
                            data: data
                        }
                    ]
                    // xAxis: {
                    //     data: time,
                    //     boundaryGap: false,
                    //     axisTick: {
                    //         show: true
                    //     }
                    // },
                    // grid: {
                    //     left: 10,
                    //     right: 40,
                    //     bottom: 20,
                    //     top: 30,
                    //     containLabel: true
                    // },
                    // tooltip: {
                    //     trigger: 'axis',
                    //     axisPointer: {
                    //         type: 'cross'
                    //     },
                    //     padding: [5, 10]
                    // },
                    // yAxis: {
                    //     axisTick: {
                    //         show: false
                    //     }
                    // },
                    // series: [{
                    //     name: this.chartType , itemStyle: {
                    //         normal: {
                    //             color: '#FF005A',
                    //             lineStyle: {
                    //                 color: '#FF005A',
                    //                 width: 2
                    //             }
                    //         }
                    //     },
                    //     smooth: true,
                    //     type: 'line',
                    //     data: data,
                    //     animationDuration: 2800,
                    //     animationEasing: 'cubicInOut',
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             position: 'top'
                    //         }
                    //     },
                    // },]
                })
            },
            initChart() {
                this.chart = echarts.init(this.$el, 'macarons')
                this.setOptions(this.chartData)
            }
        }
    }
</script>
