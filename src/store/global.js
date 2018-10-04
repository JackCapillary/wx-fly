// import {
//   Toast,
//   Indicator,
// } from 'mint-ui';

import {
  SHOW_APP_LOADING,
  HIDE_APP_LOADING,
  NO_BET_CONTENT_TOAST,
  NO_BET_MONEY_TOAST,
} from './mutationTypes';

export default {
  state: {
    ruleState: false,
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

    [NO_BET_CONTENT_TOAST]() {
      // Toast({
      //   message: '没有下注项',
      //   position: 'middle',
      //   duration: 2000,
      // });
    },

    [NO_BET_MONEY_TOAST]() {
      // Toast({
      //   message: '请输入金额',
      //   position: 'middle',
      //   duration: 2000,
      // });
    },
  },
};
