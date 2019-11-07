<template>
  <div v-if="!item.hidden&&item.children&&IsShow(item)" >
      <Submenu :name="item.name">
        <template slot="title">
          <Icon :type="item.meta.icon" :style="{ verticalAlign: 'text-bottom'}" size="18"></Icon>
          <span v-if="item.meta&&item.meta.title" :style="{ verticalAlign: 'middle'}">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-show="!child.hidden && IsShow(child)">
          <sidebar-item :is-nest="true" 
           v-if="!child.hidden&&child.children&&child.children.length>0" 
           :item="child" :key="child.path" :base-path="resolvePath(child.path)"></sidebar-item>
            <MenuItem  v-else-if="!child.hidden && IsShowAA(child)" :to="resolvePath(child.path)" :name="child.name" :key="child.name">
              <Icon v-if="child.meta&&child.meta.icon" :type="child.meta.icon" size="15" :style="{ verticalAlign: 'middle'}"></Icon>
              <span v-if="child.meta&&child.meta.title" :style="{ verticalAlign: 'middle'}">{{child.meta.title}}</span>
            </MenuItem>
            
        </template>
        <div style="height: 6px;background: #262626;"></div>
      </Submenu>

  </div>
</template>

<script>
import path from "path";
import { judgeAuth_show } from "@/utils/filterRouter";
export default {
    name: "SidebarItem",
    props: {
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ""
        },
    },
    methods: {
        resolvePath(...paths) {
            return path.resolve(this.basePath, ...paths);
        },
        IsShowAA(item){
          const auth = this.$store.getters.menuList;
          console.log(auth.includes(item.meta.api),"auth.includes(item.meta.api)");
          return auth.includes(item.meta.api);
        },
        IsShow(item){
          const auth = this.$store.getters.menuList;
          return judgeAuth_show(auth,item)
        }
    }
};
</script>

<style scoped>
.fontcontainer{
    padding-right:10px;
}
</style>

