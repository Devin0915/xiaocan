<template>
  <div >
    <div class="row">
      <Select
        :value="model"
        filterable
        placeholder="请输入要搜索店铺"
        :label-in-value="true"
        @on-change="handleOnChange"
        clearable
      >
        <Option v-for="(option, index) in list" :value="option.value" :key="index">{{option.label}}</Option>
      </Select>
    </div>
  </div>
</template>
<script>

import { getSessionStorage } from "@/utils";
import { getSearchStores, changeStore} from "@/axios/user";
import { handleGetZTime } from "@/utils/time";
import store from "@/store";
export default {
  inject: ["reload"],
  data() {
    return {
      loading: false,
      list: [],
      model: getSessionStorage('userInfo').store_id,
    };
  },
  mounted() {
    // 店铺
    setTimeout(() => {
      getSearchStores().then(res => {
        let { data } = res;
        let obj = data.dropList;
        let arr = [];
        obj.map(item => {
          arr.push({ value: item.storeId, label: item.val });
        });
        this.model = getSessionStorage('userInfo').store_id;
        this.list = arr;
      });
    }, 1000);
    
  },
  created() {
    
  },
  methods: {
    // 非空判断
    isEmpty(obj) {
      return typeof obj === "undefined" || obj === null || obj === "";
    },
    // select切换
    handleOnChange(val) {
      if(this.isEmpty(val)) {
        return 
      }
      changeStore(val.value).then(res => {
        let { code, data, msg} = res;
        if (code === 1) {
          this.$Message.success(msg);
          let {storeId,country,account,departmentId,locaTime} = data.info;
          let params = {
            storeId:storeId,
            country:country,
            account:account,
            departmentId:departmentId,
            locaTime,locaTime
          }
          store.dispatch("SaveInfo",params);
          // 刷新路由
          this.reload();
        } else {
          this.$Message.error(msg);
        }
      });
    },
  }
};
</script>
<style lang="less" scoped>
/deep/ .ivu-select-selection {
  border: 0px;
  height: 40px !important;
  border-radius: 20px;
  background: #9A96FB;
  line-height: 40px;
  padding: 0px 10px;
}
/deep/ .ivu-select-visible .ivu-select-selection {
  box-shadow: 0 0 0 0px rgba(45, 140, 240, 0.2);
}
/deep/ .ivu-icon-ios-arrow-down{
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
/deep/ .ivu-select-input{
  font-size: 14px;
  color: #fff;
  font-family: 'Source Han Sans CN'
}
/deep/ .ivu-select-item-selected, .ivu-select-item-selected:hover {
  color: #9a96fb;
}
</style>

