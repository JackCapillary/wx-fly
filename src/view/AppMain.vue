<template>
  <div>
    <router-view/>
    <AppFooter/>
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter';

export default {
  components: {
    AppFooter,
  },
  created() {
    // this.getUserBalance();
  },
  methods: {
    // ...mapActions({
    //   getUserBalance: 'getUserBalance',
    // }),
  },
};
</script>
