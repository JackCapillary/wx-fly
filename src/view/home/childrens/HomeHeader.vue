<template>
  <div id="home-header">
    <div id="home-top">
      <div class="home-left">
        <img src="../../../assets/images/logo.png" alt="">
        <span class="title">弹弹科技</span>
      </div>
      <div class="home-right">
        <span @click="showMenu" class="icon iconfont icon-iconset0195"></span>
      </div>
    </div>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal=true class="home-popup">
      <div class="menu">
        <div class="arrow"></div>
        <div class="item" @click="jump('bet')">
          <span class="icon iconfont icon-touzhujilu iconbetrecord"></span>
          <span class="text">订单记录</span>
        </div>
        <!-- <div class="item" @click="jumpTo('/mine/AfterNoList')">
        <span class="icon iconfont icon-jianyi iconAfterNo"></span>
        <span class="text">追号记录</span>
      </div>
      <div class="item" @click="jumpTo('/mine/cashs')">
        <span class="icon iconfont icon-jiaoyimingxi iconbetrecord"></span>
        <span class="text">交易明细</span>
      </div>
      <div class="item" @click="jumpTo('/mine/PriceLimit')">
        <span class="icon iconfont icon-moneys-copy iconbetrecord"></span>
        <span class="text">玩法限额</span>
      </div>
      <div class="item" @click="jumpTo('/mine/report')" >
        <span class="icon iconfont icon-tongjibaobiao iconbetrecord"></span>
        <span class="text">报表统计</span>
      </div> -->
        <div class="item" @click="jump('news')">
          <span class="icon iconfont icon-tubiao10 iconbetrecord"></span>
          <span class="text">消息记录</span>
        </div>
        <div v-if="loginState === 1" class="item" @click="goBack">
          <span class="icon iconfont icon-xiangzuo2"></span>
          <span class="text">退出</span>
        </div>
        <div v-if="loginState === 0" class="item" @click="goIn">
          <span class="icon iconfont icon-xiangyou2"></span>
          <span class="text">登录/注册</span>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      loginState: 'loginState',
    }),
  },
  data() {
    return {
      popupVisible: false,
    };
  },
  methods: {
    // ...mapActions({
    //   hideCarousel: 'toHideCarousel',
    //   showCarousel: 'toShowCarousel',
    //   goBack: 'toGoBackTo',
    // }),
    jump(name) {
      if (this.loginState === 0) {
        this.popupVisible = false;
        this.$store.dispatch({
          type: 'changeLoginModal',
          param: true,
        });
        this.$router.push({ name: 'Login_Register' });
      } else {
        if (name === 'bet') {
          this.$store.dispatch({
            type: 'showHintMessage',
            param: '开发设计中',
          });
          return;
        }
        this.$router.push({ name });
      }
    },
    goBack() {
      this.popupVisible = false;
      this.$store.dispatch({
        type: 'commitLoginOut',
      });
    },
    goIn() {
      this.popupVisible = false;
      this.$store.dispatch({
        type: 'changeLoginModal',
        param: true,
      });
      this.$router.push({ name: 'Login_Register' });
    },
    showMenu() {
      this.popupVisible = !this.popupVisible;
    },
    jumpTo(path) {
      this.$router.push(path);
    },
    jumpToBet(url) {
      this.$router.push({ path: `${url}`, query: { fcType: '' } });
    },
  },
};
</script>

<style lang="scss" scoped>
#home-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
}

#home-top {
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex;
  height: 50px;
  width: 100%;
  line-height: 50px;
  background-color: #303538;
  color: #fff;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;

  .home-left {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex;
    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: left;
    padding-left: 0.2rem;
    img {
      width: 50px;
      height: 50px;
    }
    span {
      margin-left: 10px;
      font-size: 18px;
    }
  }

  .home-right {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: right;
    padding-right: 0.2rem;

    .icon {
      font-size: 25px;
    }
  }

  .left,
  .right {
    width: 2rem;
  }

  .left {
    text-align: left;
    padding-left: 0.2rem;

    .back {
      font-size: 18px;
    }
  }

  .right {
    text-align: right;
    padding-right: 0.2rem;

    .icon {
      font-size: 25px;
    }
  }

  .middle {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: center;

    .title {
      font-size: 18px;
    }
  }
}

.home-popup {
  top: 0;
  left: auto;
  right: 0;

  .menu {
    position: absolute;
    top: 50px;
    right: 5px;
    left: auto;
    width: 120px;
    height: auto;
    font-size: 16px;
    background-color: #fff;
    border-radius: 5px;
    // border: 0.5px solid #ccc;
    border: 1px solid #ccc;
    border-bottom: none;

    .item {
      // border-bottom: 0.5px solid #ccc;
      border-bottom: 1px solid #ccc;
      line-height: 20px;
      padding: 10px;
      text-align: center;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      .icon {
        font-size: 20px;
        color: #000;
        margin-right: 5px;
      }

      .text {
        color: #333;
      }

      &:last-child {
        border-bottom: none;
      }
    }

    .arrow {
      width: 0;
      height: 0;
      border: 10px solid #fff;
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      position: absolute;
      top: -20px;
      right: 5px;
    }
  }
}

#home-user {
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  //display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  height: 50px;
  line-height: 50px;
  width: 100%;
  background-color: #fff;
  // border-bottom: 0.5px solid #ddd;
  border-bottom: 1px solid #ddd;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: justify;
  -moz-justify-content: space-between;
  -webkit-justify-content: space-between;
  justify-content: space-between;

  .left,
  .right {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 20px;
    color: #343434;
  }

  .left {
    padding-left: 0.4rem;
    text-align: left;
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    //display: flex;
    -webkit-box-pack: start;
    -moz-justify-content: flex-start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
    color: #eee;

    .icon {
      font-size: 24px;
    }

    .name {
      font-size: 16px;
      margin: 0 5px;
    }
  }

  .right {
    padding-right: 0.4rem;
    text-align: right;
    color: #eee;
    font-size: 18px;
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    //display: flex;
    -webkit-box-pack: end;
    -moz-justify-content: flex-end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    .icon {
      font-size: 24px;
    }

    .money {
      font-size: 16px;
      margin: 0 5px;
    }
  }
}
</style>
