<script>
export default {
  render(h) {
    return h(
      "div",
      {
        class: {
          succes: true
        },
        style: {
          color: "red",
          fontSize: "14px"
        },
        // 普通的 HTML 特性
        attrs: {
          id: "foo"
        },
        ref: "myRef",
        // DOM 属性
        // domProps: {
        //   innerHTML: '我在哪？快把我找出来！',
        // },
        on: {
          click: () => {this.handleClick(h)}
        }
      },
      [
        h("span", "我在哪？快把我找出来！"),
        h("p", "ojbk!"),
      ],
    );
  },
  methods: {
    handleClick(e) {
      console.log(e);
    }
  }
};
</script>
