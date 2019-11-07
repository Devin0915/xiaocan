<template>
  <div v-if="src">
    <Poptip v-if="showClearImg && !isError" trigger="hover" placement="right-start"  width="300" @on-popper-show="getClearSrc" transition="fadeIn">
      <div class="clear-pic" slot="content" >
        <Spin v-if="loading">
            <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <img v-else :src="clearSrc" style="{width:'160px'}">
      </div>
      <img :src="smallSrc" class="table-pic" :style="{width:width,height:height}">
    </Poptip>
    <!-- <img v-if="isError" src="@/assets/img/frame/pic-imgfailure.png" class="table-pic" :style="{width:width,height:height}"> -->
    <img v-if="!showClearImg && !isError" :src="src" class="table-pic">
  </div>
  <!-- 空图片的样式 -->
  <empty-pic v-else :width="width" :height="height"></empty-pic>
</template>
<script>
import EmptyPic from './empty-image.vue'
export default {
  components: {
    EmptyPic
  },
  props: {
    src: String,
    delay: {
      type: Number,
      default: 150
    },
    width: String,
    height: String
  },
  watch: {
    src(val) {
      this.init(val)
    }
  },
  created() {
    if (this.src) {
      this.init(this.src)
    }
  },
  data() {
    return {
      clearSrc: '',
      loading: true,
      isError: false,
      smallSrc: '',
      showClearImg: true,
      firstShow: true,
      clearStyle: {
      }
    }
  },
  methods: {
    load() {
      this.loading = false
    },
    getClearSrc() {
      if (this.firstShow) {
        this.loading = true
        if (/._[A-Za-z]+[0-9]+_/gi.test(this.src)) {
          // 亚马逊图片
          this.clearSrc = this.src.replace(/(._[A-Za-z]+)[0-9]+_/gi, '$1300_')
        } else if (/image.umaicloud.com/gi.test(this.src)) {
          // 云服务器图片
          let arr = this.src.split('.')
          arr[arr.length - 2] += '_m'
          this.clearSrc = arr.join('.')
        } else {
          this.clearSrc = this.src
        }
        this.loading = false
        this.firstShow = false
        var img = new Image()
        img.onload = e => {
          if (e.target.width < 300 && e.target.height < 300) {
            if (e.target.width >= e.target.height) {
              this.clearStyle = { width: '160px' }
            } else {
              this.clearStyle = { height: '160px' }
            }
          } else {
            this.clearStyle = {}
          }
        }
        img.src = this.clearSrc
      }
    },
    init(src) {
      this.firstShow = true
      // 显示小图
      // if (/._[A-Za-z]+[0-9]+_/gi.test(src) || /dev.umaicloud.com/gi.test(src)) {
      if (/image.umaicloud.com/gi.test(src)) {
        let arr = src.split('.')
        arr[arr.length - 2] += '_s'
        this.smallSrc = arr.join('.')
      } else {
        this.smallSrc = src
      }
      //判断图片是否出错
      this.isError = false
      var img = new Image()
      img.onerror = () => {
        this.isError = true
      }
      img.src = this.smallSrc
      // 判断是否亚马逊无图
      let isAmazonNoPic = /no-img-sm.[\w\d_]*.gif$/gi.test(src)
      this.showClearImg = !isAmazonNoPic
    }
  }
}
</script>
<style lang="scss" >
.clear-pic {
  width: 240px;
  height: 250px;
  text-align: center;
  .spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  img {
    max-width: 240px;
    max-height: 240px;
  }
}
.ivu-poptip-body-content{
  overflow: hidden;
}
</style>
