<template>
  <div class="mine-record">
    <MineHeader
    :clickLeft ="goBack"
    :clickRight ="goBet"
    rightText = '去投注'
    :title = "title"
    />
    <div id="dateTab">
      <ul class="record-ul">
        <li class="item" @click="toggleRecord('today')">
          <span :class="status=='today'? 'current':''">今日</span>
        </li>
        <li class="item" @click="toggleRecord('yesterday')" >
          <span :class="status=='yesterday'? 'current':''">昨日</span>
        </li>
        <li class="item" @click="toggleRecord('thisweek')">
          <span :class="status=='thisweek'? 'current':''">最近七日</span>
        </li>
        <li class="item" @click="toggleRecord('choose')">
          <span :class="status=='choose'? 'current':''">自定义</span>
        </li>
      </ul>
    </div>

    <div class="bet-container">
      <scroller
        :on-refresh="refresh"
        :on-infinite="infinite"
        :min-content-height="480"
        ref="scroller"
      >
        <div class="bet-list" v-if="mineBetData.length > 0">
          <div class="bet-item" v-for="(item,index) in mineBetData" :key="index">
            <div class="one">
              <span class="name">{{item.fc_typeTxt}}</span>
              <span class="time"><i class="iconfont icon-riqi"></i><i>{{item.adddate}}</i></span>
            </div>
            <div class="two">
              <div class="samLi" v-if="!item.ball"><span class="same">投注期数：</span>{{item.periods}}</div>
              <!--<div class="samLi"><span class="same">注&nbsp;&nbsp;单&nbsp;&nbsp;号：</span>{{item.order_num}}</div>-->
              <div class="samLi"><span class="same">投注单号：</span>{{item.order_num}}</div>
              <div class="samLi"><span class="same" style="float: left">投注内容：</span><span class="content">{{item.gameplayTxt}}：{{item.input_nameTxt}}</span></div>
              <div class="samLi"><span class="same">总投注额：</span>{{item.bet}}</div>
              <div class="samLi"><span class="same" style="float: left">小单金额：</span><span class="content">{{item.more_money}}</span></div>
              <div class="samLi"><span class="same">派彩金额：</span>{{item.win}}</div>
              <div class="samLi" v-if="item.ball"><span class="same">开奖结果：</span>{{item.ball}}</div>
              <div class="samLi"><span class="same">输赢结果：</span><span :class="[item.statusTxt === '赢' ? 'greenColor' : 'redColor']">{{item.statusTxt}}</span></div>
              <div class="biaoqing">
                <span class="icon iconfont onlyStyle" :class="[item.statusTxt === '赢' ? 'icon-biaoqing2':'',item.statusTxt === '输' ? 'icon-mianwubiaoqing' : '',item.statusTxt === '未结算' ? 'icon-biaoqing' : '',item.statusTxt === '和局'?'icon-wukongbiaoqing':'']"></span>
              </div>
            </div>
          </div>
        </div>
        <NoData :visiable="mineBetData.length <= 0 " />
      </scroller>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import MineHeader from './MineHeader';
import NoData from '../../global/NoData';
import { nameTabType } from '../../../common/setting';

export default {
  components: {
    MineHeader,
    NoData,
  },
  data() {
    return {
      status: 'today',
      title: '投注记录',
    };
  },
  created() {
    this.$store.dispatch({
      type: 'getAlltype',
    });
  },
  computed: {
    ...mapGetters({
      mineBetData: 'mineBetData',
      subTotal: 'subTotal',
      total: 'total',
      starttime: 'starttime',
      endtime: 'endtime',
      fcType: 'fcType',
      Page: 'Page',
      Pagenum: 'Pagenum',
      Pagecount: 'Pagecount',
      Recordcount: 'Recordcount',
    }),
  },
  mounted() {
    const fcType = this.$route.query.fcType;
    this.onlySetMineType({ fcType });
    if (this.$route.query.fcType === '') {
      this.$store.dispatch({
        type: 'toClearMineType',
      });
    }
    this.toggleRecord('today');
  },
  methods: {
    ...mapActions({
      toChangeChooseSlider: 'toChangeChooseSlider',
      onlySetMineTime: 'onlySetMineTime',
      onlySetMineType: 'onlySetMineType',
      getUserBetData: 'getUserBetData',
      updatePageData: 'updatePageData',
      showAppLoading: 'showAppLoading',
      hideAppLoading: 'hideAppLoading',
    }),
    goBack() {
      this.$router.go(-1);
    },
    goBet() {
      if (this.fcType === '') {
        this.$router.push({ name: 'app_betting' });
      } else {
        Object.keys(nameTabType).forEach((key) => {
          if (this.fcType === key) {
            const jumpType = nameTabType[key];
            this.$router.push({ name: jumpType, query: { type: this.fcType } });
          }
        });
      }
    },
    getTime(n) {
      const time = (1000 * 60 * 60 * 24 * n);
      const date = new Date(new Date().getTime() + time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    },
    toggleRecord(type) {
      this.status = type;
      let start = '';
      let end = '';
      this.updatePageData({
        Page: 0,
        Pagenum: 10,
        Pagecount: 0,
        Recordcount: 0,
      });
      this.$refs.scroller.scrollTo(0, 0);
      this.$refs.scroller.resize();
      if (this.status === 'today') {
        start = this.getTime(0);
        end = this.getTime(1);
      } else if (this.status === 'yesterday') {
        start = this.getTime(-1);
        end = this.getTime(0);
      } else if (this.status === 'thisweek') {
        start = this.getTime(-6);
        end = this.getTime(1);
      } else if (this.status === 'choose') {
        this.toChangeChooseSlider('mineBet');
        return;
      }
      this.showAppLoading();
      this.onlySetMineTime({
        starttime: start,
        endtime: end,
      });
      this.getUserBetData({ act: 'empty' }).then(() => {
        // console.log(this.mineBetData.length);
        this.hideAppLoading();
      });
    },
    infinite(done) {
      // 没有数据
      if (this.mineBetData.length > this.Recordcount || this.Page >= this.Pagecount) {
        done(true);
        return;
      }
      this.getUserBetData({ act: 'add' }).then(() => {
        // console.log('infinite done');
        done();
      });
    },
    refresh(done) {
      this.updatePageData({
        Page: 0,
        Pagenum: 10,
        Pagecount: 0,
        Recordcount: 0,
      });
      this.getUserBetData({ act: 'empty' }).then(() => {
        // console.log('refresh done');
        done();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../style/_variables.scss';
@import '../../../style/_functions.scss';

#dateTab{
  margin-top: 50px;
}
.mine-record{
  width:100%;
  height:100%;
  background-color: #fff;
  .record-ul{
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
    padding: 5px;
    margin: 0px;
    height: 40px;
    .item{
      flex:1;
      height: 32px;
      line-height: 32px;
      border-right: 1px solid #eee;
      font-size:16px;
      text-align: center;

      .current{
        background-color:orange;
        border-radius: 5px;
        margin: 0 5px;
        display:block;
        color:#fff;
      }
    }
    .item:last-child{
      border-right: 0;
    }
  }
}

.bet-container{
  position: absolute;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  width: 100%;
  .total_view{
    font-size: 14px;
    position: fixed;
    bottom: 50px;
    left: 0px;
    width: 100%;
    color: #999;
    background: #dadada;
    p{
      padding-left: px2rem(10px)
    }
  }
}

.bet-list{
  min-height: px2rem(500px);
  height: auto;
  overflow:hidden;
}


.bet-item{
  background-color: #fff;
  border-radius: 10px;
  padding: 0 px2rem(10px);
  font-size: 14px;
  margin: px2rem(10px);
  box-shadow: 1px 1px 1px #ccc;

  .one,.two,.three{
    border-bottom: 1px solid #eee;
  }

  .one {
    height: auto;
    padding: px2rem(5px) 0;
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

    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    .name{
      color:orange;
      font-size: 18px;
    }
    .time{
      color: #9e9e9e;
      font-size: 13px;
      i:last-child{
        margin-left: 5px;
      }
    }
  }

  .two {
    height: auto;
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

    -webkit-box-align: start;
    -moz-align-items: flex-start;
    -webkit-align-items: flex-start;
    align-items: flex-start;

    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    padding: px2rem(5px) 0;
    position: relative;
    .biaoqing {
      position: absolute;
      right: 20px;
      top: 20%;
      .onlyStyle {
        font-size: 50px;
        color: orange;
      }
    }
    .samLi {
      /*height: 20px;*/
      /*line-height: 20px;*/
      width: px2rem(260px);
      .content {
        width: px2rem(185px);
        display: inline-block;
        // float: left;
        word-wrap:break-word;
      }
      .same {
        font-size: 13px;
        /*margin-right: 5px;*/
        display: inline-block;
        width: px2rem(70px);
        text-align: right;
      }
      .greenColor {
        color: green;
      }
      .redColor {
        color: #dc3545;
      }
    }
  }
  .three{
    min-height: px2rem(40px);
    height: auto;
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
    line-height: px2rem(40px);
    span{
      font-size: 20px;
    }
    .ball-left{
      font-size: 16px;
      display:block;
      width:px2rem(80px);
    }
    .ball-right{
      font-size: 16px;
      flex:1;
    }
  }
  .four{
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

    -webkit-box-align: start;
    -moz-align-items: flex-start;
    -webkit-align-items: flex-start;
    align-items: flex-start;

    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    padding: px2rem(5px) 0;

    .four-content {
      width: 33%;
      border-right: 1px dashed #ccc;
      text-align: center;

      &:last-child {
        border-right: none;
      }
    }

    .win{
      color: $primary;
    }
  }
}



</style>
