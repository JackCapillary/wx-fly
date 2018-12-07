<template>
<div id="mine-container">
    <MineHeader
    :clickLeft ="goBack"
    :title = "title"/>
    <div id="mine-tab">
      <span class="left" :class="status=='thisweek'? 'active':''"  @click="toggleRecord('thisweek')">本周</span>
      <span class="right" :class="status=='prevweek'? 'active':''" @click="toggleRecord('prevweek')">上周</span>
    </div>
    <div class="mine-content">
      <div class="header">
        <div class="item-h item-h-t1">日期／彩种</div>
        <div class="item-h item-h-t2">总笔数</div>
        <div class="item-h item-h-t2">总投注</div>
        <div class="item-h item-h-t2">有效投注</div>
        <div class="item-h item-h-t2">结果</div>
      </div>
      <div class="main">
        <scroller class="main-scroller">
          <div  v-if="mineReportData.length>0" >
            <div v-for="(item,i) in mineReportData" :key="i" >
              <div class="item-content" @click="clickItemRow(item)" >
                <div class="t1">{{item.addday}}</div>
                <div class="t2">{{item.bet_count}}</div>
                <div class="t3">{{item.bet}}</div>
                <div class="t4">{{item.valid_bet}}</div>
                <div class="t5">{{item.win}}</div>
              </div>
              <div class="item-content-wrap" v-if="item.show">
                <div class="item-content-list"  v-for="(n,j) in item.list" :key="j" @click="clickItemDetailRow(item.addday, n)">
                  <div class="t1">{{n.fc_typeTxt}}</div>
                  <div class="t2">{{n.bet_count}}</div>
                  <div class="t3">{{n.bet}}</div>
                  <div class="t4">{{n.valid_bet}}</div>
                  <div class="t5">{{n.win}}</div>
                </div>
              </div>
            </div>
            <div class="item-content">
              <div class="t1">总计</div>
              <div class="t2">{{mineReportTotal.bet_count}}</div>
              <div class="t3">{{mineReportTotal.bet}}</div>
              <div class="t4">{{mineReportTotal.valid_bet}}</div>
              <div class="t5">{{mineReportTotal.win}}</div>
            </div>
          </div>
          <NoData :visiable="mineReportData.length <= 0" />
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
      mineReportData: 'mineReportData',
      mineReportTotal: 'mineReportTotal',
    }),
  },
  data() {
    return {
      status: 'thisweek',
      title: '报表统计',
      week: 'this',
    };
  },
  mounted() {
    this.toggleRecord('thisweek');
  },
  methods: {
    ...mapActions({
      getUserReportData: 'getUserReportData',
      setDataEmpty: 'setDataEmpty',
      showAppLoading: 'showAppLoading',
      hideAppLoading: 'hideAppLoading',
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
    clickItemDetailRow(addday, n) {
      this.$router.push({ name: 'report_detail', query: { addday, fcType: n.fc_type } });
    },
    toggleRecord(type) {
      this.status = type;
      let week = '';
      if (this.status === 'thisweek') {
        week = 'this';
      } else if (this.status === 'prevweek') {
        week = 'last';
      }
      this.showAppLoading();
      this.getUserReportData({ week }).then(() => {
        this.hideAppLoading();
      });
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
