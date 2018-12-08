<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  created() {
    this.$store.dispatch({
      type: 'setLoginStatus',
    });
  },
  data() {
    return {};
  },
  mounted() {
    window.addEventListener(
      'onorientationchange' in window ? 'orientationchange' : 'resize',
      () => {
        if (this.$route.name !== 'app_home') {
          if (window.screen.width < 1000) {
            if (window.orientation === 90 || window.orientation === -90) {
              if (window.usersBrowser.versions.android) {
                alert('为了更好的体验，请让手机竖起来');
              } else {
                document.body.style.textAlign = 'center';
                document.body.style.height = '50%';
                document.body.style.lineHeight = `${
                  document.body.clientHeight
                }px`;
                document.body.innerHTML = '为了更好的体验，请让手机竖起来';
              }
            } else if (window.usersBrowser.versions.android) {
              window.location.href = this.AndroidReload(window.location.href);
            } else {
              window.location.reload();
            }
          }
        }
      },
      false,
    );
  },
  watch: {
    $route: 'doSomeThing',
  },
  computed: {
    ...mapGetters({
      instanceToast: 'instanceToast',
    }),
  },
  methods: {
    AndroidReload(url, k) {
      const key = `${k || 't'}=`; // 默认key是"t",可以传入key自定义
      const reg = new RegExp(`${key}\\d+`); // 正则：t=1472286066028
      const timestamp = +new Date();
      if (url.indexOf(key) > -1) {
        // 有时间戳，直接更新
        return url.replace(reg, key + timestamp);
      }
      // 没有时间戳，加上时间戳
      if (url.indexOf('?') > -1) {
        const urlArr = url.split('?');
        if (urlArr[1]) {
          return `${urlArr[0]}?${key}${timestamp}&${urlArr[1]}`;
        }
        return `${urlArr[0]}?${key}${timestamp}`;
      }
      if (url.indexOf('#') > -1) {
        return `${url.split('#')[0]}?${key}${timestamp}${location.hash}`;
      }
      return `${url}?${key}${timestamp}`;
    },
    doSomeThing() {
      // console.log(111)
      Indicator.close();
      if (this.instanceToast) {
        this.instanceToast.close();
      }
      this.$store.dispatch({
        type: 'setLoginStatus',
      });
    },
  },
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
