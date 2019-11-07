<template>
  <Row>
    <div class="tableTools">
      <ButtonGroup size="small">
        <custom-column
          v-if="iscustomList"
          :tableKey="tableKey"
          :columns="tableColumns"
          @handleOk="handleChangeColumns"
        />
        <!-- <Tooltip content="导出汇总数据"> 
          <Button type="primary" icon="md-cloud-download"></Button>
        </Tooltip>
        <Tooltip content="导出明细数据">
          <Button type="primary" icon="md-download"></Button>
        </Tooltip>-->
        <slot name="toolList"></slot>
      </ButtonGroup>
    </div>
    <Table
      ref="table"
      :data="tableData"
      :loading="tableLoading"
      :border='border'
      :height="tableHeight"
      :columns="columns"
      stripe
      @on-sort-change="handleSortChange"
      :class="{'w-table_moving': dragState.dragging}"
      @on-expand="handleExpandRow"
      @on-row-click="handleRowClick"
    ></Table>
    <div class="pagination" v-show="isPage">     
      <Page        
        :total="pageTotal"
        :page-size="PageSize"
        :size="tableSize"
        :page-size-opts="PageSizeOpts"
        :current="currentPage"
        :placement="placement"
        @on-change="handleCurChange"
        @on-page-size-change="handleSizeChange"
        show-total
        show-elevator
        show-sizer
        :styles="{textAlign:'right',marginTop:'10px',padding:'1px 0'}"
      />
    </div>
  </Row>
</template>
<script>
import CustomColumn from "./custom-column";
export default {
  components: {
    CustomColumn
  },
  props: {
    isPage:{
      type:Boolean,
      default:true,
    },
    loading:{
      type:Boolean,
      default:false,
    },
    tableColumns: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    height: {
      type: String,
      default: "480"
    },
    border:{
      type:Boolean,
      default:true,
    },
    pageTotal: {
      type: Number,
      required: true
    },
    PageSize: {
      type: Number,
      default: 25
    },
    PageSizeOpts: {
      type: Array,
      default() {
        return [25, 50, 100, 250];
      }
    },
    currentPage: {
      type: Number,
      default: 1
    },
    placement: {
      type: String,
      default: "top"
    },
    tableSize: {
      type: String,
      default: "small"
    },
    tableKey: {
      type: String
    },
    isNativeQueries: {
      type: Boolean,
      default: false
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    iscustomList: {
      type: Boolean,
      default: false
    },
    num:{
      type:Number,
      default:335
    }
  },
  data() {
    return {
      filterParams: {
        currentPage:1,
        pageSize:25
      },
      columns: [],
      tableHeight: this.height,
      // tableHeader: this.header,
      dragState: {
        start: -1, // 起始元素的 index
        end: -1, // 结束元素的 index
        move: -1, // 移动鼠标时所覆盖的元素 index
        dragging: false, // 是否正在拖动
        direction: undefined, // 拖动方向
      }
    };
  },
  methods: {
    /**
     * @description 当表格的筛选条件发生变化时触发
     */
    handleSortChange(column, key, order) {
      let { filterParams } = this;
      // 重置到第一页？
      filterParams["currentPage"] = 1;
      // order有descending和ascending两个值
      const sortParams = {
        sort_field: column.key,
        sort_type: column.order
      }
      this.filterParams = {
        ...this.filterParams,
        ...sortParams
      };
      this.handlePageChange();
    },
    /**
     * @description 分页查询
     */
    handleCurChange(curPage) {
      this.filterParams.currentPage = curPage;
      this.filterParams.pageSize = this.PageSize;
      this.handlePageChange();
    },
    /**
     * @description 分页查询
     */
    handleSizeChange(size) {
      this.filterParams.currentPage = this.currentPage;
      this.filterParams.pageSize = size;
      this.handlePageChange();
    },
    handleChangeColumns(columns) {
      this.columns = columns;
    },
    handlePageChange() {
      if (!this.isNativeQueries) {
        this.$emit("handlePageChange", this.filterParams);
      } else {
        var _start = (this.currentPage - 1) * this.PageSize;
        var _end = this.currentPage * this.PageSize;
        this.columns = this.tableColumns.slice(_start, _end);
      }
    },
    /**
     * @description 展开某行
     */
    handleExpandRow(row,status){
      const params = {
        row:row,
        status:status
      }
      this.$emit("handleExpandRow", params);
    },
    handleRowClick(rowdata,index){
      const params = {
        rowdata:rowdata,
        index:index
      }
      this.$emit("handleRowClick", params)
    },
    suportHeaderDragle(item, index) {
      item.renderHeader = (h, params) => {
        return h(
          "div",
          {
            class: ["thead-cell"],
            on: {
              mousedown: $event => {
                this.handleMouseDown($event, params);
              },
              mouseup: $event => {
                this.handleMouseUp($event, params);
              },
              mousemove: $event => {
                this.handleMouseMove($event, params);
              }
            }
          },
          [
            // 添加 <a> 用于显示表头 label
            h("a", params.column.title),
            // 添加一个空标签用于显示拖动动画
            h("span", {
              class: ["virtual"]
            })
          ]
        );
      };
      return item;
    },
    handleMouseDown(e, column) {
      this.dragState.dragging = true;
      this.dragState.start = parseInt(column.index);
      // 给拖动时的虚拟容器添加宽高
      let table = document.getElementsByClassName("ivu-table")[0];
      let virtual = document.getElementsByClassName("virtual");
      for (let item of virtual) {
        item.style.height = table.clientHeight - 1 + "px";
        item.style.width = item.parentElement.parentElement.clientWidth + "px";
      }
    },
    // 鼠标放开结束拖动
    handleMouseUp(e, column) {
      this.dragState.end = parseInt(column.index); // 记录起始列
      this.dragColumn(this.dragState);
      // 初始化拖动状态
      this.dragState = {
        start: -1,
        end: -1,
        move: -1,
        dragging: false,
        direction: undefined
      };
    },
    // 拖动中
    handleMouseMove(e, column) {
      if (this.dragState.dragging) {
        let index = parseInt(column.index); // 记录起始列
        if (index - this.dragState.start !== 0) {
          this.dragState.direction =
            index - this.dragState.start < 0 ? "left" : "right"; // 判断拖动方向
          this.dragState.move = parseInt(column.index);
          // this.columns[this.dragState.move].className = `darg_active_${this.dragState.direction}`
          // index  === this.dragState.move ? `darg_active_${this.dragState.direction}` : ''
        } else {
          this.dragState.direction = undefined;
        }
      } else {
        return false;
      }
    },
    // 拖动易位
    dragColumn({ start, end, direction }) {
      let tempData = [];
      let left = direction === "left";
      let min = left ? end : start - 1;
      let max = left ? start + 1 : end;
      for (let i = 0; i < this.columns.length; i++) {
        if (i === end) {
          tempData.push(this.columns[start]);
        } else if (i > min && i < max) {
          tempData.push(this.columns[left ? i - 1 : i + 1]);
        } else {
          tempData.push(this.columns[i]);
        }
      }
      this.columns = tempData;
    },
    handleColumns(columns) {
      this.columns = columns.map((item, index) => {
        let res = item;
        // if (res.drageHeader) res = this.suportHeaderDragle(res, index);
        // if (res.key === "handle") res = this.surportHandle(res);
        return res;
      });
    },
    handleFixedTableShadow() {
      let tableBody = document.getElementsByClassName("ivu-table-body")[0];
      let tableFixed = document.getElementsByClassName("ivu-table-fixed")[0];
      if (!tableBody) {
        tableBody = document.getElementsByClassName("ivu-table-tip")[0];
      }

      tableBody.addEventListener("scroll", event => {
        let tableFixed = document.getElementsByClassName(
            "ivu-table-fixed"
          )[0]
          if(!!tableFixed){
            if (event.target.scrollLeft > 2) {
              tableFixed.style.boxShadow = "2px 0 6px -2px rgba(0,0,0,.2)";
            } else {
              tableFixed.style.boxShadow = "2px 0 6px -2px transparent";
            }
          }
      });
    },
  },
  watch: {
    tableColumns(val, oldVal) {
      this.columns = val;
    },
  },
  mounted() {
    if (!this.isNativeQueries) {
      const localColumns = localStorage.getItem(this.tableKey);
      this.columns = this.tableColumns;
      if (!localColumns) {
        this.columns = this.tableColumns;
      } else {
        const LColumns = JSON.parse(localColumns);
        this.columns = this.tableColumns.filter(element => {
          return LColumns.includes(element["key"]);
        });
      }
    } else {
      var _start =
        (this.filterParams.currentPage - 1) * this.filterParams.PageSize;
      var _end = this.filterParams.currentPage * this.filterParams.PageSize;
      this.columns = this.filterParams.tableColumns.slice(_start, _end);
    }
    this.handleFixedTableShadow();
    // 设置表格高度
    if (this.height == 480) {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - this.num;
    }
    this.handleColumns(this.columns);
  }
};
</script>
<style lang="scss">
.tableTools {
  text-align: right;
  margin-bottom: 5px;
  margin-top: -25px;
  padding-left: 2px;
}
.ivu-table-fixed {
  box-shadow: 2px 0 6px -2px transparent;
}
.ivu-table-fixed-right::before, .ivu-table-fixed::before{
  height: 0;
}
.pagination {
  margin-bottom: 5px;
}
/deep/ .ivu-tooltip {
  margin-left: 10px;
}
.w-table {
  .ivu-table th {
    padding: 0;
    .virtual {
      position: fixed;
      display: block;
      width: 0;
      height: 0;
      margin-left: -10px;
      z-index: 99;
      background: none;
      border: none;
    }
    &.darg_active_left {
      .virtual {
        border-left: 2px dotted #666;
      }
    }
    &.darg_active_right {
      .virtual {
        border-right: 2px dotted #666;
      }
    }
  }
  .thead-cell {
    padding: 0;
    display: inline-flex;
    flex-direction: column;
    align-items: left;
    cursor: pointer;
    overflow: initial;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
  &.w-table_moving {
    .ivu-table .ivu-table-header th {
      cursor: move !important;
    }
    .el-table__fixed {
      cursor: not-allowed;
    }
  }
 
}
</style>
