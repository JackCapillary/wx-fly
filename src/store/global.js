import {
  Toast,
  Indicator,
} from 'mint-ui';

import {
  SHOW_APP_LOADING,
  HIDE_APP_LOADING,
  HINT_MESSAGE,
  SET_LOGIN_STATUS,
} from './mutationTypes';

import http from '../common/http';

export default {
  state: {
    instanceToast: '',
    loginState: 0,
  },

  getters: {
    instanceToast: state => state.instanceToast,
    loginState: state => state.loginState,
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

    showHintMessage: ({
      commit,
    }, param) => {
      commit(HINT_MESSAGE, param.param);
    },

    setLoginStatus: ({
      commit,
    }) => {
      http.post('gzh/getLoginStatus', {
        userName: localStorage.getItem('USERS_INFO') ? JSON.parse(localStorage.getItem('USERS_INFO')).userName : '',
      }).then((response) => {
        if (response.returnCode === 1) {
          commit(SET_LOGIN_STATUS, 1);
          commit('USERS_INFO', JSON.parse(localStorage.getItem('USERS_INFO')));
        } else if (response.returnCode === 0) {
          commit(SET_LOGIN_STATUS, 0);
          commit('USERS_INFO', {});
          localStorage.removeItem('USERS_INFO');
          commit(HINT_MESSAGE, response.returnMessage);
        }
      });
    },

  },

  mutations: {
    [SET_LOGIN_STATUS](state, value) {
      // console.log(value);
      state.loginState = value;
    },

    [SHOW_APP_LOADING]() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'double-bounce',
      });
    },

    [HIDE_APP_LOADING]() {
      Indicator.close();
    },

    [HINT_MESSAGE](state, returnMessage) {
      state.instanceToast = Toast({
        message: returnMessage,
        duration: 1000,
        iconClass: 'icon icon-success',
      });
    },
  },
};
