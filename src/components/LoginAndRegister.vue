<template>
  <div v-show="loginModal">
    <div class="header">
      <div class="left" @click="clickLeft">
        <span class="icon iconfont icon-jiantouzuo"></span>
        <span class="text">返回</span>
      </div>
      <div class="middle"><span class="title">登录/注册</span></div>
      <div class="right"><span></span></div>
    </div>
    <div class="modalDiv">
      <mt-field label="用户名" placeholder="请输入用户名" :state="userState" v-model="userName"></mt-field>
      <mt-field v-if="!hadLogin" label="邮箱" placeholder="请输入邮箱" :state="emailState" type="email" v-model="email"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" :state="passWordState" type="password" v-model="passWord"></mt-field>
      <mt-button style="background-color:green" v-if="hadLogin" size="large" type="primary" @click="login">登录</mt-button>
      <mt-button style="background-color:green" v-if="!hadLogin" size="large" type="primary" @click="register">注册</mt-button>
      <p v-if="!hadLogin" class="bottomText">已有账号？<a @click="goHadLogin(true)" href="javascript:;">点击登录</a></p>
      <p v-if="hadLogin" class="bottomText">没有有账号？<a @click="goHadLogin(false)" href="javascript:;">点击注册</a></p>
    </div>
    <!-- <div @click="closeModal" class="modalShadow">
    </div> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      // loginModal: true,
      userName: "",
      passWord: "",
      email: "",
      userState: "",
      emailState: "",
      passWordState: "",
      hadLogin: false
    };
  },
  mounted() {
    this.$store.dispatch({
      type: "showHintMessage",
      param: "登录后才可以体验喔"
    });
  },
  computed: {
    ...mapGetters({
      loginModal: "loginModal",
      loginState: "loginState"
    })
  },
  watch: {
    loginState: function(newVal) {
      if (newVal === 1) {
        this.$router.go(-1);
      }
    }
  },
  methods: {
    clickLeft() {
      this.$router.go(-1);
    },
    goHadLogin(e) {
      this.hadLogin = e;
      this.userState = "";
      this.emailState = "";
      this.passWordState = "";
    },
    closeModal() {
      this.$store.dispatch({
        type: "changeLoginModal",
        param: false
      });
    },
    login() {
      if (this.userName) {
        this.userState = "success";
      }
      if (this.passWord) {
        this.passWordState = "success";
      }
      if (this.userName && this.passWord) {
        this.userState = "success";
        this.passWordState = "success";
      }
      if (!this.userName && !this.passWord) {
        this.userState = "warning";
        this.passWordState = "warning";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "您要输入点东西嘛"
        });
        return;
      } else if (!this.userName) {
        this.userState = "warning";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "用户名没输入呢"
        });
        return;
      } else if (!this.passWord) {
        this.passWordState = "warning";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "故意不填密码呢"
        });
        return;
      }
      const params = {
        userName: this.userName,
        passWord: this.passWord
      };
      this.$store.dispatch({
        type: "commitLogin",
        param: params
      });
    },
    register() {
      this.emailState = "warning";
      if (this.userName) {
        this.userState = "success";
      }
      if (this.passWord) {
        this.passWordState = "success";
      }
      if (this.userName && this.passWord) {
        this.userState = "success";
        this.passWordState = "success";
      }
      if (!this.userName && !this.passWord && !this.email) {
        this.userState = "warning";
        this.emailState = "warning";
        this.passWordState = "warning";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "您要输入点东西嘛"
        });
        return;
      } else if (!this.userName) {
        this.userState = "warning";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "用户名没输入呢"
        });
        return;
      } else if (!this.passWord) {
        this.passWordState = "warning";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "故意不填密码呢"
        });
        return;
      } else if (!this.email) {
        this.emailState = "warning";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "邮箱也填一下亲"
        });
        return;
      }
      const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!reg.test(this.email)) {
        this.emailState = "warning";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "更改下邮箱格式"
        });
        return;
      } else {
        this.emailState = "success";
      }
      const params = {
        userName: this.userName,
        email: this.email,
        passWord: this.passWord
      };
      this.$store.dispatch({
        type: "commitRegister",
        param: params
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

  -webkit-box-direction: normal;
  -webkit-box-orient: horizontal;
  -moz-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -moz-justify-content: space-between;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  height: 50px; /*no*/
  color: white;
  z-index: 999;
  background-color: #303538;
  .icon {
    font-size: 20px;
  }
  .left {
    flex: 1.5;
    // padding-left: 10px;
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex;
    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: start;
    -moz-justify-content: flex-start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    .text {
      color: #fff;
      font-size: 16px;
    }
  }
  .right {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    text-align: right;
  }
  .middle {
    flex: 3;
    text-align: center;
    font-size: 18px;
  }
}
.modalDiv {
  // width: 85%;
  // margin: 60px auto 0 auto; /*no*/
  // border: 1px solid #ddd;
  // padding: 5px;
  // border-radius: 10px;
  // z-index: 100;
  .bottomText {
    font-size: 14px;
    color: #000;
    padding: 10px 0;
    background-color: #fff;
  }
}
.modalShadow {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 99;
  background: #000;
}
</style>
