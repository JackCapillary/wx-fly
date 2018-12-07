/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
// import Render from '@/components/Render';
import AppMain from '@/view/AppMain';
import Home from '@/view/home/index';
import Store from '@/view/store/index';
import Mine from '@/view/mine/index';
import News from '@/view/mine/childrens/News';
import updateInfo from '@/view/mine/childrens/UpdateInfo';
import CommitMovie from '@/components/SearchMovie';
import LoginAndRegister from '@/components/LoginAndRegister';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: AppMain,
      children: [{
          path: '',
          redirect: 'home',
        },
        {
          path: '/home',
          component: Home,
          name: 'app_home',
        },
        {
          path: '/store',
          component: Store,
          name: 'app_store',
        },
        {
          path: '/mine',
          component: Mine,
          name: 'app_mine',
        },
        {
          path: '/mine/news',
          component: News,
          name: 'news',
        },
        {
          path: '/mine/updateInfo',
          component: updateInfo,
          name: 'update_info',
        },
      ]
    },
    {
      path: '/commit_moive',
      name: 'commit_moive',
      component: CommitMovie,
    },
    {
      path: '/Login_Register',
      name: 'Login_Register',
      component: LoginAndRegister,
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    // },
    // {
    //   path: '/render',
    //   name: 'Render',
    //   component: Render,
    // },
  ],
});
