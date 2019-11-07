<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .container-wrapper .ivu-tabs-tab {
  background: #fff;
}
/deep/ .container-wrapper .ivu-tabs-bar {
  border-bottom: 0px solid #dcdee2;
  margin-bottom: 1%;
}
/deep/ .container-wrapper .ivu-tabs-nav .ivu-tabs-tab {
  height: 60px;
  padding: 0px 0px;
  width: 180px;
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  color: #888888;
}
/deep/ .ivu-page.mini .ivu-page-item {
  margin-right: 4px;
  border: 1px solid #dcdee2;
}
/deep/ .search .ivu-select-visible .ivu-select-selection{
    border-color: #57a3f3;
    outline: 0;
    box-shadow: 0 0 0 0px rgba(45,140,240,.2);
}
/deep/ .container-wrapper .ivu-tabs-ink-bar {
  background-color: transparent;
}
/deep/ .container-wrapper .ivu-tabs-nav .ivu-tabs-tab-active {
  background: #9a96fb;
  color: #fff;
}
/deep/ .ivu-table th {
  background-color: #f1f1ff;
}
/deep/ .search .ivu-form-item {
  margin-bottom: 0px;
}
/deep/ .search .ivu-input:focus{
  box-shadow: 0 0 0 0px rgba(45,140,240,.2);
}
/deep/ .search .ivu-form .ivu-form-item-label {
  font-size: 14px;
  color: #a5a5a5;
}
/deep/ .search .ivu-select-selection {
  border-radius: 0px;
}
/deep/ .search .ivu-poptip {
  height: 42px;
  line-height: 42px;
}
/deep/ .search .ivu-input {
  font-size: 14px;
  border: 1px solid #dcdcdc;
  border-radius: 0px;
  height: 42px;
  color: #7aa2ff;
}
/deep/ .search .ivu-input-icon {
  color: #7aa2ff;
}
/deep/ .search .ivu-select-single .ivu-select-selection {
  height: 42px;
}
/deep/ .search .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
/deep/
  .search
  .ivu-select-single
  .ivu-select-selection
  .ivu-select-selected-value {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #7aa2ff;
}
/deep/ .search .ivu-form .ivu-form-item-label {
  padding: 15px 12px 14px 0;
}
/deep/ .search .ivu-form-item-content {
  height: 42px;
}
/deep/ .search .ivu-select-item-selected,
.ivu-select-item-selected:hover {
  color: #7aa2ff;
}
/deep/ .search .ivu-select-arrow {
  color: #7aa2ff;
  font-size: 14px;
}
/deep/
  .search
  .ivu-select-single
  .ivu-select-selection
  .ivu-select-placeholder {
  color: #7aa2ff;
}
/deep/ .search .ivu-input-icon {
  height: 42px;
  line-height: 42px;
}
/deep/ .search .ivu-btn-primary:hover {
  color: #fff;
  background-color: #7aa2ff;
  border-color: #7aa2ff;
}
/deep/ .search .ivu-btn-primary {
  color: #fff;
  background-color: #7aa2ff;
  border-color: #7aa2ff;
  height: 42px;
  font-size: 14px;
  border-radius: 0px;
  width: 100px;
}
/deep/ .search .ivu-poptip-body-content .ivu-form-item-label {
  padding: 10px 12px 10px 0;
}
/deep/ .search .ivu-btn-success {
  height: 42px;
  font-size: 14px;
  border-radius: 0px;
  margin-left: 10px;
}
/deep/ .search .ivu-btn-primary.active,
.ivu-btn-primary:active {
  color: #fff;
  background-color: #7aa2ff;
  border-color: #7aa2ff;
}
/deep/ .ivu-table-sort i.on {
  color: #ff8fbd;
}
/deep/ .ivu-table-sort .ivu-icon-md-arrow-dropdown.on {
  color: #57e185;
}
/deep/ th .ivu-table-cell {
  color: #646464 !important;
  font-family: "Source Han Sans CN";
  font-weight: 100;
  text-align: center;
}
/deep/ .ivu-table-border td,
.ivu-table-border th {
  border-right: 1px solid #dcdcdc;
}
/deep/ .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
.ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
  background-color: #f6f6f6;
}
/deep/ .ivu-table {
  color: #a5a5a5;
  font-size: 14px;
  font-family: "Source Han Sans CN";
}
/deep/ .ivu-menu-dark {
  background: #333333;
}
/deep/ .ivu-menu {
  background: #333333;
  font-family: "Source Han Sans CN";
  font-size: 14px;
}
/deep/ .ivu-layout-sider {
  background: #333333;
}
/deep/
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-opened
  .ivu-menu-submenu-title {
  background: #262626;
  color: #9a96fb;
}
/deep/
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu
  .ivu-menu-item-active
  .ivu-icon {
  color: #9a96fb;
}
/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu
  /deep/
  .ivu-menu-item-active:hover {
  border-right: none;
  color: #fff;
  background: #333333 !important;
}
/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
  color: #a5a5a5;
}
/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: #fff;
  background: #333333 !important;
}
/deep/
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu
  .ivu-menu-item-active:hover {
  border-right: none;
  color: #fff;
  background: #333333 !important;
}
/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: #fff;
  background: #333333 !important;
}
/deep/ .ivu-layout-sider-collapsed .log .log-text {
  display: none;
}
/deep/ .ivu-breadcrumb {
  color: #a5a5a5;
}
/deep/ .ivu-breadcrumb a {
  color: #a5a5a5;
  font-family: "Source Han Sans CN";
}
/deep/ .ivu-breadcrumb a:hover {
  color: #9a96fb;
}
/deep/ .ivu-breadcrumb > span:last-child {
  font-weight: 700;
  color: #9a96fb;
}
/deep/ .right-menu .ivu-avatar {
  border-radius: 4px;
}
/deep/ .tags-nav .ivu-tag-primary.ivu-tag-dot .ivu-tag-dot-inner {
  background: #9a96fb;
}
/deep/ .ivu-layout {
  background: #f6f6f6;
}
</style>