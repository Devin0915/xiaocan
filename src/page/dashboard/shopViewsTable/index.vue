<template>
    <div class="container-wrapper">
        <Tabs v-model="tabActive">
            <TabPane v-for="(item,index) in tabs" :key="'tab-pane-'+index" :name="item.key" :label="item.label">
                <ShopTable 
                        :data="item.url" 
                        :search="dataModel" 
                        :visible="tabActive == item.key" 
                        :tableColumns="item.cloumns" 
                        :tab="item.search.tab" 
                        :activeName="tabActive">
                    <Search :model="dataModel" :type="item.key" :tab="item.search.tab"></Search>
                </ShopTable>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import Search from './component/search';
import ShopTable from './component/shop_view_table';
export default {
    components:{Search,ShopTable},
    data(){
        return {
            tabActive:'tabOne',
            tabs:[
                {
                    label: '我的商品', 
                    key: 'tabOne', 
                    search: {
                        tab:1
                    },  
                    url: '/api/dashBoard/storeView/myCommodity'
                },
                {
                    label: '关注商品', 
                    key: 'tabTwo', 
                    search: {
                        tab:2
                    }, 
                    url: '/api/dashBoard/storeView/myCommodity'
                },
                {
                    label: '增长TOP10', 
                    key: 'tabThree', 
                   
                    search: {
                        tab:3
                    }, 
                    url: '/api/dashBoard/storeView/myCommodity'
                },
                 {
                    label: '骤降TOP10', 
                    key: 'tabFour', 
                    search: {
                        tab:4
                    }, 
                    url: '/api/dashBoard/storeView/myCommodity'
                },
            ],
            dataModel:{
                asin:''
            },
        }
    },
    methods:{
        handleASINDetails(){}
    }
}
</script>
<style lang="scss" scoped>
    .container-wrapper{
        margin-top: 2%
    }
    .search {
        background: #fff;
        padding: 1% 1%;       
        .selectFormItem{
            /deep/ .ivu-select-selection{
                border-radius:0px
            }
        }
        /deep/ .ivu-poptip-popper {
            min-width: 800px;
        }
    }
    @media (min-width:1024px) and (max-width:1366px) {
        .container-wrapper{
            margin-top: 1% !important;
        }
    }
</style>
