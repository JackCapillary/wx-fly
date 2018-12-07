import {
  SHOW_APP_LOADING,
  HIDE_APP_LOADING,
  HINT_MESSAGE,
  SET_LOGIN_STATUS,
} from '../mutationTypes';
import http from '../../common/http';

const state = {
  userBalance: {},
  loginModal: true,
  mineMesssageData: [],
  mineNoticeData: [],
};

const mutations = {
  USERS_INFO(stat, usersInfo) {
    state.userBalance = usersInfo;
  },

  CHANGE_LOGIN(stat, status) {
    state.loginModal = status;
  },

  MINE_MESSAGE_DATA(stat, data) {
    const arr = data.map(item => ({ ...item, showAll: false }));
    state.mineMesssageData = arr;
  },

  MINE_NOTICE_DATA(stat, data) {
    const arr = data.map(item => ({ ...item, showAll: false }));
    state.mineNoticeData = arr;
  },

};

const getters = {
  getUserBalance: () => state.userBalance,
  loginModal: () => state.loginModal,
  mineMesssageData: () => state.mineMesssageData,
  mineNoticeData: () => state.mineNoticeData,
};

const actions = {

  changeLoginModal({
    commit,
  }, param) {
    commit('CHANGE_LOGIN', param.param);
  },

  commitLogin({
    commit,
  }, {
    param,
  }) {
    commit(SHOW_APP_LOADING);
    // console.log(param);
    http.post('gzh/login', param).then((response) => {
      if (response.returnCode === 1) {
        commit('USERS_INFO', response.data);
        localStorage.setItem('USERS_INFO', JSON.stringify(response.data));
        commit(SET_LOGIN_STATUS, 1);
        commit(HIDE_APP_LOADING);
        commit(HINT_MESSAGE, response.returnMessage);
      } else {
        commit(HIDE_APP_LOADING);
        commit(HINT_MESSAGE, response.returnMessage);
      }
    });
  },

  commitRegister({
    commit,
  }, {
    param,
  }) {
    commit(SHOW_APP_LOADING);
    // console.log(param);
    http.post('gzh/register', param).then((response) => {
      if (response.returnCode === 1) {
        // console.log(response.data);
        commit('USERS_INFO', response.data);
        localStorage.setItem('USERS_INFO', JSON.stringify(response.data));
        commit(SET_LOGIN_STATUS, 1);
        commit(HIDE_APP_LOADING);
        commit(HINT_MESSAGE, response.returnMessage);
      } else {
        commit(HIDE_APP_LOADING);
        commit(HINT_MESSAGE, response.returnMessage);
      }
    });
  },

  commitLoginOut({
    commit,
  }) {
    commit(SHOW_APP_LOADING);
    // console.log(param);
    http.post('gzh/loginOut', {
      userName: localStorage.getItem('USERS_INFO') ? JSON.parse(localStorage.getItem('USERS_INFO')).userName : '',
    }).then((response) => {
      // console.log(response);
      if (response.returnCode === 0) {
        commit('USERS_INFO', {});
        localStorage.removeItem('USERS_INFO');
        commit(SET_LOGIN_STATUS, 0);
        commit(HIDE_APP_LOADING);
        commit(HINT_MESSAGE, response.returnMessage);
      } else {
        commit(HIDE_APP_LOADING);
        commit(HINT_MESSAGE, response.returnMessage);
      }
    });
  },

  getUserMessageData({
    commit,
  }, param) {
    commit(SHOW_APP_LOADING);
    // console.log(param);
    http.post('gzh/message', param).then((response) => {
      // console.log(response);
      if (response.returnCode === 1) {
        commit(HIDE_APP_LOADING);
        commit(HINT_MESSAGE, response.returnMessage);
        if (param.msgType === 'notice') {
          commit('MINE_NOTICE_DATA', response.data);
        } else if (param.msgType === 'message') {
          commit('MINE_MESSAGE_DATA', response.data);
        }
      } else {
        commit(HIDE_APP_LOADING);
        commit(HINT_MESSAGE, response.returnMessage);
      }
    });
  },

  updateInfo({
    commit,
  }, { param }) {
    commit(SHOW_APP_LOADING);
    // console.log(param);
    http.post('gzh/updateInfo', param).then((response) => {
      // console.log(response);
      if (response.returnCode === 1) {
        commit(HIDE_APP_LOADING);
        commit(HINT_MESSAGE, response.returnMessage);
      } else {
        commit(HIDE_APP_LOADING);
        commit(HINT_MESSAGE, response.returnMessage);
      }
    });
  },
};
export default {
  state,
  mutations,
  getters,
  actions,
};
