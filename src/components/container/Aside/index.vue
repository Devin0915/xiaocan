<template>
  <div class="side-menu-wrapper">
    <Menu
      v-show="!sidebar.opened"
      :active-name="$route.name"
      width="auto"
      :theme="theme"
      :open-names="openedNames"
      accordion
      ref="menu"
    >
      <menus-item v-for="route in $router.options.routes" :key="route.path" :item="route" :base-path="route.path" />
    </Menu>
    <div class="menu-collapsed" v-show="sidebar.opened" :list="$router.options.routes">
      <template v-for="item in $router.options.routes">
        <collapsed-menu v-if="item.children && item.children.length > 0&& IsShow(item)" @on-click="handleSelect" hide-title :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item" :key="`drop-menu-${item.name}`"></collapsed-menu>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import  MenusItem  from "./SideMenusItem";
import CollapsedMenu from './CollapsedMenu.vue'
import { getUnion} from "@/utils";
import { judgeAuth_show } from "@/utils/filterRouter";
export default {
  components: { MenusItem, CollapsedMenu },
  props:{
    theme: {
      type: String,
      default: 'dark'
    },
    rootIconSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 16
    },
  },
  data(){
    return{
      openedNames:[],
    }
  },
  computed: {
    ...mapGetters([
      "menuList",
      "sidebar"
    ]),
  },
  watch: {
    openedNames () {
      this.$nextTick(() => {        
        if(!this.isEmpty(this.$refs.menu)) {
          this.$refs.menu.updateOpened()
        }      
      })
    }
  },
  methods:{
     // 非空判断
    isEmpty(obj) {
        return typeof obj === "undefined" || obj === null || obj === "";
    },
    getOpenedNamesByActiveName (name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName (name) {
       this.openedNames = this.getOpenedNamesByActiveName(name)
    },
    handleSelect(path){
      this.$router.push(path)
    },
    IsShow(item){
      const auth = this.$store.getters.menuList;
      return judgeAuth_show(auth,item)
    }
  },
  mounted(){
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(this.$route.name))
  }
}
</script>
<style lang="scss" scoped>
</style>
