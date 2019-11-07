<template>
    <div></div>
</template>
<script>
import { avoidLanding } from '@/axios/user';
import Cookies from "js-cookie";
import { setSessionStorage} from "@/utils";
import { getToken, setToken, removeToken } from "@/utils/auth";
import {setMenu} from '@/utils/store.js'
export default {
    data(){
        return {

        }
    },
    created(){
        this.handleAvoidLanding();
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
            },
        }
    },
    methods:{
        GetUrlParam(paraName) {
            var url = document.location.toString();
            var arrObj = url.split("?");

            if (arrObj.length > 1) {
                var arrPara = arrObj[1].split("&");
                var arr;

                for (var i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split("=");

                    if (arr != null && arr[0] == paraName) {
                        return arr[1];
                    }
                }
                return "";
            }
            else {
                return "";
            }
        },
        handleAvoidLanding(){
            let token = this.GetUrlParam('token');
            if(token){
                avoidLanding(token).then(res => {
                    let {code,msg,data} = res;
                    if(code === 1){
                        let {authentication,pscUsername,pscUserId} = data;
                        let user = {username:pscUsername,userid:pscUserId}
                        setSessionStorage("user",user);
                        Cookies.set('Admin-Token', token);                   
                        this.$router.push({ path: "/shopview" });
                    }else{
                        this.$router.push({ path: "/login" });
                    }
                })
            }else{
                this.$Message.error('请传入Token!')
            }
            
        }
    }
}
</script>