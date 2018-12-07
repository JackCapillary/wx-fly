<template>
    <div id="mine-container">
        <mt-datetime-picker
            ref="start"
            v-model="startDate"
            type="date"
            @confirm="confirmStartDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日">
        </mt-datetime-picker>
        <mt-datetime-picker
            ref="end"
            v-model="endDate"
            type="date"
            @confirm="confirmEndDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日">
        </mt-datetime-picker>
        <MineHeader
            :clickLeft ="goBack"
            :title = "title"/>
        <div id="mine-tab">
           <span class="title" @click="openTrendMenu">{{ lotteryName }}<i class="iconfont icon-shangxiajiantou"></i>
           </span>
           <div class="chooseTime chooseTimeItem" @click="openStartPicker">
               <i>选择开始时间</i>
               <i><b class="iconfont icon-rili"></b><b>{{timeComputer(startDate)}}</b></i>
           </div>
           <div class="chooseTime lastItem" @click="openEndPicker">
               <i>选择结束时间</i>
               <i><b class="iconfont icon-rili"></b><b>{{timeComputer(endDate)}}</b></i>
           </div>
            <mt-button @click="searchAfterData" type="primary" size="small">搜索</mt-button>
           <!--<mt-switch class="ctrlButton" v-if="afterNoData.length > 0 && lotteryName !== '全部'" v-model="value">{{!value?'关闭':'开启'}}</mt-switch>-->
           <!--<div class="ctrlStatus" v-if="afterNoData.length > 0 && lotteryName !== '全部'" @click="changStatus(afterNoData[0].list[0],'singleAll')"></div>-->
           <!--<div class="ctrlStatus" v-if="afterNoData.length > 0 && lotteryName === '全部'" @click="changStatus('all','all')"></div>-->
        </div>
        <div class="mine-content">
            <scroller
                :min-content-height="480"
                :on-refresh="refresh"
                :on-infinite="infinite"
                ref="scroller"
            >
                <!--<div v-for="(item, index) in afterNoData">-->
                    <!--<div class="order-list">-->
                        <!--<span>投注彩种：{{item.name}}</span>-->
                        <!--<span>追逐几期：{{item.follow}}期</span>-->
                        <!--<span class="look" @click="ctrlShow(index)"><i>{{showId === index ? '收起':'展开'}}详情</i><i class="iconfont lookIcon icon-wangxiakaobei" :class="[showId === index ?'icon-zhankai':'icon-zhankai1']"></i></span>-->
                        <!--&lt;!&ndash;<mt-switch class="ctrlButton" v-model="item.value">{{!item.value?'关闭':'开启'}}</mt-switch>&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="ctrlStatus" @click="changStatus(item,'single')"></div>&ndash;&gt;-->
                    <!--</div>-->
                    <div v-if="afterNoData.length > 0" class="list animated" v-for="(key, i) in afterNoData" :key="i">
                        <div class="item-content">
                            <div class="t1 li-style">追号彩种：{{key.name}}</div>
                            <div class="t1 li-style">添加时间：{{key.adddate}}</div>
                            <div class="t1 li-style">投注期数：{{key.periods}}</div>
                            <div class="t2 li-style">
                                <span>投注内容：</span><span class="content">{{key.trans_bet_info}}</span>
                            </div>
                            <div class="t3 li-style">注单赔率：{{key.odds}}</div>
                            <div class="t4 li-style">投注金额：{{key.bet}}</div>
                            <div class="t5 li-style">可赢金额：{{key.win}}</div>
                            <div class="t5 li-style">输赢结果：<span :style="[Number(key.status) === 3 ? red : '',Number(key.status) === 2 || Number(key.status) === 6 || Number(key.status) === 7 ? green : '' ]">{{statusText[Number(key.status) - 1]}}</span></div>
                            <div class="t6 li-style" v-if="Number(key.status) === 1">
                                <span>操作取消：</span>
                                <div class="close" @click="changStatus(key, 'single')"></div>
                                <span @click="changStatus(key, 'single')">取消</span>
                                <!--<mt-switch v-if="Number(key.status) === 1" v-model="key.value"></mt-switch>-->
                                <!--<div v-if="Number(key.status) === 1" class="ctrlStatus" @click="changStatus(key, 'single')"></div>-->
                            </div>
                        </div>
                    </div>
                <!--</div>-->
                <NoData :visiable="afterNoData.length <= 0" />
            </scroller>
        </div>
        <TrendChoose :showMenu="showMenu" :closeTrendMenu="closeTrendMenu" />
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { mapGetters, mapActions } from 'vuex';
import MineHeader from './MineHeader';
import NoData from '../../global/NoData';
import TrendChoose from '../../global/TrendChoose';
// import { lotteryToChineseName } from '../../../common/setting';

export default {
  components: {
    MineHeader,
    NoData,
    TrendChoose,
  },
  computed: {
    ...mapGetters({
      showMenu: 'getLiuhecaiTrendMenu',
      afterNoData: 'afterNoData',
      lotteryName: 'selectLotteryName',
      starttime: 'starttime',
      endtime: 'endtime',
      Page: 'Page',
      Pagenum: 'Pagenum',
      Pagecount: 'Pagecount',
      Recordcount: 'Recordcount',
    }),
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      red: {
        color: 'red',
      },
      green: {
        color: 'green',
      },
      title: '追号记录',
      statusText: ['追号中(可取消)', '赢', '输', '和局', '无效', '赢', '赢'],
      value: true,
      showId: null,
    };
  },
  mounted() {
    this.getWelfareTrendData();
    this.$store.dispatch({
      type: 'toCloseLiuhecaiTrendMenu',
    });
    this.startDate = new Date();
    this.endDate = new Date(new Date().getTime() + (1000 * 60 * 60 * 24));
    this.$store.dispatch({
      type: 'resetOfterDateTime',
    });
  },
  destroyed() {
    this.$store.dispatch({
      type: 'resetOfterDateTime',
    });
  },
  methods: {
    ...mapActions({
      openTrendMenu: 'toOpenLiuhecaiTrendMenu',
      closeTrendMenu: 'toCloseLiuhecaiTrendMenu',
      updateAfterPageData: 'updateAfterPageData',
      toGetAfterNoData: 'toGetAfterNoData',
      confirmStartDate: 'toConfirmStartDate',
      confirmEndDate: 'toConfirmEndDate',
    }),
    searchAfterData() {
      this.toGetAfterNoData({ act: 'empty' }).then(() => {
      });
    },
    timeComputer(dataTime) {
      const date = new Date(dataTime);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    },
    openStartPicker() {
      this.startDate = new Date();
      this.$refs.start.open();
    },
    openEndPicker() {
      this.endDate = new Date(new Date().getTime() + (1000 * 60 * 60 * 24));
      this.$refs.end.open();
    },
    infinite(done) {
      // 没有数据
      if (this.afterNoData.length > this.Recordcount || this.Page >= this.Pagecount) {
        done(true);
        return;
      }
      this.toGetAfterNoData({ act: 'add' }).then(() => {
        done();
      });
    },
    refresh(done) {
      this.updateAfterPageData({
        cancel: false,
        Page: 0,
        Pagenum: 10,
        Pagecount: 0,
        Recordcount: 0,
      });
      this.toGetAfterNoData({ act: 'empty' }).then(() => {
        done();
      });
    },
    ctrlShow(index) {
//      this.$refs.scroller.scrollTo(0, 0);
      if (this.showId === index) {
        this.showId = null;
      } else {
        this.showId = index;
      }
    },
    changStatus(key, type) {
      MessageBox.confirm('确定取消追号?')
        .then((action) => {
          if (action === 'confirm') {
            let param = {};
            if (type === 'single') {
              key.value = !key.value;
              param = {
                fc_type: key.fc_type,
                order_num: key.order_num,
              };
            } else if (type === 'singleAll') {
              this.value = !this.value;
              param = {
                fc_type: key.fc_type,
              };
            } else if (type === 'all') {
              this.value = !this.value;
              param = {
                fc_type: key,
              };
            }
            this.$store.dispatch({
              type: 'toCancelAfterNoData',
              param,
            });
          }
        });
    },
    getWelfareTrendData() {
      this.updateAfterPageData({
        type: this.$route.query.type ? this.$route.query.type : 'all',
        cancel: false,
        Page: 0,
        Pagenum: 10,
        Pagecount: 0,
        Recordcount: 0,
      });
      this.toGetAfterNoData({ act: 'empty' }).then(() => {
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
        position: relative;
        height: 50px;
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
    .chooseTime{
        position: relative;
        display: flex;
        flex-direction: column;
        width: px2rem(95px);
        justify-content: center;
        align-items: center;
        text-align: center;
        i{
          font-size: 10px;
            b{
                font-size: 10px;
            }
            b:first-child{
                color: #dc3545;
            }
        }
        i:last-child{
            border: 1px solid #ccc;
            width: px2rem(89px);
            height: px2rem(23px);
            line-height: px2rem(22px);
            border-radius: 5px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }
    }
    .chooseTimeItem:after{
        content: '';
        width: 1px;
        height: 65%;
        background-color: #ccc;
        position: absolute;
        right: 0px;
        top: 20%;
    }
    .lastItem{
        margin-right: px2rem(5px);
    }
    .ctrlButton{
        font-size: 15px;
        margin-left: px2rem(20px);
    }
    .ctrlStatus{
        position: absolute;
        top: px2rem(4px);
        width: px2rem(95px);
        height: px2rem(32px);
        right: px2rem(81px);
    }

    .title {
        display: flex;
        justify-content: center;
        font-size: 13px;
        width: px2rem(110px);
    }
    span {
        height: px2rem(24px);
        line-height: px2rem(24px);
        display: block;
        font-size: 18px;
        padding-right: px2rem(5px);;
        border-right: 1px solid #ccc;
    }
    span.active{
        color:$primary;
    }
    .left{
        padding-left: px2rem(20px);
    }
    .right{
        padding-right: px2rem(20px);
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
        .order-list{
            background-color: #fff;
            display: flex;
            flex-direction: column;
            position: relative;
            padding: px2rem(5px);
            margin: px2rem(5px);
            border: 1px solid #ddd;
            border-radius: 5px;
            /*height: 50px;*/
            /*line-height: 35px;*/
            font-size: 13px;
            .look{
                width: px2rem(80px);
                height: px2rem(25px);
                position: absolute;
                bottom: 0;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                left: 0;
                right: 0;
                margin: 0 auto;
                .lookIcon{
                    margin-left: px2rem(5px);
                }
            }
            .ctrlButton{
                position: absolute;
                top: 8px;
                width: px2rem(95px);
                height: px2rem(32px);
                right: 10px;
            }
            .ctrlStatus{
                position: absolute;
                top: 8px;
                width: px2rem(95px);
                height: px2rem(32px);
                right: 10px;
            }
        }
        .list{
            padding: px2rem(5px);
            .item-content{
                background-color: #fff;
                font-size: 14px;
                display: flex;
                flex-direction: column;
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: px2rem(5px);
                /*margin-bottom: px2rem(5px);*/
                .li-style{
                    /*height: 32px;*/
                    line-height: px2rem(32px);
                    .close {
                        margin-right: px2rem(5px);
                        margin-top: px2rem(5px);
                        /* still bad on picking color */
                        background: orange;
                        /* make a round button */
                        border-radius: px2rem(15px);
                        /* center text */
                        line-height: px2rem(20px);
                        text-align: center;
                        height: px2rem(20px);
                        width: px2rem(20px);
                        padding: 1px;
                        position: relative;
                    }
                    /* use cross as close button */
                    .close::before {
                        /*color: red;*/
                        position: absolute;
                        left:0;
                        right:0;
                        font-size: 14px;
                        margin:auto;
                        content: "\2716";
                    }
                }
                .t2{
                   span{
                       float: left;
                       display: inline-block
                   }
                   .content{
                       width: px2rem(280px);
                       word-wrap: break-word
                   }
                }
                .t6{
                    display: flex;
                    flex-direction: row;
                }
                .t5{
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    span{
                        height: px2rem(32px);
                        line-height: px2rem(32px);
                    }
                    .ctrlStatus{
                        position: absolute;
                        top: 0px;
                        width: px2rem(95px);
                        height: px2rem(32px);
                        left: 67px;
                    }
                }
            }
        }
    .header{
        height: px2rem(45px);
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
        width: px2rem(90px);
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
        height: px2rem(45px);
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
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
        width: px2rem(90px);
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
        height: px2rem(40px);
        border-bottom: 1px solid #fff;
        font-size: 14px;
    }
    .item-content-wrap{
        border-bottom: 1px solid #ccc;
    }
    }
    .empty{
        color: #666;
        font-size: 16px;
        text-align:center;
        height: px2rem(300px);
        line-height: px2rem(300px);

    .img{
        width: px2rem(200px);
    }
    }
    }


</style>
