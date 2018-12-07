// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue';
import FastClick from 'fastclick';
import VueScroller from "vue-scroller";
import axios from 'axios';
import App from './App';
import router from './router';
import store from "./store";
import {
  Button,
  Tabbar,
  TabItem,
  Cell,
  Header,
  TabContainer,
  TabContainerItem,
  Popup,
  Swipe,
  SwipeItem,
  Switch,
  DatetimePicker,
  Picker,
  Lazyload,
  Field,
  Indicator,
  Radio,
  Spinner
} from "mint-ui";
import StarRating from 'vue-star-rating';
import "amfe-flexible";
import "babel-polyfill";
import "./assets/styles/reset.css";

Vue.use(VueScroller);
Vue.use(Lazyload, {
  preLoad: 1
});

Vue.prototype.$ajax = axios;

Vue.config.productionTip = false;
FastClick.attach(document.body);

// mint-ui use
Vue.component(Button.name, Button);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Cell.name, Cell);
Vue.component(Header.name, Header);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Popup.name, Popup);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Picker.name, Picker);
Vue.component(Radio.name, Radio);
Vue.component(Switch.name, Switch);
Vue.component(Field.name, Field);
Vue.component(Spinner.name, Spinner);

Vue.component('star-rating', StarRating);

router.beforeEach((to, from, next) => {
  const browser = {
    versions: (function () {
      const u = navigator.userAgent,
        app = navigator.appVersion;
      return {
        //移动终端浏览器版本信息
        trident: u.indexOf("Trident") > -1,
        presto: u.indexOf("Presto") > -1,
        webKit: u.indexOf("AppleWebKit") > -1,
        gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
        iPhone: u.indexOf("iPhone") > -1,
        iPad: u.indexOf("iPad") > -1,
        webApp: u.indexOf("Safari") == -1,
        weixin: u.indexOf("MicroMessenger") > -1,
        qq: u.match(/\sQQ/i) == " qq"
      }; //IE内核 //opera内核 //苹果、谷歌内核 //火狐内核 //是否为移动终端 //ios终端 //android终端或者uc浏览器 //是否为iPhone或者QQHD浏览器 //是否iPad //是否web应该程序，没有头部与底部 //是否微信 //是否QQ
    })(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };
  window.usersBrowser = browser;
  if (
    browser.versions.mobile ||
    browser.versions.ios ||
    browser.versions.android ||
    browser.versions.iPhone ||
    browser.versions.iPad
  ) {
    next();
  } else {
    document.body.style.textAlign = 'center';
    document.body.style.height = '100%';
    document.body.style.lineHeight = document.body.clientHeight + 'px';
    document.body.innerHTML = '请用手机访问'
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
