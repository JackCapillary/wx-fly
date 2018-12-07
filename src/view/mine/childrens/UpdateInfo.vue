<template>
  <div class="updateInfo">
    <div class="header">
      <div
        class="left"
        @click="clickLeft"
      >
        <span class="icon iconfont icon-jiantouzuo"></span>
        <span class="text">返回</span>
      </div>
      <div class="middle"><span class="title">资料修改</span></div>
      <div class="right"><span></span></div>
    </div>
    <!-- <scroller> -->
      <div>
        <mt-field
          label="新用户名"
          placeholder="请输入新用户名"
          :state="userState"
          v-model="userName"
        ></mt-field>
        <mt-field
          label="密码"
          placeholder="请输入原始密码"
          :state="oldPassWordState1"
          type="password"
          v-model="oldPassWord1"
        ></mt-field>
        <mt-button
          style="background-color:green"
          size="large"
          type="primary"
          @click="updateUserName"
        >修改用户名</mt-button>
        <mt-field
          label="新邮箱"
          placeholder="请输入新邮箱"
          :state="emailState"
          type="email"
          v-model="email"
        ></mt-field>
        <mt-field
          label="密码"
          placeholder="请输入原始密码"
          :state="oldPassWordState2"
          type="password"
          v-model="oldPassWord2"
        ></mt-field>
        <mt-button
          style="background-color:green"
          size="large"
          type="primary"
          @click="updateEmail"
        >修改邮箱</mt-button>
        <mt-field
          label="原始密码"
          placeholder="请输入原始密码"
          :state="oldPassWordState3"
          type="password"
          v-model="oldPassWord3"
        ></mt-field>
        <mt-field
          label="新密码"
          placeholder="请输入新密码"
          :state="newPassWordState3"
          type="password"
          v-model="newPassWord3"
        ></mt-field>
        <mt-button
          style="background-color:green"
          size="large"
          type="primary"
          @click="updatePassWord"
        >修改密码</mt-button>
      </div>
    <!-- </scroller> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
      email: "",
      oldPassWord1: "",
      oldPassWord2: "",
      oldPassWord3: "",
      newPassWord3: "",
      userState: "",
      emailState: "",
      oldPassWordState1: "",
      oldPassWordState2: "",
      oldPassWordState3: "",
      newPassWordState3: "",
      interval: ''
    };
  },
  methods: {
    updateUserName() {
      if (!this.userName && !this.oldPassWord1) {
        this.userState = "warning";
        this.oldPassWordState1 = "warning";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "您要输入点东西嘛"
        });
      } else if (this.userName && !this.oldPassWord1) {
        this.userState = "success";
        this.oldPassWordState1 = "warning";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "密码还没输入呢"
        });
      } else if (!this.userName && this.oldPassWord1) {
        this.userState = "warning";
        this.oldPassWordState1 = "success";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "用户名还没输入呢"
        });
      } else if (this.userName && this.oldPassWord1) {
        this.userState = "success";
        this.oldPassWordState1 = "success";
        const params = {
          type: "updateUserName",
          baseUserName: JSON.parse(localStorage.getItem("USERS_INFO")).userName,
          userName: this.userName,
          passWord: this.oldPassWord1
        };
        this.$store.dispatch({
          type: "updateInfo",
          param: params
        });
      }
    },
    updateEmail() {
      if (!this.email && !this.oldPassWord2) {
        this.emailState = "warning";
        this.oldPassWordState2 = "warning";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "您要输入点东西嘛"
        });
      } else if (this.email && !this.oldPassWord2) {
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
          this.oldPassWordState2 = "warning";
          this.$store.dispatch({
            type: "showHintMessage",
            param: "密码还没输入呢"
          });
        }
      } else if (!this.email && this.oldPassWord2) {
        this.emailState = "warning";
        this.oldPassWordState2 = "success";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "邮箱还没输入呢"
        });
      } else if (this.email && this.oldPassWord2) {
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
          this.oldPassWordState2 = "success";
          const params = {
            type: "updateEmail",
            baseUserName: JSON.parse(localStorage.getItem("USERS_INFO"))
              .userName,
            email: this.email,
            passWord: this.oldPassWord2
          };
          this.$store.dispatch({
            type: "updateInfo",
            param: params
          });
        }
      }
    },
    updatePassWord() {
      if (!this.newPassWord3 && !this.oldPassWord3) {
        this.newPassWordState3 = "warning";
        this.oldPassWordState3 = "warning";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "您要输入点东西嘛"
        });
      } else if (this.newPassWord3 && !this.oldPassWord3) {
        this.newPassWordState3 = "success";
        this.oldPassWordState3 = "warning";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "旧密码还没输入呢"
        });
      } else if (!this.newPassWord3 && this.oldPassWord3) {
        this.newPassWordState3 = "warning";
        this.oldPassWordState3 = "success";
        this.$store.dispatch({
          type: "showHintMessage",
          param: "新密码还没输入呢"
        });
      } else if (this.newPassWord3 && this.oldPassWord3) {
        this.newPassWordState3 = "success";
        this.oldPassWordState3 = "success";
        const params = {
          type: "updatePassWord",
          baseUserName: JSON.parse(localStorage.getItem("USERS_INFO")).userName,
          newPassWord: this.newPassWord3,
          passWord: this.oldPassWord3
        };
        this.$store.dispatch({
          type: "updateInfo",
          param: params
        });
      }
    },
    clickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.updateInfo {
  height: auto;
  background-color: #eee;
  width: 100%;
  position: absolute;
  top: 50px; /*no*/
  bottom: 10px; /*no*/
  left: 0;
}
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
</style>
