import {
  SHOW_APP_LOADING,
  HIDE_APP_LOADING,
  HINT_MESSAGE,
} from '../mutationTypes';
import http from '../../common/http';

const state = {
  banner: [],
  movies: [],
};

const mutations = {
  BANNERS(stat, banner) {
    // console.log(banner);
    state.banner = banner;
  },
  MOIVES(stat, movies) {
    state.movies = movies;
  },
};

const getters = {
  banner: () => state.banner,
  movies: () => state.movies,
};

const actions = {
  // 广告图
  getBanner({
    commit,
  }) {
    // commit(SHOW_APP_LOADING);
    http.post('gzh/banners').then((response) => {
      const data = response.data;
      if (data) {
        // commit(HIDE_APP_LOADING);
        const banner = data;
        // console.log(banner);
        commit('BANNERS', banner);
      } else {
        // console.log('获取轮播图出错');
      }
    });
  },
  // 提交喜欢的电影信息
  commitMovie({
    commit,
  }, {
    param,
  }) {
    commit(SHOW_APP_LOADING);
    // console.log(param);
    http.post('gzh/setMovie', param).then((response) => {
      // console.log(response);
      if (response.returnCode === 1) {
        localStorage.setItem('setMovieTime', new Date().getTime());
        commit(HIDE_APP_LOADING);
        // console.log(response.returnMessage);
        commit(HINT_MESSAGE, response.returnMessage);
      } else {
        // console.log('获取轮播图出错');
      }
    });
  },
  getMovie({
    commit,
  }, {
    param,
  }) {
    const send = {
      userName: param.userName,
    };
    // commit(SHOW_APP_LOADING);
    http.post('gzh/getMovie', send).then((response) => {
      const data = response.data;
      if (response.returnCode === 1) {
        if (data.length !== 0) {
          const movies = data[0].movies.split(',');
          const newArr = [];
          for (let i = 0; i < movies.length; i += 2) {
            newArr.push({
              video: movies[i],
              img: movies[i + 1],
            });
          }
          commit('MOIVES', newArr);
        } else {
          const url = 'http://tantanwin.com/serverAssets/show1.mp4,http://tantanwin.com/serverAssets/show1.jpg,http://tantanwin.com/serverAssets/show2.mp4,http://tantanwin.com/serverAssets/show2.png';
          const movies = url.split(',');
          const newArr = [];
          for (let i = 0; i < movies.length; i += 2) {
            newArr.push({
              video: movies[i],
              img: movies[i + 1],
            });
          }
          commit('MOIVES', newArr);
        }
      } else {
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
