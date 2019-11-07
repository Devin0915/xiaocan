<template>
  <div class="container-wrapper">
    <pricingTable :platform ="platform"></pricingTable>
  </div>
</template>
<script>
import pricingTable from './components/pricingTable'
export default {
  components:{
    pricingTable
  },
  data(){
    return{
      platform:"wish",
    }
  },
  methods:{
  },
  mounted(){
  }
}
</script>
<style>
.ivu-tabs-nav-scrollable span{
  line-height:58px
}
</style>