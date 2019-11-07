<template>
    <div class="container-wrapper">
        <Row class="container-title">
            <iCol span="24" class="c-title-left">
                <div class="c-t-left-name">{{typename}}</div>
            </iCol>
            
        </Row>

    </div>
</template>
<script>

export default {
    props:{
        typename:{
            type:String,
            default:''
        }
    },
    data(){
        return {
            timeName:'',
        }
    },
    
}
</script>
<style lang="scss" scoped>
.container-wrapper{
    width: 100%;
    .container-title{
        height: 70px;
        line-height: 70px;
        .c-title-left{
            font-family: 'Source Han Sans CN';
            font-size: 20px;
            font-weight: bold;
            color: #B5B5B5;
            .c-t-left-name{
                background: #fff;   
                padding-left: 3%;
            }
        }
       
    }
}
@media (min-width:1024px) and (max-width:1366px) {
    .container-title{
        height: 60px !important;
        line-height: 60px !important;
    }
    .c-t-right-title{
        height: 60px !important;
    }
    .c-title-left{
        font-size: 16px !important;
    }
    /deep/ .ivu-select-input{
         font-size: 12px !important;
    }
}
</style>