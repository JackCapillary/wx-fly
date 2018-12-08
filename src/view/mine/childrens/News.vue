<template>
  <div id="mine-container">
    <MineHeader :clickLeft="goBack" :title="title" />
    <div id="mine-tab">
      <span class="left" :class="status=='public'? 'active':''" @click="toggleRecord('public')">公告信息</span>
      <span class="right" :class="status=='private'? 'active':''" @click="toggleRecord('private')">个人信息</span>
    </div>
    <div class="mine-content">
      <div class="main">
        <scroller>
          <template v-if="status==='public'">
            <div v-if="mineNoticeData.length>0">
              <div class="message-list" v-for="(item, i) in mineNoticeData" :key="i">
                <div class="item">
                  <div class="top">
                    <div class="time"><span class="icon iconfont icon-riqi" style="margin-right:10px"></span>{{item.addDate}}</div>
                  </div>
                  <div class="bottom">
                    <div class="title">{{item.title}}</div>
                    <div class="text" :class="[item.showAll ?  'all' : '']">
                      {{item.content}}
                    </div>
                    <div v-if="item.content.length > 46" class="btn" @click="clickShowAllBtn(item,i)">
                      <span>{{ item.showAll ? '收起' : '展开'}}</span>
                      <span class="icon iconfont" :class="[item.showAll ?  'icon-zhankai' : 'icon-zhankai1']"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <NoData :visiable="mineNoticeData.length <= 0" />
          </template>
          <template v-else>
            <div v-if="mineMesssageData.length>0">
              <div class="message-list" v-for="(item, i) in mineMesssageData" :key="i">
                <div class="item">
                  <div class="top">
                    <div class="time"><span class="icon iconfont icon-riqi" style="margin-right:10px"></span>{{item.addDate}}</div>
                  </div>
                  <div class="bottom">
                    <div class="title">{{item.title}}</div>
                    <div class="text">
                      {{item.content}}
                    </div>
                    <div v-if="item.content.length > 46" class="btn" @click="clickShowAllBtn(item,i)">
                      <span>{{ item.showAll ? '收起' : '展开'}}</span>
                      <span class="icon iconfont" :class="[item.showAll ?  'icon-zhankai' : 'icon-zhankai1']"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <NoData :visiable="mineMesssageData.length <= 0" />
          </template>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MineHeader from './MineHeader';
import NoData from '../../../components/NoData';

export default {
  components: {
    MineHeader,
    NoData,
  },
  computed: {
    ...mapGetters({
      mineMesssageData: 'mineMesssageData',
      mineNoticeData: 'mineNoticeData',
    }),
  },
  data() {
    return {
      status: 'public',
      title: '消息中心',
    };
  },
  mounted() {
    this.toggleRecord('public');
  },
  methods: {
    ...mapActions({
      getUserMessageData: 'getUserMessageData',
    }),
    goBack() {
      this.$router.go(-1);
    },
    getTime(n) {
      const time = 1000 * 60 * 60 * 24 * n;
      const date = new Date(new Date().getTime() + time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    },
    toggleRecord(type) {
      this.status = type;
      let msgType = '';
      if (this.status === 'public') {
        msgType = 'notice';
      } else if (this.status === 'private') {
        msgType = 'message';
      }
      const sendData = {
        userName: localStorage.getItem('USERS_INFO')
          ? JSON.parse(localStorage.getItem('USERS_INFO')).userName
          : '',
        msgType,
      };
      this.getUserMessageData(sendData);
    },
    clickShowAllBtn(item) {
      item.showAll = !item.showAll;
    },
  },
};
</script>

<style lang="scss" scoped>
#mine-tab {
  height: 40px;
  margin-top: 50px;
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
    // border-right: 0.5px solid #eee;
    border-right: 1px solid #eee;
  }
  span.active {
    color: green;
  }
  .left {
    padding-left: 20px;
  }
  .right {
    padding-right: 20px;
  }
  span:last-child {
    border-right: 0;
  }
}
.mine-content {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  top: 90px;
  bottom: 50px;
  height: auto;
  width: 100%;

  .main {
    position: relative;
    height: 100%;
    .message-list {
      padding: 5px 10px;
      .item {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 1px 1px 2px #999;
        .top {
          height: 30px;
          line-height: 30px;
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
          border-bottom: 1px solid #ccc;
          font-size: 16px;
          padding-left: 10px;
          padding-right: 10px;
          .time {
            font-size: 13px;
            color: rgba(0, 0, 0, 0.5);
          }
        }
        .bottom {
          padding: 10px;
          font-size: 14px;
          .title {
            text-align: center;
          }
          .text {
            height: auto;
            max-height: 60px;
            line-height: 30px;
            overflow: hidden;
          }
          .all {
            max-height: none;
          }
          .btn {
            color: green;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
