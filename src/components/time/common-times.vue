<template>
    <div class="container-wrapper-div">
        <Row class="container-title">
            <iCol span="3" class="c-title-left">
                <div class="c-t-left-name">{{typename}}</div>
            </iCol>
            <iCol span="21" class="c-title-right">
                <Row>
                     <iCol span="4" class="c-t-right-title">
                        <img  :src="timeDesArr.us.img" :style="{'width':'44px','height':'44px','borderRadius':'20px'}"/>
                        <span class="r-title-span">
                            <div class="r-title-span-a">{{timeArr.us[1]}}</div>
                            <div class="r-title-span-b">{{timeDesArr.uk.label}}：{{timeArr.us[0]}}</div>
                        </span>
                    </iCol>
                     <iCol span="4" class="c-t-right-title">
                        <img  :src="timeDesArr.uk.img" :style="{'width':'44px','height':'44px','borderRadius':'50px'}"/>
                       <span class="r-title-span">
                            <div class="r-title-span-a">{{timeArr.uk[1]}}</div>
                            <div class="r-title-span-b">{{timeDesArr.uk.label}}：{{timeArr.uk[0]}}</div>
                        </span>
                    </iCol>
                     <iCol span="4" class="c-t-right-title">
                        <img  :src="timeDesArr.eu.img" :style="{'width':'44px','height':'44px','borderRadius':'20px'}"/>
                       <span class="r-title-span">
                            <div class="r-title-span-a">{{timeArr.eu[1]}}</div>
                            <div class="r-title-span-b">{{timeDesArr.eu.label}}：{{timeArr.eu[0]}}</div>
                        </span>
                       
                    </iCol>
                     <iCol span="4" class="c-t-right-title">
                        <img  :src="timeDesArr.mx.img" :style="{'width':'44px','height':'44px','borderRadius':'50px'}"/>
                        <span class="r-title-span">
                            <div class="r-title-span-a">{{timeArr.mx[1]}}</div>
                            <div class="r-title-span-b">{{timeDesArr.mx.label}}：{{timeArr.mx[0]}}</div>
                        </span>
                    </iCol>
                     <iCol span="4" class="c-t-right-title">
                        <img  :src="timeDesArr.jp.img" :style="{'width':'44px','height':'44px','borderRadius':'20px'}"/>
                        <span class="r-title-span">
                            <div class="r-title-span-a">{{timeArr.jp[1]}}</div>
                            <div class="r-title-span-b">{{timeDesArr.jp.label}}：{{timeArr.jp[0]}}</div>
                        </span>
                    </iCol>
                     <iCol span="4" class="c-t-right-title" style="border-right:0px">
                        <img  :src="timeDesArr.in.img" :style="{'width':'44px','height':'44px','borderRadius':'200px'}"/>
                        <span class="r-title-span">
                            <div class="r-title-span-a">{{timeArr.in[1]}}</div>
                            <div class="r-title-span-b">{{timeDesArr.in.label}}：{{timeArr.in[0]}}</div>
                        </span>
                    </iCol>
                </Row>
            </iCol>
        </Row>

    </div>
</template>
<script>
// 【CA 加拿大】 【FR 法国】 【DE 德国】 【IN 印度】 【IT 意大利】 【JP 日本】 【MX 墨西哥】 【ES 西班牙】 【UK 英国】 【US 美国】
import { setInterval } from 'timers';
import { handleGetZTime,handleGetZTimeObj } from "@/utils/time";
import { getCountiesTime } from "@/axios/user"
export default {
    props:{
        typename:{
            type:String,
            default:''
        }
    },
    data(){
        return {
            timeA:'',
            timeb:'',
            timeArr:{
                us:[],
                uk:[],
                eu:[],
                mx:[],
                jp:[],
                in:[]
            },
            timeDesArr:{
                us:{},
                uk:{},
                eu:{},
                mx:{},
                jp:{},
                in:{}
            }
        }
    },
    created() {
        this.handleGetCountiesTime();  
    },
    methods:{
        handleGetCountiesTime(){
            getCountiesTime().then(res => {
                let {code,data,msg} = res;
                if(code === 1){
                    let {countiesTime} = data;
                    this.timeDesArr.us = handleGetZTimeObj('us');
                    this.timeDesArr.uk = handleGetZTimeObj('uk');
                    this.timeDesArr.eu = handleGetZTimeObj('eu');
                    this.timeDesArr.mx = handleGetZTimeObj('mx');
                    this.timeDesArr.jp = handleGetZTimeObj('jp');
                    this.timeDesArr.in = handleGetZTimeObj('in');
                    this.handleCountryTime(countiesTime.us,'us');
                    this.handleCountryTime(countiesTime.uk,'uk');
                    this.handleCountryTime(countiesTime.eu,'eu');
                    this.handleCountryTime(countiesTime.mx,'mx');
                    this.handleCountryTime(countiesTime.jp,'jp');
                    this.handleCountryTime(countiesTime.uk,'in');
                }
                
            })
        },
        handleCountryTime(locaTime,type){
             let formater = 'YYYY-MM-DD HH:mm:ss';
            let time = this.$moment(locaTime, formater);
            let self = this
            setInterval(function () {
                time.add(1, 's');
                let countryTimeArray = time.format(formater).split(" ");
                self.timeArr[type] = countryTimeArray;
            }, 1000);

        },
    },
    destroyed() {
      clearInterval(this.time);
    }
}
</script>
<style lang="scss" scoped>
.container-wrapper-div{
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
                width: 90%;
                background: #fff;
                text-align: center;     
            }
        }
        .c-title-right{
            background: #fff;
            height: 70px;
            line-height: 7px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .c-t-right-title{
                text-align: center;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-right: 1px solid #DCDCDC;
                .r-title-span{
                    font-family: 'Source Han Sans CN';
                    height: auto;
                    margin-left: 5%;
                    .r-title-span-a{
                        color: #646464;
                        font-size: 24px;
                        font-family: 'Montserrat-Regular';
                    }
                    .r-title-span-b{
                        margin-top: 16%;
                        color: #BFBFBF;
                        font-size: 14px;
                        font-family: 'Source Han Sans CN';
                    }
                }
            }
            .c-t-right-select{
                padding-right: 20px;
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