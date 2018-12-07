<template>
  <div class="mine-record">
    <MineHeader
    :clickLeft ="goBack"
    :title = "title"/>
    <div id="dateTab"> <span> 投注日期： {{addday}}</span> </div>
    <div class="bet-container">
      <scroller>
        <div class="bet-list" v-if="mineBetData.length > 0">
          <div class="bet-item" v-for="(item,index) in mineBetData" :key="index">
            <div class="one">
              <span class="name">{{item.fc_typeTxt}}</span>
              <span class="time">{{item.adddate}}</span>
            </div>
            <div class="two">
              <div  class="qishu">第{{item.periods}}期</div>
              <div class="zhudan">注单号：{{item.order_num}}</div>
            </div>
            <div class="three">
              <span class="ball-left">{{item.gameplayTxt}}</span>
              <span class="ball-right">{{item.input_nameTxt}}</span>
            </div>
            <div class="four">
              <div class="left">
                <span class="mixi">投注：{{item.bet}}</span>
              </div>
              <div class="center">
                <span class="mixi">结果：{{item.statusTxt}}</span>
              </div>
              <div class="right">
                <span class="mixi">派彩金额：</span>
                <span class="win">{{item.win}}</span>
              </div>
            </div>
          </div>
        </div>
        <NoData :visiable="mineBetData.length <= 0" />
      </scroller>
    </div>

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import MineHeader from './MineHeader';
import NoData from '../../global/NoData';

export default {
  components: {
    MineHeader,
    NoData,
  },
  data() {
    return {
      status: 'today',
      title: '投注记录',
      date: '',
      addday: '',
    };
  },
  computed: {
    ...mapGetters({
      mineBetData: 'mineBetData',
      starttime: 'starttime',
      endtime: 'endtime',
    }),
  },
  created() {
    const query = this.$route.query;
    this.addday = query.addday;
    // console.warn(query.addday);
    // this.date = query.date;
    this.renderDetail(query);
  },
  methods: {
    ...mapActions({
      showAppLoading: 'showAppLoading',
      hideAppLoading: 'hideAppLoading',
      getReportUserBetData: 'getReportUserBetData',
      updatePageData: 'updatePageData',
    }),
    goBack() {
      this.$router.go(-1);
    },
    getEndTime(n) {
      const time = (1000 * 60 * 60 * 24 * 1);
      const date = new Date(new Date(n).getTime() + time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    },
    renderDetail({ addday, fcType }) {
      // const end = this.getEndTime(date);
      this.showAppLoading();
      this.updatePageData({
        Page: 0,
        Pagenum: 100,
        Pagecount: 0,
        Recordcount: 0,
      });
      this.getReportUserBetData({ act: 'empty', addday, fcType }).then(() => {
        this.hideAppLoading();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../style/_variables.scss';
@import '../../../style/_functions.scss';

#dateTab{
  margin-top:50px;
  text-align: center;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  background-color:#fff;
  // border-bottom: 0.5px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.bet-container{
  position: absolute;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  width: 100%;

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

.bet-list{
  min-height: 500px;
  height: auto;
  overflow:hidden;
}


.bet-item{
  background-color: #fff;
  border-radius: 10px;
  padding: 0 10px;
  font-size: 14px;
  margin: 10px;
  box-shadow: 1px 1px 1px #ccc;

  .one,.two,.three{
    // border-bottom: 0.5px solid #eee;
    border-bottom: 1px solid #eee;
  }

  .one {
    height: auto;
    padding: 5px 0;
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

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;
    .name{
      color:orange;
      font-size: 18px;
    }
    .time{
      display: inline-block;
      height: 25px;
      line-height: 25px;
      margin-left: 10px;
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
    padding: 5px 0;
  }
  .three{
    min-height: 40px;
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
    -webkit-box-align: start;
    -moz-align-items: flex-start;
    -webkit-align-items: flex-start;
    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
    line-height: 40px;
    span{
      flex:1;
      font-size: 20px;
    }
    .ball-left{
      flex:1;
    }
    .ball-right{
      flex:2;
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
    padding: 5px 0;

    .win{
      color: $primary;
    }
  }
}



</style>
