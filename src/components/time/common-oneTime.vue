<template>
    <div class="container-wrapper">
        <Row class="container-title">
            <iCol span="3" class="c-title-left">
                <div class="c-t-left-name">{{typename}}</div>
            </iCol>
            <iCol span="21" class="c-title-right">
                <Row>
                    <iCol span="20" class="c-t-right-title">
                        <img  :src="img" :style="{'width':'44px','height':'44px','borderRadius':'20px'}"/>
                        <span class="r-title-span">{{timeName}} ：{{countryTimeOne}}</span>
                        <span class="r-title-time">{{countryTimeTwo}}</span>
                    </iCol>
                    <iCol span="4" class="c-t-right-select"><Select></Select></iCol>
                </Row>
            </iCol>
        </Row>

    </div>
</template>
<script>
// 【CA 加拿大】 【FR 法国】 【DE 德国】 【IN 印度】 【IT 意大利】 【JP 日本】 【MX 墨西哥】 【ES 西班牙】 【UK 英国】 【US 美国】
import { setInterval } from 'timers';
import { handleGetZTime } from "@/utils/time";
import { mapGetters } from "vuex";
import Select from '../container/Header/Select';
import { getSessionStorage } from "@/utils";
export default {
    props:{
        typename:{
            type:String,
            default:''
        }
    },
    components:{
        Select
    },
    data(){
        return {
            timeName:'',
            countryTimeOne:'',
            countryTimeTwo:'',
            time: '',
            img:''
        }
    },
    computed:{
        ...mapGetters(['user_info'])
    },
    created() {
        let self = this
        if(typeof getSessionStorage('userInfo') == 'undefined' || getSessionStorage('userInfo') == '' || getSessionStorage('userInfo') == null){
            setTimeout(function(){
                self.handleTime(); 
            },1500);
        }else{
            self.handleTime(); 
        }
             
    },
    methods:{
        handleTime(){
            let locaTime = getSessionStorage('userInfo').locaTime;
            let obj = handleGetZTime(getSessionStorage('userInfo').user_country);
            this.img = obj["img"];
            let timeArr = locaTime.split("：");
            this.timeName = timeArr[0] + ' ';
            let formater = 'YYYY-MM-DD HH:mm:ss';
            let time = this.$moment(timeArr[1], formater);
            let self = this
            setInterval(function () {
                time.add(1, 's');
                let countryTimeArray = time.format(formater).split(" ");
                self.countryTimeOne = countryTimeArray[0];
                self.countryTimeTwo = countryTimeArray[1];
            }, 1000);
           
        },
    },
    destroyed() {
      clearInterval(this.time);
    }
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
                width: 90%;
                background: #fff;
                text-align: center;     
            }
        }
        .c-title-right{
            background: #fff;
            .c-t-right-title{
                text-align: center;
                height: 70px;
                display: flex;
                align-items: center;
                justify-content: center;
                .r-title-span{
                    font-family: 'Source Han Sans CN';
                    font-size: 16px;
                    color: #A5A5A5;
                    margin-left: 2%;
                }
                .r-title-time{
                    font-size: 30px;
                    font-family: 'Montserrat-Bold';
                    width: 190px;
                    color: #9A96FB;
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