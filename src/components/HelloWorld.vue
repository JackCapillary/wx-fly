<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <p @click="dlUser">删除数据</p>
    <p @click="stopReset">停止死循环并刷新页面</p>
    <p @click="diedFor" v-show="btShow">循环增加数据(只能点击一次)</p>
    <p v-for="(item, key) in backData" :key="key">
      <span>{{item.name}}----{{item.password}}</span>
    </p>
  </div>
</template>

<script>
/* eslint-disable */
import http from '../common/http';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      backData: [],
      btShow: true,
    };
  },
  mounted() {
      const body = {
          id: 1,
          user: 'huygo',
          newUser: 'huygoNew',
          password: 'huygo.info',
      };
      http.update(this, body, (res)=> {
          if (res.data.status === 1) {
              console.log(res);
          }
      });
      http.delect(this, {user: 1}, (res)=> {
          if (res.data.status === 1) {
              console.log(res);
          }
      });
      http.getData(this, {}, (res)=> {
          if (res.data.status === 1) {
              this.backData = res.data.data;
          }
      });
      this.diedFor(0);
  },
    methods: {
        stopReset() {
            window.location.reload();
        },
        diedFor(index) {
            let id = index;
            console.log(typeof index);
            if (typeof index !== 'number') {
                this.btShow = false;
                http.getData(this, {}, (res)=> {
                    if (res.data.status === 1) {
                        this.backData = res.data.data;
                    }
                });
                id = this.backData[this.backData.length - 1].id + 1;
            }
            let body = {
                id: id,
                user: 'huygo',
                newUser: 'huygoNew',
                password: 'huygo.info',
            };
            http.users(this, body, (res)=> {
                if (res.data.status === 1) {
                    http.getData(this, {}, (res)=> {
                        if (res.data.status === 1) {
                            this.backData = res.data.data;
                            if (typeof index !== 'number' || id >= 1) {
                                this.diedFor(body.id += 1)
                            }
                        }
                    });
                }
            });
        },
        dlUser() {
            http.delect(this, {user: 'huygoNew'}, (res)=> {
                if (res.data.status === 1) {
                    http.getData(this, {}, (res)=> {
                        if (res.data.status === 1) {
                            this.backData = res.data.data;
                        }
                    });
                }
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  font-size: 20px;/*no*/
  height: 100px;
}
li {
  display: inline-block;
  margin: 0 10px;/*no*/
}
a {
  color: #42b983;
}
</style>
