<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import asd from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    asd,
  },
  mounted() {
    // console.warn(`组件的名字：${asd.name}`);
    // console.warn(`${asd.data}`);
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
