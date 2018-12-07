<template>
    <div>
        <MineHeader  :clickLeft ="goBack"  :title = "title"/>
        <div v-if="allCat.like" class="father-view">
            <scroller>
                <div v-if="allCat.like.length > 0">
                    <div class="content" v-show="showLikeState">
                        <div class="item" v-for="(type,j) in allCat.like" :key="j"  @click="jumpTo(type)" >
                            <a href="javascript:void(0)">
                                <img class="img animated bounce" :src="type.img_path" alt="" v-lazy="type.img_path">
                                <span>{{ type.name }}</span>
                            </a>
                            <span
                                @click.stop="likeIt(type, $event)"
                                :class="[ type.is_like == 2 ? 'icon-shoucang-on':'icon-heartline']"
                                class="like iconfont "></span>
                            <span class="weihu" v-if="type.is_wh === 2">
                            <span class="tapes">维护中...</span>
                            </span>
                        </div>
                    </div>
                </div>
                <NoData :visiable="allCat.like.length <= 0" />
                <div v-if="allCat.like.length <= 0">
                    <div class="tj-content">
                        <p class="icon-div"><span class="mineIcon icon-tuijian iconfont"></span></p>
                        <p class="top">为您推荐彩票：</p>
                    </div>
                    <div class="content noTop">
                        <div class="item" v-for="(type,j) in allCat.recommend" :key="j"  @click="jumpTo(type)" >
                            <a href="javascript:void(0)">
                                <img class="img animated bounce" :src="type.img_path" alt="" v-lazy="type.img_path">
                                <span>{{ type.name }}</span>
                            </a>
                            <span
                                @click.stop="likeIt(type, $event)"
                                :class="[ type.is_like == 2 ? 'icon-shoucang-on':'icon-heartline']"
                                class="like iconfont "></span>
                            <span class="weihu" v-if="type.is_wh === 2">
                            <span class="tapes">维护中...</span>
                            </span>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { Toast } from 'mint-ui';
import { nameTabType } from '../../../common/setting';
import MineHeader from './MineHeader';
import NoData from '../../global/LoveNoData';

export default{
  data() {
    return {
      likeDate: new Date().getTime(),
      title: '我的收藏',
      first: 1,
    };
  },
  components: {
    MineHeader,
    NoData,
  },
  computed: {
    ...mapGetters({
      allCat: 'allCat',
      showLikeState: 'showLikeState',
    }),
  },
  mounted() {
    this.$store.dispatch({
      type: 'getAllCat',
    });
  },
  methods: {
    ...mapActions({
      getHomePageData: 'getHomePageData',
      changeTypeLikeStatus: 'changeTypeLikeStatus',
    }),
    goBack() {
      this.$router.go(-1);
    },
    jumpTo(item) {
      if (item.is_wh === 2) {
        Toast({
          message: '该彩票正在维护中',
          duration: 1000,
        });
        return;
      }
      Object.keys(nameTabType).forEach((key) => {
        if (item.type === key) {
          const jumpType = nameTabType[key];
          this.$router.push({ name: jumpType, query: { type: item.type } });
        }
      });
    },
    likeIt(item, event) {
      if (this.first !== 1) {
        const cha = (new Date().getTime() - this.likeDate) / 1000;
        const netTime = 5 - parseInt(cha, 10);
        if (cha < 5) {
          Toast({
            message: `请稍后${netTime}秒后再试`,
            duration: 1000,
          });
          return;
        }
      }
      this.first = 0;
      this.likeDate = new Date().getTime();
      event.target.classList.add('animated');
      event.target.classList.add('flash');
      this.changeTypeLikeStatus({ fc_type: item.type, item })
        .then((response) => {
          if (response.ErrorCode) {
            Toast({
              message: response.ErrorMsg,
              duration: 1000,
            });
            this.getHomePageData('love');
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../style/_functions.scss';
.father-view{
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 50px;
    .noTop{
    margin-top: px2rem(5px)!important;
}
.content{
    // margin-top: px2rem(60px);
    height: auto;
    overflow: hidden;
    margin-bottom: px2rem(5px);
    /*background-color: #fff;*/
    .item{
        width: 95%;
        padding: 0.2rem;
        /* float: left; */
        margin: 0 auto;
        margin-top: px2rem(5px);
        text-align: center;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 5px;
        /* border-right: 1px solid #ddd; */
        /* border-bottom: 1px solid #ddd; */
        background-color: #fff;
        position: relative;
        a{
            display: flex;
            padding-left: px2rem(20px);
            align-items: center;
            img{
                width: px2rem(50px);
                height: px2rem(50px);
                display: block;
                /* margin: 0.1rem auto; */
                margin-right: px2rem(30px);
            }
            span{
                font-size: 16px;
            }
        }
        .like{
            display: block;
            width: px2rem(30px);
            height: 30px;
            text-align: center;
            line-height: 30px;
            position: absolute;
            right: 0;
            top: 0;
            color: hotpink;
        }
    }
}
.tj-content {
    position: relative;
    margin-top: px2rem(40px);
    margin-left: px2rem(10px);
    .icon-div{
        background-color: #fff;
        width: px2rem(40px);
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 20px;
        color: #dc3545;
        position: absolute;
        left: 10px;
        top: -10px;
        .mineIcon{
            font-size: 25px;
        }
    }
    .top{
        background: #dc3545;
        color: #fff;
        width: 53%;
        font-size: 16px;
        padding: 5px 0;
        padding-left: px2rem(60px);
        border-radius: 15px;
    }
}
}
</style>