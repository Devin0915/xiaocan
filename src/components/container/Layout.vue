<template>
  <Layout class="container">
    <Sider 
      breakpoint="lg" 
      :collapsed-width="64"
      collapsible
      v-model="sidebar.opened"
      width="215px"
      hide-trigger
      :style="{overflow:'hidden'}"
      >
      <div class="log">
        <div><Icon type="md-locate" size="22" color="#9A96FB" /></div> 
        <div class="log-text">销售参谋</div>
      </div>
      <AsideView ref="sideMenu" v-if="isTagsView" />
    </Sider>
      <Layout :style="{minWidth:'960px',marginLeft:'1px'}">    
        <Header :style="{background:'#262626',height:'50px',lineHeight:'50px'}">
          <HeaderView  />
        </Header>
        <div id="iview-layout" style="overflow: auto;">
          <TagsView v-if="isTagsView" />
          <Layout >
            <Content :style="{minHeight: '280px', background: '#F6F6F6'}" >
                <FrameView :style="{padding: '10px',}"/>
                <BackTop></BackTop>
            </Content>
          </Layout>
        </div>
      </Layout>
  </Layout>
</template>
<script>
import AsideView from "./Aside";
import HeaderView from "./Header";
import FrameView from "./Frame";
import TagsView from "./Tags";
export default {
  components: {
    AsideView,
    HeaderView,
    FrameView,
    TagsView
  },
  data(){
    return {
      // isCollapsed:false
      isTagsView:false,
    }
  },
  created(){
    setTimeout(() => {
      this.isTagsView = true;
    }, 500);
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  watch: {
    '$route' (newRoute) {
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  }
};
</script>
<style lang="scss" scoped>

.log-text{
  margin-left: 5%;
  font-family: 'Source Han Sans CN';
  font-weight: bold;
  font-size: 20px;
}
.log{
    height: 32px;
    margin: 10px 15px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    font-size: 18px;
    color: #B5B5B5;
    }
.container {
  height: 100vh;
  background-color: #F6F6F6;
}

.header {
  background: #5681f4;
  color: #fff;
}

.ivu-layout-header{
  padding-left:0;
  padding-right:0px;
}
.ivu-select .ivu-select-dropdown{
  max-height: 150px;
}

</style>
