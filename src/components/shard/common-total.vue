<template>
  <Row :gutter="20" class="panel-group">
    <iCol class="card-panel-col" v-for="(item,index) in data" :key="index">
      <div class="card-panel" :style="{background:item.color}">
        <div class="card-panel-icon-wrapper">
          <img :src="item.icon" />
        </div>
        <div class="card-panel-description">
          <h4 class="card-panel-text">{{item.label}}</h4>
          <span class="card-panel-num">{{item.value}}</span>
        </div>
      </div>
    </iCol>
  </Row>
</template>
<script>
import zu1 from '@/assets/icons/zu1.png';
import zu2 from '@/assets/icons/zu2.png';
import zu3 from '@/assets/icons/zu3.png';
import zu4 from '@/assets/icons/zu4.png';
import zu5 from '@/assets/icons/zu5.png';
import zu6 from '@/assets/icons/zu6.png';
export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return [
          {
            color: "#44D273",
            icon: zu1,
            label: "销售件数",
            value: '66895'
          },
          {
            color: "#FF8FBD",
            icon: zu2,
            label: "订单数",
            value: '7895'
          },
          {
            color: "#5FC6FC",
            icon: zu3,
            label: "销售额",
            value: "$" +'1212'
          },
          {
            color: "#F19FFF",
            icon: zu4,
            label: "SESSION",
            value: '89'
          },
          {
            color: "#FF9292",
            icon: zu5,
            label: "转化率",
            value: '48'
          },
          {
            color: "#FFBE92",
            icon: zu6,
            label: "折扣率",
            value: '25'
          }
        ];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.panel-group {
  margin-left: -8px !important;
  display: flex;
  justify-content: flex-start;
  .card-panel-col {
    margin-bottom: 10px;
  }
  .card-panel {
    width: 200px;
    height: 80px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #fff;
    display: flex;
    align-items: center;
    max-width: 230px;
    min-width: 180px;
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
    }
    .card-panel-icon-wrapper {
      float: left;
      border-radius: 6px;
      margin: 0 5%;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      margin-left: 0px;
      .card-panel-text {
        font-family: 'Source Han Sans CN';
        color: #fff;
        font-size: 14px;
        font-weight: 100;
      }
      .card-panel-num {
        font-size: 20px;
        font-family: 'Montserrat-bold';
      }
    }
  }
}
@media (max-width: 1400px) {
  .card-panel {
    min-width: 150px !important;
    .card-panel-icon-wrapper {
      margin-top: 9px !important;
    }
    /deep/ .ivu-icon {
      font-size: 22px !important;
    }
    .card-panel-text {
      margin-top: 12px !important;
    }
    .card-panel-num {
      font-size: 18px !important;
    }
  }
}
</style>
