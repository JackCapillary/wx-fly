// import {
//   SHOW_APP_LOADING,
//   HIDE_APP_LOADING,
// } from '../mutationTypes';

const state = {
  status: 0,
};

const mutations = {
  UPDATE() {
    state.status += 1;
  },
};

const getters = {
  getStatus: () => state.status,
};

const actions = {
  update({ commit }) {
    commit('UPDATE');
  },
};
export default {
  state,
  mutations,
  getters,
  actions,
};
