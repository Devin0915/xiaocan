<template>
    <div class="search">
        <Form ref="formRef" :model="dataModel" inline>
            <FormItem label="ASIN：" :label-width="60">
                <iInput v-model="dataModel.asin" placeholder="请输入广告系列"></iInput>
            </FormItem>
            <FormItem  class="form-but">
                <Button type="primary" @click="handleSearch">查 询</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import mixins from '@/utils/mixins.js';
export default {
    mixins: [mixins],
    props: {
        type: {
            type: String,
            default: ''
        },
        model: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data () {
        return {
            dataModel:this.model,
        }
    },
    created() {
       
    },
    
    methods: {
        handleSearch () {
            // 上级抛出去
            let params = {
                asin:this.dataModel.asin
            }
            this.dispatch('amsTable', 'Search.search', params)
            this.$emit('search', this.dataModel)
        }
    }
}
</script>
<style lang="less" scoped>
    
</style>
