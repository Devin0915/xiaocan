<template>
    <Select v-model="val" v-bind="$attrs" v-on="$listeners">
        <Option v-for="(item,index) in data" 
            :key="'select-'+index" 
            :value="item.value">{{ item.label }}</Option>
    </Select>
</template>
<script>
import Config from './config.js'
export default {
    props:{
        value:{
            type:[String,Number,Array],
            default(){
                return null;
            }
        },
        code:{
            type:String,
            required:true
        },
        defaultValue:{
            type:String,
            default:'_default'
        }
    },
    data(){
        return {
            data:[],
            val:null
        }
    },
    mounted(){
        this.setData(this.code);
    },
    computed:{
        cdata(){
            var arr = [{label:'全部',value:this.defaultValue}]
           return arr.concat(this.$store.getters.getCacheData(this.code))
        }
    },
    watch:{
        cdata:{
            deep:true,
            immediate:true,
            handler(v){
                this.data = v
            }
        },
        value:{
            deep:true,
            immediate:true,
            handler(val){
                if(Array.isArray(val)){
                    this.val = val
                    return false
                }
                if(!this.isEmpty(val)){
                    this.val = val
                    return false
                }
                this.val = this.defaultValue
            }
        },
        val:{
            deep:true,
            handler(val){
                if(Array.isArray(val)){
                    this.$emit('input',val)
                    return false
                }
                if(!this.isEmpty(val) && val !== this.defaultValue){
                    this.$emit('input',val)
                    return  false
                }
                this.$emit('input','')
            }
        }
    },
    methods:{
        setData(code){
           if(!this.$store.getters.getCacheDataState(code)){
               this.$store.dispatch('addSelectData',{code:code,data:Config[code]()})
           } 
        },
        isEmpty(obj){
            return (typeof obj === 'undefined' || obj === null || obj === '')
        }
    }
}
</script>