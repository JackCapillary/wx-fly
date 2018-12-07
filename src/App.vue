<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  created() {
    this.$store.dispatch({
      type: "setLoginStatus"
    });
  },
  data() {
    return {};
  },
  mounted() {
    // window.addEventListener(
    //   "onorientationchange" in window ? "orientationchange" : "resize",
    //   function() {
    //     if (window.screen.width < 1000) {
    //       if (window.orientation === 90 || window.orientation === -90) {
    //         document.body.style.textAlign = "center";
    //         document.body.style.height = "50%";
    //         document.body.style.lineHeight = document.body.clientHeight + "px";
    //         document.body.innerHTML = "请让手机竖起来";
    //       } else {
    //         window.location.reload();
    //       }
    //     }
    //   },
    //   false
    // );
    var screenDirection = window.matchMedia("(orientation: portrait)");
    screenDirection.addListener(handleOrientationChange);
    handleOrientationChange(screenDirection);
    let s = false;
    const _ = this;
    function handleOrientationChange(screenDirection) {
      if (screenDirection.matches) {
        if (s) {
          // window.location.reload();
          window.location.href = _.AndroidReload(window.location.href); //不传参，默认是“t”
          s = false;
        }
        /* The device is currently in portrait orientation */
        /* 竖屏处理事件 */
      } else {
        if (this.$router.name !== "home") {
          s = true;
          if (window.usersBrowser.versions.android) {
            alert("为了更好的体验，请让手机竖起来");
          } else {
            document.body.style.textAlign = "center";
            document.body.style.height = "50%";
            document.body.style.lineHeight = document.body.clientHeight + "px";
            document.body.innerHTML = "为了更好的体验，请让手机竖起来";
          }
          /* The device is currently in landscape orientation */
          /* 横屏屏处理事件 */
        }
      }
    }
  },
  watch: {
    $route: "doSomeThing"
  },
  computed: {
    ...mapGetters({
      instanceToast: "instanceToast"
    })
  },
  methods: {
    AndroidReload(url, key) {
      var key = (key || "t") + "="; //默认key是"t",可以传入key自定义
      var reg = new RegExp(key + "\\d+"); //正则：t=1472286066028
      var timestamp = +new Date();
      if (url.indexOf(key) > -1) {
        //有时间戳，直接更新
        return url.replace(reg, key + timestamp);
      } else {
        //没有时间戳，加上时间戳
        if (url.indexOf("?") > -1) {
          var urlArr = url.split("?");
          if (urlArr[1]) {
            return urlArr[0] + "?" + key + timestamp + "&" + urlArr[1];
          } else {
            return urlArr[0] + "?" + key + timestamp;
          }
        } else {
          if (url.indexOf("#") > -1) {
            return url.split("#")[0] + "?" + key + timestamp + location.hash;
          } else {
            return url + "?" + key + timestamp;
          }
        }
      }
    },
    doSomeThing() {
      // console.log(111)
      Indicator.close();
      if (this.instanceToast) {
        this.instanceToast.close();
      }
      this.$store.dispatch({
        type: "setLoginStatus"
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 50px; /*no*/
}
</style>
