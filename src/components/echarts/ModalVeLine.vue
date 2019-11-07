<template>
    <div :class="className" :style="{height:height,width:width}"/>
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
                default: '870px'
            },
            height: {
                type: String,
                default: '250px'
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
                    xAxis: {
                        data: time,
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        }
                    },
                    grid: {
                        left: 10,
                        right: 35,
                        bottom: 20,
                        top: 30,
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        padding: [5, 10]
                    },
                    yAxis: {
                        axisTick: {
                            show: false
                        }
                    },
                    series: [{
                        name: this.chartType , itemStyle: {
                            normal: {
                                color: '#FF005A',
                                lineStyle: {
                                    color: '#FF005A',
                                    width: 2
                                }
                            }
                        },
                        smooth: true,
                        type: 'line',
                        data: data,
                        animationDuration: 2800,
                        animationEasing: 'cubicInOut',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                    },]
                })
            },
            initChart() {
                this.chart = echarts.init(this.$el, 'macarons')
                this.setOptions(this.chartData)
            }
        }
    }
</script>
