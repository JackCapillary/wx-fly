<template>
  <div class="mine">
    <div class="mine-header">
      <div class="left">
        <!-- <span v-if="!appStatus" @click="routeBack()" class="icon iconfont icon-xiangyou2"></span> -->
        <span @click="routeBack()" class="icon iconfont icon-xiangzuo2"></span>
      </div>
      <div class="middle">我的</div>
      <div class="right"></div>
    </div>
    <scroller>
      <div class="mine-top">
        <div class="avatar">
          <div>
            <img v-if="userBalance.img" class="avatar_img" :src="userBalance.img" alt="">
          </div>
        </div>
        <div class="info">
          <div class="mine-name">{{ userBalance.userName || '用户名' }}</div>
          <div class="mine-money"><span class="ammount">余额：{{ userBalance.money || '0.00' }}</span></div>
        </div>
      </div>
      <div class="mine-index-c">
        <ul class="mine-index-ul">
           <li class="mine-index-li" @click="mineJumpTo('update_info')">
            <div class="mine-details-d">
              <span class="icon iconfont icon-jianyi iconAfterNo"></span>
              <span>修改资料</span>
            </div>
            <span class="icon iconfont icon-jiantouyou1"></span>
          </li>
          <!-- <li class="mine-index-li" @click="mineJumpTo('love')">
            <div class="mine-details-d">
              <span class="icon iconfont icon-heartline iconbetrecord"></span>
              <span>我的收藏</span>
            </div>
            <span class="icon iconfont icon-jiantouyou1"></span>
          </li> -->
          <li class="mine-index-li" @click="mineJumpTo('bet')">
            <div class="mine-details-d">
              <span class="icon iconfont icon-touzhujilu iconbetrecord"></span>
              <span>订单记录</span>
            </div>
            <span class="icon iconfont icon-jiantouyou1"></span>
          </li>
           <!--
          <li class="mine-index-li mb5" @click="mineJumpTo('cashs')">
            <div class="mine-details-d" style="border-bottom: none">
              <span class="icon iconfont icon-jiaoyimingxi icondetails"></span>
              <span class="">交易明细</span>
            </div>
            <span class="icon iconfont icon-jiantouyou1"></span>
          </li> -->
          <!--<li class="mine-index-li mb5" @click="mineJumpTo('rank')">-->
          <!--<div class="mine-details-d" style="border-bottom: none">-->
          <!--<span class="icon iconfont icon-zoushitu icondetails"></span>-->
          <!--<span class="">大神榜单</span>-->
          <!--</div>-->
          <!--<span class="icon iconfont icon-jiantouyou1"></span>-->
          <!--</li>-->
          <!-- <div class="item-pd"></div>
          <li class="mine-index-li" @click="mineJumpTo('Price_limit')">
            <div class="mine-details-d">
              <span class="icon iconfont icon-moneys-copy iconreport"></span>
              <span class="">玩法限额</span>
            </div>
            <span class="icon iconfont icon-jiantouyou1"></span>
          </li>
          <li class="mine-index-li" @click="mineJumpTo('report')">
            <div class="mine-details-d">
              <span class="icon iconfont icon-tongjibaobiao iconreport"></span>
              <span class="">报表统计</span>
            </div>
            <span class="icon iconfont icon-jiantouyou1"></span>
          </li> -->
          <li class="mine-index-li" @click="mineJumpTo('news')">
            <div class="mine-details-d" style="border-bottom: none">
              <span class="icon iconfont icon-tubiao10 iconnews"></span>
              <span class="">消息记录</span>
            </div>
            <span class="icon iconfont icon-jiantouyou1"></span>
          </li>
          <!-- <div class="item-pd"></div> -->
          <!-- <li class="mine-index-li" >
            <div class="mine-details-d">
              <span class="icon iconfont icon-gantanhao iconabout"></span>
              <span class="">关于</span>
            </div>
            <span class="icon iconfont icon-jiantouyou1"></span>
          </li> -->
        </ul>
        <div v-if="loginState === 1" class="logOFF">
          <span @click="goBack()" class="icon iconfont icon-xiangzuo2 iconout"></span>
          <span @click="goBack()" class="fontout">退出</span>
        </div>
        <div v-if="loginState === 0" class="logOFF">
          <span @click="goIn()" class="icon iconfont icon-xiangyou2 iconout"></span>
          <span @click="goIn()" class="fontout">登录/注册</span>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {};
  },
  created() {
    // this.setCanGetCategory();
  },
  computed: {
    ...mapGetters({
      userBalance: "getUserBalance",
      loginState: "loginState"
    })
  },
  methods: {
    mineJumpTo(name) {
      if (!localStorage.getItem("USERS_INFO")) {
        this.$store.dispatch({
          type: "changeLoginModal",
          param: true
        });
        this.$router.push({ name: "Login_Register" });
        return;
      } else {
        if (name === 'bet') {
          this.$store.dispatch({
            type: "showHintMessage",
            param: "开发设计中"
          });
          return;
        }
        this.$router.push({ name: name });
      }
    },
    routeBack() {
      this.$router.go(-1);
    },
    goBack() {
      this.$store.dispatch({
        type: "commitLoginOut"
      });
    },
    goIn() {
      this.$store.dispatch({
        type: "changeLoginModal",
        param: true
      });
      this.$router.push({ name: "Login_Register" });
    }
    // ...mapActions({
    //   showAppCategory: 'showAppCategory',
    //   goBack: 'toGoBackTo',
    // }),
    // mineJumpTo(type) {
    //   this.$router.push({ name: type });
    // },
    // mineJumpToBet(url) {
    //   this.$router.push({ path: `${url}`, query: { fcType: '' } });
    // },
    // setCanGetCategory() {
    //   this.$store.dispatch({
    //     type: 'toSetCanGetCategory',
    //   });
    // },
  }
};
</script>

<style lang='scss' scoped>
.mine {
  height: auto;
  background-color: #eee;
  width: 100%;
  position: absolute;
  top: 50px; /*no*/
  bottom: 50px; /*no*/
  left: 0;
}

.mine-header {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px; /*no*/
  width: 100%;
  background-color: #303538;
  font-size: 18px;
  color: #fff;
  line-height: 50px; /*no*/
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex;
  -webkit-box-direction: normal;
  -webkit-box-orient: horizontal;
  -moz-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
  .left,
  .right {
    flex: 1;
    padding: 0 10px;
    text-align: left;
    .icon {
      font-size: 24px;
    }
  }
  .middle {
    flex: 3;
    text-align: center;
  }
}

.mine-top {
  // margin-top: px2rem(50px);
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex;
  -webkit-box-direction: normal;
  -webkit-box-orient: horizontal;
  -moz-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: start;
  -moz-align-items: flex-start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
  -webkit-box-pack: justify;
  -moz-justify-content: space-between;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  // border-top: 0.5px solid #ddd;
  border-top: 1px solid #ddd;
  // border-bottom: 0.5px solid #ddd;
  border-bottom: 1px solid #ddd;
  .avatar {
    width: 60px;
    height: 60px;
    background-color: #eee;
    border-radius: 30px;
    .avatar_img {
      width: 50px;
    }
  }
  .info {
    flex: 1;
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -moz-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
    padding-left: 10px;
    .mine-name {
      text-align: left;
      font-size: 20px;
    }
    .mine-money {
      display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
      display: -moz-box; /* 老版本语法: Firefox (buggy) */
      display: -ms-flexbox; /* 混合版本语法: IE 10 */
      display: -webkit-flex; /* 新版本语法: Chrome 21+ */
      display: flex;
      -webkit-box-align: center;
      -moz-align-items: center;
      -webkit-align-items: center;
      align-items: center;
      font-size: 18px;
      .icon {
        font-size: 20px;
        display: inline-block;
        color: gold;
        margin-right: 10px;
      }
      .ammount {
        font-size: 16px;
        color: #333;
      }
    }
  }
}

.mine-index-c {
  height: 100%;
}
.mine-index-ul {
  margin-top: 10px;
  border-top: 1px solid #ddd;
}
.mine-index-li {
  line-height: 40px;
  height: 40px;
  padding-left: 15px;
  /*padding: 0 10px 0 10px;*/
  font-size: 16px;
  /*border-bottom: 1px solid #ddd;*/
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  /*display: flex;*/
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: justify;
  -moz-justify-content: space-between;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  background-color: #fff;
}
.logOFF {
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  /*display: flex;*/
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;
  background-color: #fff;
  margin-top: 20px;
  padding: 5px;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
  .fontout {
    font-size: 16px;
  }
}

.item-pd {
  height: 10px;
  border-bottom: 1px solid #ddd;
}

.mine-details-d {
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  /*display: flex; !* 新版本语法: Opera 12.1, Firefox 22+ *!*/
  width: 100%;
  border-bottom: 1px solid #ddd;
  -webkit-box-direction: normal;
  -webkit-box-orient: horizontal;
  -moz-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
}
.mine-index-t {
  font-size: 16px;
}
.iconbetrecord {
  color: #000;
  font-size: 26px;
  margin-right: 15px;
}
.icondetails {
  color: red;
  font-size: 26px;
  margin-right: 15px;
}

.iconAfterNo {
  color:#000;
  font-size: 22px;
  margin-left: 3px;
  margin-right: 15px;
}

.iconreport {
  color: lightskyblue;
  font-size: 26px;
  margin-right: 15px;
}
.iconnews {
  color: #000;
  font-size: 26px;
  margin-right: 15px;
}
.iconabout {
  color: lightgreen;
  font-size: 26px;
  margin-right: 15px;
}
.iconout {
  // color: lightskyblue;
  font-size: 26px;
  margin-right: 15px;
}
</style>
