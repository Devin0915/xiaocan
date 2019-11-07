<template>
  <div class="custom-column">
    <!-- <Icon type="ios-cog-outline" slot="custom_column" size="24" @click="modalShow = true"/> -->
    <!-- <Button type="primary" @click="modalShow = true">自定义</Button> -->
    <Tooltip placement="top" transfer content="自定义列表">
      <Button size="small" type="primary" icon="md-color-wand" @click="modalShow = true"></Button>
    </Tooltip>
    <Modal
      v-model="modalShow"
      title="自定义列"
      width="640px"
      @on-ok="handleOk"
      :mask-closable="false"
      @on-cancel="modalShow = false"
    >
      <Row>
        <div class="alert">勾选你想要在当前页面展示的列，以后将按照您的勾选默认展示。</div>
        <Checkbox-group v-model="tableColumnsChecked">
          <Checkbox
            size="large"
            v-for="(item,index) in newColumns"
            :disabled="item.fixed == 'left' || item.type == 'expand' ? true : false"
            :label="item.key"
            :key="index"
          >{{ !!item.title?item.title:item.key }}</Checkbox>
        </Checkbox-group>
      </Row>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CustomColumn",
  props: {
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tableKey: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      modalShow: false,
      tableColumnsChecked: [],
      newColumns: []
    };
  },
  watch:{
    columns(val){
      this.newColumns = val;
      const localColumns = localStorage.getItem(this.tableKey);
      if (!localColumns) {
        this.tableColumnsChecked = this.columns.map(element => {
          return element["key"];
        });
      } else {
        this.tableColumnsChecked = JSON.parse(localColumns);
      }
    }
  },
  mounted() {
    this.newColumns = this.columns;
    const localColumns = localStorage.getItem(this.tableKey);
    if (!localColumns) {
      this.tableColumnsChecked = this.columns.map(element => {
        return element["key"];
      });
    } else {
      this.tableColumnsChecked = JSON.parse(localColumns);
    }
  },
  methods: {
    handleOk() {
      const { newColumns, tableColumnsChecked } = this;
      let data = newColumns.filter(element => {
        return tableColumnsChecked.includes(element["key"]);
      });
      localStorage.setItem(this.tableKey, JSON.stringify(tableColumnsChecked));
      this.$emit("handleOk", data);
    }
  }
};
</script>

<style lang="less" scoped>
.custom-column {
  display: inline-block;
}
.alert {
  -webkit-box-align: center;
  -webkit-box-sizing: border-box;
  align-items: center;
  background-color: #e5f0ff;
  border: 1px solid #97c7ff;
  border-radius: 2px;
  box-sizing: border-box;
  color: #003b80;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 12px;
  height: 40px;
  padding: 0 10px;
  width: 100%;
}
.ivu-checkbox-group /deep/ .ivu-checkbox-group-item {
  margin-top: 14px;
  width: 190px;
  .ivu-checkbox {
    margin-right: 10px;
  }
}
</style>
