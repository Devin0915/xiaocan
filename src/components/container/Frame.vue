<template>
    <transition name="fade" mode="out-in">
      <!-- <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive> -->
      <keep-alive>  
          <router-view />
      </keep-alive>
    </transition>
</template>

<script>
export default {
  name: 'Content',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
/* .app-main { */
  /*84 = navbar + tags-view = 50 +34 */
  /* min-height: calc(100vh - 70px);
  width: 100%;
  position: relative;
  overflow: hidden; */
/* } */
</style>