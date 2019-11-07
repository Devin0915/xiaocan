<style lang="scss">
.chart-title {
  text-align: center;
  .chart-span {
    cursor: pointer;
    width: 5%;
    // display: inline-block;
    text-align: center;
    font-size: 13px;
    font-weight: bold;
    font-family: Tahoma, sans-serif;
  }
  .ivu-tag:hover {
    color: #7a93dc !important;
  }
  .ivu-tag {
    background-color: transparent;
    border: none;
  }
}
.active span {
  color: #7a93dc !important;
}
.chart-body {
  text-align: center;
  left: 10%;
}
</style>
<template>
  <section>
    <div class="chart-title">
      <Tag
        class="chart-span"
        :class="active_name == item['key'] ? 'active' :''"
        checkable
        checked
        v-for="(item, index) in labelMap"
        :key="index"
        :name="item['key']"
        @on-change="handleTagChange"
      >{{ item['name'] }}</Tag>
    </div>
    <div class="chart-body">
      <!-- <ve-line :chart-data="chartData" :chart-type="active_name"></ve-line> -->
      <div ref="chart" :style="{marginLeft:'15%',height:height,width:width}"/>
    </div>
  </section>
</template>

<script>
// import VeLine from "../echarts/VeLine";
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
export default {
  // components: { VeLine },
  props: {
    labelMap: {
      type: Array,
      default: () => {
        return [];
      }
    },
    chart_data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    dateList: {
      type: String,
      default: "xdata"
    },
    activeName: {
      type: String,
      default: "sessions"
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null,
      chartData: {},
      active_name: this.activeName,
      height:'220px',
      width:'1100px'
    };
  },
  computed: {},
  watch: {
    chart_data(val) {
      this.chartData = {
        data: val[this.active_name],
        time: val[this.dateList]
      };
      this.initChart();
      this.$nextTick(_ => {
        echarts.init(this.$refs.chart, 'macarons').resize();
      })
    },
    activeName(val) {
      this.active_name = val;
      this.chartData = {
        data: this.chart_data[val],
        time: this.chart_data[this.dateList]
      };
      this.initChart();
      this.$nextTick(_ => {
        echarts.init(this.$refs.chart, 'macarons').resize();
      })
    }
  },

  methods: {
    handleTagChange(checked, name) {
      this.active_name = name;
      this.chartData = {
        data: this.chart_data[name],
        time: this.chart_data[this.dateList]
      };
      this.setOptions(this.chartData)
    },
    setOptions({ time, data } = {}) {
      this.chart.setOption({
          backgroundColor:'#f8f8f9',
          color:["#7a93dc", "#fd9096", "#35d698", "#e7ca66"],
          tooltip : {
            trigger: 'axis',
            axisPointer: {
                animation: false,
                lineStyle:{
                    color:"#ccc"
                }
            },
            backgroundColor: "rgba(0,11,26,0.85)",
            extraCssText: "box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.6);",
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
          axisPointer: {
              link: {xAxisIndex: 'all'}
          },
          grid: {
              // left: '1%',
              right: '2%',
              top: '6%',
              bottom: '3%',
              containLabel: true,
              backgroundColor:"#f8f8f9"
          },
          calculable : true,
          xAxis : [
              {
                  type: "category",
                  // 显示x轴上的刻度线
                  axisTick: {
                    show: true,
                    //保证刻度线和标签对齐
                    alignWithLabel: true
                  },
                  // 改变x轴颜色
                  axisLine: {
                    // 显示x轴
                    show: true,
                    lineStyle: {
                      color: "#444"
                    }
                  },
                  // 改变x轴字体颜色和大小
                  axisLabel: {
                    interval: 0,
                    textStyle: {
                      color: "#444",
                      fontSize: "12"
                    }
                  },
                  data :  time
              }
          ],
          yAxis: [
              {
                // name : '流量(m^3/s)',
                // type : 'value',
                axisLine:{
                    show:false
                },
                axisTick: {
                    show: false
                },
                // 改变网格线的颜色
                splitLine: {
                    lineStyle: {
                        color: "#e7e7e7"
                    }
                },
                // 改变y轴字体颜色和大小
                axisLabel: {
                    textStyle: {
                        color: "#888",
                        fontSize: "12"
                    }
                },
                splitArea:{
                    areaStyle:{
                        show:true,
                        color:'#f8f8f9'
                    }
                }
                
            },
          ],
          series: [
              {
                  name: this.active_name,
                  type: 'line',
                  data: data
              }
          ]
      })
  },
  initChart() {
      this.chart = echarts.init(this.$refs.chart, 'macarons')
      this.setOptions(this.chartData)
  }
  },
  mounted() {
    this.chartData = {
      time: this.chart_data[this.dateList],
      data: this.chart_data[this.activeName]
    };
    this.chart = echarts.init(this.$refs.chart, 'macarons')
                
    this.setOptions(this.chartData)
  }
};
</script>
