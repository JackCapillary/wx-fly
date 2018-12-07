import Vue from 'vue';
import Vuex from 'vuex';

import home from './modules/home';
import mine from './modules/mine';
import global from './global';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global, // 共用模块
    home, // 子模板
    mine,
  },
});
