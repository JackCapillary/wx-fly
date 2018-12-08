<template>
  <div id="home-content">
    <scroller>
      <transition name="fade">
        <div
          id="home-slide"
          v-if="carouselStatus"
        >
          <div
            class="close-area"
            @click="carouselStatus = false"
          >
            <span class="icon iconfont icon-close"></span>
          </div>
          <div class="top">
            推荐
          </div>
          <mt-swipe
            :auto="4000"
            :show-indicators="true"
          >
            <mt-swipe-item
              v-for="(item,i) in banner"
              :key="i"
            >
              <img
                class="swipe-img"
                :src="item"
                alt="轮播图片"
              />
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </transition>
      <div id="home-notice">
        <div class="left">
          <span class="icon iconfont icon-gonggao"></span>
        </div>
        <div class="middle">
          <p
            class="relative"
            v-if="mineNoticeData[0]"
          >{{ mineNoticeData[0].content }}</p>
        </div>
        <div
          class="right"
          @click="toNotify"
        >
          <span class="icon iconfont icon-jiantou"></span>
        </div>
      </div>
      <div class="seeMovie">
        <img
          src="../../../assets/images/seeMovie.png"
          alt="看图公仔"
        >
      </div>
      <div style="margin: 15px 0;">
        <video
          width="100%"
          height="200px"
          controls="true"
          preload="auto"
          webkit-playsinline="true"
          playsinline="true"
          x-webkit-airplay="allow"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portraint"
          style="object-fit:fill"
          ref="video"
          v-for="(item, i) in movies"
          :key="i"
          :src="item.video"
          :poster="item.img"
        ></video>
      </div>
      <div class="clickVideo">
        这里是您的独家影院，提交您想看的电影,<br />我们会定期推送给您<br />点这里写下您喜欢的电影<br />
        <mt-button
          style="background-color:green"
          size="small"
          type="primary"
          @click="goChildren"
        >点我</mt-button>
        <!-- <mt-field @click.native.capture="javascript" label="电影名" placeholder="写下您喜欢的电影" type="textarea" rows="4" v-model="introduction"></mt-field> -->
        <!-- <mt-button style="background-color:green" size="large" type="primary" @click="commitMovieTo">提交</mt-button> -->
      </div>
      <div style="height:30px">
      </div>
    </scroller>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      likeDate: new Date().getTime(),
      carouselStatus: true,
      introduction: '',
    };
  },
  created() {},
  mounted() {
    const params = {
      userName: localStorage.getItem('USERS_INFO')
        ? JSON.parse(localStorage.getItem('USERS_INFO')).userName
        : '',
    };
    this.$store.dispatch({
      type: 'getMovie',
      param: params,
    });
  },
  computed: {
    ...mapGetters({
      banner: 'banner',
      movies: 'movies',
      loginState: 'loginState',
      mineNoticeData: 'mineNoticeData',
    }),
  },
  methods: {
    toNotify() {
      this.$router.push({ name: 'news' });
    },
    goChildren() {
      if (!localStorage.getItem('USERS_INFO')) {
        this.$router.push({ name: 'Login_Register' });
        return;
      }
      this.$router.push({ name: 'commit_moive' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/animated.scss";
#home-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 50px;
  background-color: #eee;
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  .seeMovie {
    img {
      width: 70px;
      height: 70px;
    }
  }
  .clickVideo {
    color: #9e9e9e;
    padding: 30px 0;
    height: 160px;
    text-align: center;
    margin: 0 auto;
    font-size: 14px;
    // line-height: 130px;
    width: 100%;
    background-color: #fff;
    background-image: url("../../../assets/images/cnime.png");
    // background-image: url("../../../../static/images/cnime.png");
    background-position: center -40px;
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#home-slide {
  width: auto;
  min-height: 200px; /*no*/
  height: 200px; /*no*/
  background-color: #fff;

  .close-area {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 10px;
    text-align: right;
    z-index: 99;

    .icon-close {
      font-size: 20px;
      color: white;
    }
  }
  .top {
    left: 10px;
    position: absolute;
    color: #fff;
    z-index: 99;
    background-color: #ff5722;
    /* color: #000; */
    border-radius: 25px;
    width: 38px;
    height: 39px;
    top: 10px;
    text-align: center;
    line-height: 39px;
    font-size: 13px;
  }
  .swipe-img {
    width: 100%;
    height: 200px; /*no*/
  }
}

#home-notice {
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex;
  background-color: #fff;
  width: 100%;
  line-height: 45px;
  height: 45px;
  /*padding: 0 px2rem(10px) 0 0;*/
  padding-right: 5px;
  border-bottom: 1px solid #ddd;

  .left {
    position: relative;
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex;
    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;
    // z-index: 999;
    background-color: #fff;
    width: 30px;
    text-align: center;

    .icon {
      font-size: 22px;
      color: green;
    }
  }

  .middle {
    /*width: px2rem(500px);*/
    width: calc(100vw - 20px - 30px);
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    .relative {
      position: relative;
      animation: mymove 20s linear infinite;
    }
  }

  @keyframes mymove {
    from {
      left: 300px;
    }
    to {
      left: -800px;
    }
  }

  .right {
    width: 30px;
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex;
    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
}

.notice {
  width: auto;
  min-width: 375px;
  height: 45px;
  word-break: keep-all;
  display: block;
  // -webkit-transform: translate3d(375px, 0, 0);
  // transform: translate3d(375px, 0, 0);
}

#home-game {
  margin-top: 5px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  font-size: 18px;
  // border-top:0.5px solid #ddd;
  border-top: 1px solid #ddd;
  .title {
    padding: 0.1rem 0.2rem;
    // border-bottom:0.5px solid #ccc;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    font-size: 16px;
  }
  .title-pink {
    border-left: 2px solid pink;
    position: relative;
    .iconPosition {
      position: absolute;
      right: 20px;
    }
  }
  .title-green {
    border-left: 2px solid green;
  }
  .content {
    height: auto;
    overflow: hidden;
    margin-bottom: 5px;
    background-color: #fff;
  }
  .item {
    width: 33.3%;
    padding: 0.2rem;
    float: left;
    text-align: center;
    box-sizing: border-box;
    // border-right:0.5px solid #ddd;
    // border-bottom:0.5px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    position: relative;
    a {
      display: block;
      /*position:relative;*/
    }
    .img-box {
      width: 50px;
      height: 50px;
      display: block;
      margin: 0.1rem auto;
    }
    img {
      width: 50px;
      height: 50px;
      display: block;
      margin: 0.1rem auto;
    }
    span {
      font-size: 14px;
    }
    .weihu {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(33, 33, 33, 0.2);
      box-sizing: border-box;
    }
    .like {
      display: block;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      position: absolute;
      right: 0;
      top: 0;
      color: hotpink;
    }
  }
  .item:nth-child(3n) {
    border-right-width: 0;
  }
  // .item:nth-child(3){
  //   border-right-width:0;
  // }
}
</style>
