<template>
  <div class="login">
    <div class="login-title">销售参谋</div>
    <div class="login-form">
      <div class="login-logo">
        <span>用户登录</span>
      </div>
      <Form
        :model="ruleForm2"
        status-icon
        ref="formInline"
        :rules="ruleInline"
        class="demo-ruleForm"
      >
        <FormItem prop="username">
          <iInput
            type="text"
            v-model="ruleForm2.username"
            size="large"
            autocomplete="off"
            placeholder="请输入用户名"
          ></iInput>
        </FormItem>
        <FormItem prop="password">
          <iInput
            type="password"
            v-model="ruleForm2.password"
            size="large"
            autocomplete="off"
            placeholder="请输入密码"
          ></iInput>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submitForm('formInline')" class="but" size="large">登 录</Button>
        </FormItem>
        <div data-v-dcb8809c class="autoLogin">
          <label>
            <span class="el-checkbox__label">忘记密码?</span>
          </label>
          <label>
            <span>去注册 ></span>
          </label>
        </div>
      </Form>
    </div>
    <div class="login-bottom">©2019-2020 AMZBI 版权所有</div>
    <div v-if="showRegister">
      <Register :visible.sync="showRegister"></Register>
    </div>
  </div>
</template>
<script>
import Register from "./Register";
export default {
  components: { Register },
  data() {
    return {
      showRegister: false,
      ruleForm2: {
        username: "",
        password: ""
      },
      redirect: undefined,
      ruleInline: {
        username: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            username: this.ruleForm2.username,
            password: this.ruleForm2.password
          };
          this.$store
            .dispatch("Login", params)
            .then(() => {
              this.loading = false;
              this.$router.push({
                path: this.redirect || "/shopview"
              });
            })
            .catch(() => {
              this.loading = false;
            });
        } 
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #ebeff5;
  //background-image: url('../../assets/images/bj1.jpg');
  background-repeat: no-repeat;
  flex-direction: column;
  background-size: 100% 100%;
  .login-title {
    margin: -90px 0 30px;
    font-size: 30px;
    text-align: center;
  }
  .login-form {
    padding: 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.1);
    width: 420px;
    .but {
      width: 100%;
    }
    .login-logo {
      text-align: center;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      margin-bottom: 24px;
      span {
        vertical-align: text-bottom;
        font-size: 16px;
        color: black;
        text-transform: uppercase;
        display: inline-block;
      }
    }
    .autoLogin {
      color: #006eff;
      -webkit-box-pack: justify;
      display: flex;
      display: none;
      justify-content: space-between;
    }
  }
  .login-bottom {
    bottom: 30px;
    color: #808695;
    font-size: 12px;
    position: absolute;
  }
}
</style>
