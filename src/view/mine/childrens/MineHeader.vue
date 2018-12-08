<template>
  <div class="header">
    <div class="left" @click="clickLeft">
      <span class="icon iconfont icon-jiantouzuo"></span>
      <span class="text">返回</span>
    </div>
    <div class="middle"><span class="title">{{ title }}</span></div>
    <div class="right" @click="clickRight"><span>{{ rightText }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    title: String,
    clickLeft: Function,
    rightText: String,
    clickRight: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      appStatus: 'appStatus',
    }),
  },
  methods: {
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
    flex:1;
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
