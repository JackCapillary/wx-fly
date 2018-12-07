<template>
  <div v-show="visiable" class="nodata">
    <img src="../assets/images/noData.png" alt="">
    <div class="text">{{text}}</div>
  </div>
</template>


<script>
export default {
  props: {
    visiable: {
      default: false,
    },
    text: {
      type: String,
      default: '暂无数据',
    },
  },

  data() {
    return {
      emptySrc: '../assets/images/noData.png',
    };
  },
};
</script>

<style scoped>

.nodata{
  position: relative;
  height: 100%;
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  -moz-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;

  -webkit-box-pack: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;
  -moz-align-self:center;
  -webkit-align-self:center;
  align-self:center;
  padding-top: 50px;
}

.nodata img {
  width: 100px;
  height:auto;
}

.nodata .text{
  margin-top: 4px;
  text-align:center;
  font-size: 16px;
  color:#333;
}

</style>
