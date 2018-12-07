<template>
    <div id="mine-container">
        <MineHeader
            :clickLeft ="goBack"
            :title = "title"/>
        <div id="mine-tab">
           <span class="title" @click="openTrendMenu">{{ lotteryName }}<span class="iconfont icon-shangxiajiantou"></span>
      </span>
        </div>
        <div class="mine-content">
            <div class="header">
                <div class="item-h item-h-t1">玩法类型</div>
                <div class="item-h item-h-t2">单注限额</div>
                <div class="item-h item-h-t2">单期限额</div>
                <div class="item-h item-h-t2">退水比例</div>
            </div>
            <div class="main">
                <scroller class="main-scroller">
                    <div  v-if="priceLimitData.length > 0" >
                        <div v-for="(item,i) in priceLimitData" :key="i" >
                            <div class="item-content">
                                <div class="t1">{{item.name}}</div>
                                <div class="t2">{{item.limit_min}}~{{item.single_note_max}}</div>
                                <div class="t3">{{item.single_field_max}}</div>
                                <div class="t4">{{item.rakeback}}</div>
                            </div>
                        </div>
                    </div>
                    <NoData :visiable="priceLimitData.length <= 0" />
                </scroller>
            </div>
        </div>
        <TrendChoose :showMenu="showMenu" :closeTrendMenu="closeTrendMenu" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MineHeader from './MineHeader';
import NoData from '../../global/NoData';
import TrendChoose from '../../global/TrendChoose';

export default {
  components: {
    MineHeader,
    NoData,
    TrendChoose,
  },
  computed: {
    ...mapGetters({
      showMenu: 'getLiuhecaiTrendMenu',
      priceLimitData: 'limitData',
      lotteryName: 'selectLotteryName',
    }),
  },
  data() {
    return {
      title: '玩法限额',
    };
  },
  mounted() {
    this.getWelfareTrendData();
    this.$store.dispatch({
      type: 'toCloseLiuhecaiTrendMenu',
    });
  },
  methods: {
    ...mapActions({
      openTrendMenu: 'toOpenLiuhecaiTrendMenu',
      closeTrendMenu: 'toCloseLiuhecaiTrendMenu',
    }),
    getWelfareTrendData() {
      const param = {
        fc_type: this.$route.query.type ? this.$route.query.type : 'ffc_o',
      };
      this.$store.dispatch({
        type: 'toGetLimitData',
        param,
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
    @import '../../../style/_variables.scss';
    @import '../../../style/_functions.scss';

    #mine-tab{
        height: 40px;
        margin-top: 50px;
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

        -webkit-box-align: center;
        -moz-align-items: center;
        -webkit-align-items: center;
        align-items: center;

        -webkit-box-pack: center;
        -moz-justify-content: center;
        -webkit-justify-content: center;
        justify-content: center;
        border-bottom: 1px solid #ccc;
    .title {
        display: flex;
        justify-content: center;
    }
    span {
        height: 24px;
        line-height: 24px;
        display: block;
        font-size: 18px;
        padding: 0px 10px;
    // border-right: 0.5px solid #ccc;
        border-right: 1px solid #ccc;
    }
    span.active{
        color:$primary;
    }
    .left{
        padding-left: 20px;
    }
    .right{
        padding-right: 20px;
    }
    span:last-child{
        border-right:0;
    }

    }
    .mine-content{
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        position: absolute;
        top: 100px;
        bottom: 50px;
        height: auto;
        width: 100%;
        background-color: #fff;

    .header{
        height: 45px;
        display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        display: -moz-box; /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox; /* 混合版本语法: IE 10 */
        display: -webkit-flex; /* 新版本语法: Chrome 21+ */
        display: flex;
        -webkit-box-align: center;
        -moz-align-items: center;
        -webkit-align-items: center;
        align-items: center;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
    .item-h{
        color: #333;
        text-align: center;
    // border-right: 0.5px solid #ccc;
        border-right: 1px solid #ccc;
    }
    .item-h-t1{
        width: 90px;
    }
    .item-h-t2{
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }
    .item-h:last-child{
        border-right:0;
    }
    }
    .main{
        position: absolute;
        top: 45px;
        bottom: 0;
        left: 0;
        right: 0;
    .item-content{
        height: 45px;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        font-size: 16px;
        text-align: center;
        border-bottom: 1px solid #ccc;
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

        -webkit-box-align: center;
        -moz-align-items: center;
        -webkit-align-items: center;
        align-items: center;

        -webkit-box-pack: center;
        -moz-justify-content: center;
        -webkit-justify-content: center;
        justify-content: center;
        font-size: 14px;
    }
    .t2,.t3,.t4,.t5{
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        min-width: px2rem(60px);
    }
    .t1{
        width: 90px;
    }
    .t5{
        color:$primary;
    }
    .item-content-list{
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

        -webkit-box-align: center;
        -moz-align-items: center;
        -webkit-align-items: center;
        align-items: center;

        -webkit-box-pack: center;
        -moz-justify-content: center;
        -webkit-justify-content: center;
        justify-content: center;
        text-align: center;
        background-color:#eee;
        color:#000;
        height: 40px;
        border-bottom: 1px solid #fff;
        font-size: 14px;
    }
    .item-content-wrap{
    // border-bottom: 0.5px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    }
    .empty{
        color: #666;
        font-size: 16px;
        text-align:center;
        height: 300px;
        line-height: 300px;

    .img{
        width: 200px;
    }
    }
    }


</style>
