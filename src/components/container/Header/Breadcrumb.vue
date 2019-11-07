<template>
    <Breadcrumb class="app-breadcrumb" >
        <BreadcrumbItem  v-for="item in levelList" v-show="item.meta.title" :to="item.to" :key="`bread-crumb-${item.name}`">
          <Icon :type="item.meta.icon" size="18" :style="{ verticalAlign: 'text-bottom'}"></Icon>
          {{ item.meta.title }}
        </BreadcrumbItem >
    </Breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          item.to = '';
          return true
        }
      })
      const first = matched[0]
      if (first && first.name !== '首页') {
        matched = [{ path: 'shopview',to:'/shopview', meta: { title: '首页', icon:'ios-home' }}].concat(matched)
      }
      this.levelList = matched
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
    getHomeRoute ( homeName = 'home')  {
      let i = -1
      let len = this.$route.length
      let homeRoute = {}
      while (++i < len) {
        let item = this.$route[i]
        if (item.children && item.children.length) {
          let res = this.getHomeRoute(item.children, homeName)
          if (res.name) return res
        } else {
          if (item.name === homeName) homeRoute = item
        }
      }
      return homeRoute
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .ivu-breadcrumb {
  color: #A5A5A5;
}
/deep/ .ivu-breadcrumb a{
  color: #A5A5A5;
}
/deep/ .ivu-breadcrumb a:hover{
  color: #9A96FB;
}
.el-breadcrumb__inner a{
  color: #A5A5A5
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #A5A5A5;
    cursor: text;
  }
}
</style>