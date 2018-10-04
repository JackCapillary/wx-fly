import Vue from 'vue';
import Vuex from 'vuex';

import fast3 from './modules/fast3';
import global from './global';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global, // 共用模块
    fast3, // 子模板
  },
});
