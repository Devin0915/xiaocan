<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <!-- <Badge :dot="!!messageUnreadCount"> -->
       <Avatar :src="userAvator"/>
      <span class="username">{{ this.username }}</span>
      <!-- </Badge> -->
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      
      <DropdownMenu slot="list">
        <!-- <DropdownItem name="username">
          {{ this.username }}
        </DropdownItem> -->
        <DropdownItem divided name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { getSessionStorage } from "@/utils";
import { mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      username:''
    }
  },
  created() {
    this.username = getSessionStorage('username');
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.user{
  &-avator-dropdown{
    cursor: pointer;
    display: inline-block;
    // height: 64px;
    vertical-align: middle;
    // line-height: 64px;
    .ivu-badge-dot{
      top: 16px;
    }
    .username{
      color: #A5A5A5;
      font-size: 16px;
      font-family: 'Source Han Sans CN';
    }
  }
}
</style>
