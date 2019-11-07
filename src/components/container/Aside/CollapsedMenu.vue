<template>
  <Dropdown ref="dropdown" @on-click="handleClick" :class="hideTitle ? '' : 'collased-menu-dropdown'" :transfer="hideTitle" :placement="placement">
    <a class="drop-menu-a" type="text" @mouseover="handleMousemove($event, children)" :style="{textAlign: !hideTitle ? 'left' : ''}"><Icon :type="parentItem.meta.icon" :size="rootIconSize"></Icon><span class="menu-title" v-if="!hideTitle">{{ parentItem.meta.title }}</span><Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16"/></a>
    <DropdownMenu ref="dropdown" slot="list">
      <template v-for="child in parentItem.children">
        <collapsed-menu v-if="child.children&&child.children.length>0&&IsShow(child)" :icon-size="iconSize" :parent-item="child" :key="`drop-${child.name}`"></collapsed-menu>
        <DropdownItem v-else :key="`drop-${child.name}`" :selected="child.name === $route.name" :name="child.name"><Icon :type="child.meta.icon" :size="iconSize"></Icon><span class="menu-title">{{ child.meta.title }}</span></DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import { judgeAuth_show } from "@/utils/filterRouter";
export default {
  name: 'CollapsedMenu',
  props: {
    parentItem: {
      type: Object,
      default: () => {}
    },
    hideTitle: {
      type: Boolean,
      default: false
    },
    rootIconSize: {
      type: Number,
      default: 16
    },
    iconSize: {
      type: Number,
      default: 16
    }
  },
  data () {
    return {
      placement: 'right-end'
    }
  },
  methods: {
    handleClick (name) {
      this.$emit('on-click', name)
    },
    handleMousemove (event, children) {
      const { pageY } = event
      const height = children.length * 38
      const isOverflow = pageY + height < window.innerHeight
      this.placement = isOverflow ? 'right-start' : 'right-end'
    },
    children () {
      return this.parentItem.children
    },
    IsShow(item){
      const auth = this.$store.getters.menuList;
      return judgeAuth_show(auth,item)
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.side-menu-wrapper{
  user-select: none;
  .menu-collapsed{
    padding-top: 10px;

    .ivu-dropdown{
      width: 100%;
      .ivu-dropdown-rel a{
        width: 100%;
      }
    }
    .ivu-tooltip{
      width: 100%;
      .ivu-tooltip-rel{
        width: 100%;
      }
      .ivu-tooltip-popper .ivu-tooltip-content{
        .ivu-tooltip-arrow{
          border-right-color: #fff;
        }
        .ivu-tooltip-inner{
          background: #fff;
          color: #495060;
        }
      }
    }


  }
  a.drop-menu-a{
    display: inline-block;
    padding: 6px 15px;
    width: 100%;
    text-align: center;
    color: #fff;
  }
}
.menu-title{
  padding-left: 6px;
}
.ivu-select-dropdown{
  max-height: none;
}
</style>
