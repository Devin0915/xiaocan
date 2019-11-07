<template>
  <div class="navbar">
    <div class="left-menu">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
      <breadcrumb class="breadcrumb-container"/>
    </div>
    <div class="right-menu">
      <div class="right-menu-div">
        <div class="right-menu-box">使用指南</div>
        <div class="right-menu-box">数据定义</div>
        <div class="right-menu-box" style="width:200px">
          <img :src="avatar" class="box-img"> {{name}}
        </div>
        <div class="right-menu-box" style="width:50px">
           <Icon type="ios-log-out" :size="23" color="#9A96FB" @click="handleLogOut()"/>
        </div>
      </div>
      
      <!-- <Time />
      <Select style="margin-right: 10px;"/>
      <Screenfull style="margin-right: 10px;" /> 
      <User :message-unread-count="10" :user-avator="avatar"/>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import Screenfull from './Screenfull'
import Time from './Time'
import Select from './Select'
import User from "./User";
import userJpg from '@/assets/images/userimg.png';
import { getSessionStorage,delSessionStorage } from "@/utils";
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    User,
    Time,
    Select
  },
  data(){
    return {
      avatar:userJpg,
      name: getSessionStorage('user').username
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ])
  },
  
  created(){
    let self = this
    if(typeof getSessionStorage('user') == 'undefined' || getSessionStorage('user') == '' || getSessionStorage('user') == null){
        setTimeout(function(){
            self.name =  getSessionStorage('user').username
        },1500);
    }else{
        self.name =  getSessionStorage('user').username
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    handleLogOut() {
      this.$store.dispatch('LogOut').then(() => {
        delSessionStorage('userInfo');
        delSessionStorage('tagsList');
        delSessionStorage('droplistCommonInfo');
        delSessionStorage('user');
        this.$router.push({ path: "/login" });
        // location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .right-menu-div{
    display: flex;
    flex-direction: row;
  }
  .box-img{
    display: inline-block;
    text-align: center;
    background: #ccc;
    color: #fff;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    width: 32px;
    height: 32px;
    margin-right: 5%;
    line-height: 32px;
    border-radius: 4px;
  }
  .right-menu-div .right-menu-box{
    width: 150px;
    text-align: center;
    border-left: 1px solid #444444;
    color: #A5A5A5;
    font-size: 16px;
    font-family: 'Source Han Sans CN';
    cursor: default;
  }
  .navbar {
    display: flex;
    justify-content:space-between;
    .left-menu{
      display: flex;
      justify-content:space-between;
      
      .hamburger-container {
        line-height: 45px;
        height: 50px;
        padding: 0 10px;
      }
    }
    
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      display: flex;
      justify-content:end;
      &:focus{
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
      }
      .international{
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        margin-right: 30px;
        .avatar-wrapper {
          margin-top: 5px;
          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
          }
          .el-icon-caret-bottom {
            cursor: pointer;
          }
        }
      }
    }
  }
</style>