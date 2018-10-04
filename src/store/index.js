import Vue from 'vue';
import Vuex from 'vuex';

import test from './modules/test';
import global from './global';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global, // 共用模块
    test, // 子模板
  },
});
