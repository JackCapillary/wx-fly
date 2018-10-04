// import {
//   Toast,
//   Indicator,
// } from 'mint-ui';

import {
  SHOW_APP_LOADING,
  HIDE_APP_LOADING,
} from './mutationTypes';

export default {
  state: {
    // ruleState: false,
  },

  getters: {
    // getRuleState: state => state.ruleState,
  },

  actions: {
    showAppLoading: ({
      commit,
    }) => {
      commit(SHOW_APP_LOADING);
    },

    hideAppLoading: ({
      commit,
    }) => {
      commit(HIDE_APP_LOADING);
    },
  },

  mutations: {
    [SHOW_APP_LOADING]() {
      // Indicator.open({
      //   text: '加载中...',
      //   spinnerType: 'snake',
      // });
    },

    [HIDE_APP_LOADING]() {
      // Indicator.close();
    },
  },
};
