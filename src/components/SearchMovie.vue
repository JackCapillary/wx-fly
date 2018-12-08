<template>
  <div>
    <div class="header">
      <div class="left" @click="clickLeft">
        <span class="icon iconfont icon-jiantouzuo"></span>
        <span class="text">返回</span>
      </div>
      <div class="middle"><span class="title">电影</span></div>
      <div class="right"><span></span></div>
    </div>
    <div>
      <mt-field label="电影名" placeholder="写下您喜欢的电影" type="textarea" rows="4" v-model="introduction"></mt-field>
      <mt-button style="background-color:green" size="large" type="primary" @click="commitMovieTo">提交</mt-button>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      introduction: '',
    };
  },
  methods: {
    clickLeft() {
      this.$router.go(-1);
    },
    commitMovieTo() {
      // console.log(this.loginState)
      if (this.loginState === 0) {
        this.$store.dispatch({
          type: "changeLoginModal",
          param: true
        });
        this.$router.push({ name: 'Login_Register' })
      } else {
        if (!this.introduction) {
          this.$store.dispatch({
            type: "showHintMessage",
            param: "要输入点东西嘛"
          });
          return;
        } 
          if (localStorage.getItem("setMovieTime")) {
            if (
              new Date().getTime() - localStorage.getItem("setMovieTime") <
              5000
            ) {
              this.$store.dispatch({
                type: "showHintMessage",
                param: "别刷！停一停！"
              });
              return;
            }
          } else {
            localStorage.setItem("setMovieTime", new Date().getTime());
          }
        
        if (!localStorage.getItem("USERS_INFO")) {
           this.$router.push({ name: "Login_Register" });
          return;
        }
        const info = {
          userName: localStorage.getItem("USERS_INFO")
            ? JSON.parse(localStorage.getItem("USERS_INFO")).userName
            : "",
          likeMovie: this.introduction
        };
        this.$store.dispatch({
          type: "commitMovie",
          param: info
        });
      }
    },
  },
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
  height: 50px;
  color: white;
  z-index: 999;
  background-color: #303538;
  .icon {
    font-size: 20px;
  }
  .left{
    flex:1.5;
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
    .text{
      color:#fff;
      font-size: 16px;
    }
  }
  .right{
    flex: 1;
    padding: 10px;
    font-size: 16px;
    text-align:right;
  }
  .middle{
    flex:3;
    text-align: center;
    font-size: 18px;
  }
}
</style>
