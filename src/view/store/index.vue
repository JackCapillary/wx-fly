<template>
  <div class="store">
    <div class="header">
      <div class="left">
        <span @click="routeBack()" class="icon iconfont icon-xiangzuo2"></span>
      </div>
      <div class="middle">商店</div>
      <div class="right"></div>
    </div>
    <scroller>
      <ul style="padding:10px">
        <li class="li">
          <img style="width: 100%;height: 200px;" src="http://tantanwin.com/serverAssets/store1.jpg" alt="图片">
          <h4 class="title">企业网站一套搭建服务</h4>
          <span class="detail">服务器，域名，网站编辑一套</span>
          <b>￥据需求估价</b>
          <star-rating :rating="4.5" :increment="0.5" :read-only="true" :glow="10" :rounded-corners="true" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
        </li>
        <li class="li">
          <img style="width: 100%;height: 200px;" src="http://tantanwin.com/serverAssets/store2.jpg" alt="图片">
          <h4 class="title">UI设计服务</h4>
          <span class="detail">图片设计，APP设计，网站设计服务</span>
          <b>￥据需求估价</b>
          <star-rating :rating="5" :increment="0.5" :read-only="true" :glow="10" :rounded-corners="true" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
        </li>
      </ul>
    </scroller>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    routeBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.store {
  height: auto;
  background-color: #eee;
  width: 100%;
  position: absolute;
  top: 50px;
  bottom: 50px;
  left: 0;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    background-color: #303538;
    font-size: 18px;
    color: #fff;
    line-height: 50px;
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
  .li{
    margin-bottom: 10px;
    display: flex;
    padding:5px;
    flex-direction: column;
    background-color:#fff;
    align-items: center;
    .title{
      font-size: 15px;
    }
    b{
      font-size: 15px;
    }
    .detail{
      font-size: 12px
    }
  }
}
</style>
