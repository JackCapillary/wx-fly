<template>
    <div>
        <MineHeader
                :clickLeft ="goBack"
                :title = "title"/>
        <div id="app-footer">
            <div class="item" @click="goOpenbet('tab1')">
                <div class="icon-box">
                    <span v-if="active !== 'tab1'" class="icon iconfont icon-1 icon-shouyeweixuanzhong" ></span>
                    <span v-if="active === 'tab1'" style="color: #dc3545;" class="icon iconfont icon-1 icon-shouye3" ></span>
                </div>
                <span v-if="active !== 'tab1'" class="text">连红榜</span>
                <span v-if="active === 'tab1'" style="color: #dc3545;" class="text">连红榜</span>
            </div>
            <div class="item" @click="goOpenbet('tab2')">
                <div class="icon-box">
                    <span v-if="active !== 'tab2'" class="icon iconfont icon-1 icon-huiqiandai" ></span>
                    <span v-if="active === 'tab2'" style="color: #dc3545;" class="icon iconfont icon-1 icon-hongqiandai" ></span>
                </div>
                <span v-if="active !== 'tab2'" class="text">新秀榜</span>
                <span v-if="active === 'tab2'" style="color: #dc3545;" class="text">新秀榜</span>
            </div>
            <div class="item" @click="goOpenbet('tab3')">
                <div class="icon-box">
                    <span v-if="active !== 'tab3'" class="icon iconfont icon-1 icon-jiangbei1"></span>
                    <span v-if="active === 'tab3'" style="color: #dc3545;" class="icon iconfont icon-1 icon-kaijianganxia"></span>
                </div>
                <span v-if="active !== 'tab3'" class="text">高收榜</span>
                <span v-if="active === 'tab3'" style="color: #dc3545;" class="text">高收榜</span>
            </div>
        </div>
        <div class="content">
            <mt-tab-container v-model="active">
                <mt-tab-container-item id="tab1">
                    <mt-cell v-for="(n, index) in 10" :key="index">{{n}}</mt-cell>
                </mt-tab-container-item>
                <mt-tab-container-item id="tab2">
                    <mt-cell v-for="(n, index) in 5" :key="index" title="tab-container 2"></mt-cell>
                </mt-tab-container-item>
                <mt-tab-container-item id="tab3">
                    <mt-cell v-for="(n, index) in 7" :key="index" title="tab-container 3"></mt-cell>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>
<script>
import MineHeader from './MineHeader';

export default{
  components: {
    MineHeader,
  },
  data() {
    return {
      title: '大神榜单',
      active: 'tab1',
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goOpenbet(key) {
      this.active = key;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../style/_functions.scss';
@import '../../../style/_variables.scss';
    #app-footer{
        z-index:9999;
        position: fixed;
        left: 0;
        right:0;
        top: px2rem(50px);
        height: px2rem(50px);
        /*padding-top: 5px;*/
        border-bottom:1px solid #ddd;
        background-color:#fff;
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
        flex:1;
        height: px2rem(50px);
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
    .icon-box{
        position:relative;
        width: px2rem(24px);
        height: px2rem(24px);
        margin-bottom: px2rem(5px);
    }
    .icon{
        position: absolute;
        font-size: 24px;
        line-height: px2rem(24px);
        display:none;
    }
    .icon-1{
        display:block;
    }
    .text{
        /*display: inline-block;*/
        /*width: 50px;*/
        font-size:10px;
        /*position: absolute;*/
        /*top: 31px;*/
        /*left: px2rem(22.5px);*/
        /*text-align: center;*/
        /*margin-top: px2rem(25px);*/
        /*margin: 0 auto;*/
    }
    &.router-link-active .icon{
         color: $primary;
         display:block;
     }
    &.router-link-active .icon-1{
         display:none;
     }
    &.router-link-active .text{
         color: $primary;
     }
    }
    }
    .content{
        margin-top: px2rem(110px);
    }
</style>