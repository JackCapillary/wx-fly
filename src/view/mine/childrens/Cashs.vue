<template>
<div id="mine-container">
    <MineHeader
    :clickLeft ="goBack"
    :title = "title"/>
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
      </ul>
    </div>
    <div class="mine-content">
      <div class="header">
        <div class="item-h item-h-t1">交易时间</div>
        <div class="item-h item-h-t2">明细</div>
        <div class="item-h item-h-t2">存入取出</div>
        <div class="item-h item-h-t2">金额</div>
      </div>
      <div class="main">
        <scroller class="main-scroller"
          :on-refresh="refresh"
          :on-infinite="infinite"
          :min-content-height="480"
          ref="scroller"
        >
          <div  v-if="mineCashsData.length > 0" >
            <div v-for="(item,i) in mineCashsData" :key="i" @click="clickItemRow(item)">
              <div class="item-content" >
                <div class="t1">{{item.adddate}}</div>
                <div class="t2">{{item.cash_do_typeTxt}}</div>
                <div class="t3">{{item.cash_typeTxt}}</div>
                <div class="t4">{{item.cash_num}}</div>
              </div>
            </div>
          </div>
          <NoData :visiable="mineCashsData.length <= 0" />
        </scroller>
      </div>
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
  computed: {
    ...mapGetters({
      mineCashsData: 'mineCashsData',

      Page: 'Page',
      Pagenum: 'Pagenum',
      Pagecount: 'Pagecount',
      Recordcount: 'Recordcount',
    }),
  },
  data() {
    return {
      status: 'today',
      title: '交易明细',
      week: 'this',
    };
  },
  mounted() {
    this.toggleRecord('today');
  },
  methods: {
    ...mapActions({
      setMineDateTime: 'setMineDateTime',
      getUserCashsData: 'getUserCashsData',
      setDataEmpty: 'setDataEmpty',
      showAppLoading: 'showAppLoading',
      hideAppLoading: 'hideAppLoading',
      updatePageData: 'updatePageData',
    }),
    goBack() {
      this.$router.go(-1);
    },
    getTime(n) {
      const time = (1000 * 60 * 60 * 24 * n);
      const date = new Date(new Date().getTime() + time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    },
    clickItemRow(item) {
      item.show = !item.show;
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
      }
//      const fcType = this.$route.query.fcType;
//      if (fcType === '' || fcType === 'undefined' || fcType === 'null') {
      this.setMineDateTime({
        starttime: start,
        endtime: end,
        fcType: '',
      });
//      }
      this.showAppLoading();
      this.getUserCashsData({ act: 'empty' }).then(() => {
        this.hideAppLoading();
      });
    },
    infinite(done) {
      // 没有数据
      if (this.mineCashsData.length > this.Recordcount || this.Page >= this.Pagecount) {
        done(true);
        return;
      }
      this.getUserCashsData({ act: 'add' }).then(() => {
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
      this.getUserCashsData({ act: 'empty' }).then(() => {
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
  margin-top:50px;
  background-color: #fff;
}

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
    // border-right: 0.5px solid #eee;
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
  // border-bottom: 0.5px solid #ccc;
  border-bottom: 1px solid #ccc;
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
    // border-top: 0.5px solid #ccc;
    border-top: 1px solid #ccc;
    // border-bottom: 0.5px solid #ccc;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    .item-h{
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
    left: 0;
    right: 0;
    top: 50px;
    bottom: 0;
    width: 100%;
    .item-content{
      height: 45px;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      font-size: 16px;
      text-align: center;
      // border-bottom: 0.5px solid #ccc;
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
      min-width: px2rem(90px);
    }
    .t1{
      width: 90px;
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
