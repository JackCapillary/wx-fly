<template>
  <div id="app-footer" v-if="$route.name !== 'update_info'">
    <router-link tag="div" class="item" to="/home">
      <div class="icon-box">
        <span class="icon iconfont icon-1 icon-shouyeweixuanzhong"></span>
        <span class="icon iconfont icon-shouye3"></span>
      </div>
      <span class="text">首页</span>
    </router-link>
    <router-link tag="div" class="item" to="/store">
      <div class="icon-box">
        <span class="icon iconfont icon-1 icon-huiqiandai"></span>
        <span class="icon iconfont icon-hongqiandai"></span>
      </div>
      <span class="text">商店</span>
    </router-link>
    <!-- <div class="item" @click="goOpenbet()">
      <div class="icon-box">
        <span v-if="$route.path !== '/lottery'" class="icon iconfont icon-1 icon-jiangbei1"></span>
        <span v-else style="color: #dc3545;" class="icon iconfont icon-1 icon-kaijianganxia"></span>
      </div>
      <span v-if="$route.path !== '/lottery'" class="text">开奖</span>
      <span v-else style="color: #dc3545;" class="text">开奖</span>
    </div> -->
    <!--<router-link tag="div" class="item" to="/lottery">-->
    <!--<div class="icon-box">-->
    <!--<span class="icon iconfont icon-1 icon-jiangbei1"></span>-->
    <!--<span class="icon iconfont icon-kaijianganxia"></span>-->
    <!--</div>-->
    <!--<span class="text">开奖</span>-->
    <!--</router-link>-->
    <router-link tag="div" class="item" to="/mine">
      <div class="icon-box">
        <span class="icon iconfont icon-1 icon-wodeweixuanzhong"></span>
        <span class="icon iconfont icon-wode2"></span>
      </div>
      <span class="text">我的</span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  watch: {
    $route: 'changeSlider',
  },

  created() {
    this.changeSlider();
  },

  methods: {
    goOpenbet() {
      if (this.$route.query.fcType) {
        this.$router.push({ name: 'app_lottery', query: { fcType: this.$route.query.fcType } });
      } else {
        this.$router.push({ name: 'app_lottery' });
      }
    },
    changeSlider() {
      if (this.$route.path === '/lottery' || this.$route.path === '/mine/bet') {
        this.$store.dispatch({
          type: 'toChangeCanPicker',
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
#app-footer {
  z-index: 99;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  padding-top: 5px;
  // padding-bottom: 5px;
  border-top: 1px solid #ddd;
  background-color: #fff;
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
  .item {
    flex: 1;
    height: 43px;
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -moz-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: justify;
    -moz-justify-content: space-around;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    .icon-box {
      position: relative;
      width: 24px;
      height: 24px;
      margin-bottom: 5px;
    }
    .icon {
      position: absolute;
      font-size: 24px;
      line-height: 24px;
      display: none;
    }
    .icon-1 {
      display: block;
    }
    .text {
      font-size: 10px;
    }
    &.router-link-active .icon {
      color: green;
      display: block;
    }
    &.router-link-active .icon-1 {
      display: none;
    }
    &.router-link-active .text {
      color: green;
    }
  }
}
</style>
