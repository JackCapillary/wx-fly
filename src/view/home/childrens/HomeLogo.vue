<template>
  <div class="home-logo">
    <div class="content">
      <!-- <img
        class="pk-logo"
        :src="pkLogoSrc"
        alt="pk-logo"> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showHomeLogo: Boolean,
  },

  data() {
    return {
      // pkLogoSrc: `${window.urlConfig.cdnUrl}wap/static/img/pk-logo.png`,
    };
  },
};
</script>

<style lang="scss" scoped>
.home-logo {
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 0;
  background-color: #fff;
  z-index: 9999;
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;

  -webkit-box-pack: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;

  .content {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex;
    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -moz-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;

    .text {
      font-size: 16px;
    }

    .pk-logo {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
