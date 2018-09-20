// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue';
import FastClick from 'fastclick';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router';
import "amfe-flexible";
import "babel-polyfill";
import "./styles/reset.css";

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
FastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
