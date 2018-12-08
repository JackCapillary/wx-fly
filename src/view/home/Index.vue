<template>
  <div id="container">
    <HomeHeader />
    <HomeContent />
    <!-- <transition name="fade"> -->
      <!-- <HomeLogo /> -->
      <!-- <HomeLogo v-show="showHomeLogo" /> -->
    <!-- </transition> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import HomeHeader from './childrens/HomeHeader';
import HomeContent from './childrens/HomeContent';
import HomeLogo from './childrens/HomeLogo';

export default {
  components: {
    HomeHeader,
    HomeContent,
    HomeLogo,
  },
  computed: {
    // ...mapGetters({
    //   homeLoaded: 'homeLoaded',
    //   showHomeLogo: 'getShowHomeLogo',
    // }),
  },
  created() {
    this.getBanner();
    const sendData = {
      msgType: 'notice',
    };
    this.getUserMessageData(sendData);
    // console.log(this.$route.name);
  },
  methods: {
    ...mapActions({
      getBanner: 'getBanner',
      getUserMessageData: 'getUserMessageData',
    }),

  },
};
</script>

<style lang="scss" scoped>
  #container {
    height: auto;
    overflow:hidden;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
