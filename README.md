# test

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

// 安装并使用rem的方法
安装 px2rem-loader
npm install px2rem-loader --save-dev
配置 px2rem-loader
在vue-cli生成的文件中,找到以下文件 build/utils.js

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: options.sourceMap,
    // NOTE: 配置 px2rem-loader
    // 在css-loader前应用的loader数目，默认为0.
    // 如果不加这个，@import的外部css文件不能正常转换。
    // 如果还不行可以试着调大数字。更改后必须重启项目，否则不生效！！！
    importLoaders: 10,
  },
}
importLoaders 也可以直接加载 loader 后面 loader: 'css-loader?importLoaders=1'

// NOTE: 配置 px2rem-loader
const px2remLoader = {
  loader: 'px2rem-loader',
  options: {
    remUnit: 32,
  },
}
更多 px2rem 的用法可以参考：px2rem

直接写 px，编译后会直接转化成 rem —- 除开下面两种情况，其他长度用这个
在 px 后面添加/*no*/，不会转化 px，会原样输出。 — 一般 border 需用这个
在 px 后面添加/*px*/,会根据 dpr 的不同，生成三套代码。—- 一般字体需用这个

创建rem.js文件
// 基准大小
const baseSize = 32
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem()
}
rem.js 文件中的baseSize和 px2remLoader 中的remUnit是对应的。

如果不想使用 rem.js 这种简单粗暴的粗略计算，更进一步的可以使用lib-flexible、hotcss这两个过渡方案。

如果你的项目不是必须兼容低版本的可以考虑使用vw来做适配：《如何在 Vue 项目中使用 vw 实现移动端适配》。
