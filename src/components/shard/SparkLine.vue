<template>
<span ref="sparkline"></span>
</template>

<script>
export default {
  props: {
    chartData: {
      type: Object,
      default: null
    },
    type:{
      type:String,
      default:'def'
    }
  },
  mounted() {
    var _self = this;
    $(this.$refs.sparkline).sparkline(this.chartData.data, {
      lineWidth: 1.2,
      fillColor: "rgba(0,0,0,0)",
      width: "130px",
      height: "40px",
      tooltipOffsetX: -120,
      tooltipOffsetY: 10,
      tooltipFormatter: function(field, opt, cur) {
        var dateList = _self.chartData.time;
        var $div = "<div style='width:130px;height:30px';padding:5px>" + dateList[cur.x] + "：" + cur.y + "</div>";
        return $div;
      }
    });
  }
};
</script>
<style>

</style>
