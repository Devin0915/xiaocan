<template>
  <div class="non-pic" :style="styleObj">
    <span>无图</span>
  </div>
</template>
<script>
export default {
  name: 'EmptyPic',
  props: {
    width: {
      type: String,
      default: '40px'
    },
    height: {
      type: String,
      default: '40px'
    }
  },
  data() {
    return {
      styleObj: {
        width: this.width,
        height: this.height,
        lineHeight: this.height,
        textAlign: 'center'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.non-pic {
  display: inline-block;
  background: #f2f3f5;
  border-radius: 2px;
  color: #d9d9d9;
  font-size: 12px;
}
</style>
