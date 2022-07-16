<template>
  <div class="box">
    <h1>组件间通信7: $refs & $children & $parent</h1>

    <p>BABA有存款: {{ money }}</p>
    <button @click="borrowSon">找儿子借钱100</button><br />
    <button @click="borrowDaughter">找女儿借钱150</button><br />
    <button @click="borrowAll">找所有孩子借钱200</button><br />

    <!-- 
      ref的使用方式
        1.对原生标签使用
          得到该标签挂载之后的真实DOM(原生DOM,document.querySelector)

        2.对组件标签使用
          得到该组件的组件实例(VueComponent的实例对象)
          扩展:在组件实例对象身上,具有一个$el属性,内部会存储当前组件的根节点(DOM,标签,元素)

     -->
    <br />
    <Son ref="son" />

    <br />
    <Daughter ref="daughter" />
  </div>
</template>

<script>
import Son from "./Son";
import Daughter from "./Daughter";

export default {
  name: "ChildrenParentTest",
  data() {
    return {
      money: 1000,
    };
  },

  components: {
    Son,
    Daughter,
  },
  methods: {
    borrowSon() {
      // console.log(this.$refs.son)
      // this.$refs.son->子组件的实例对象,之后的代码相当于是子组件在对自己做什么
      this.$refs.son.money -= 100;

      this.money += 100;
    },

    borrowDaughter() {
      // console.log(this.$refs.son)
      // this.$refs.son->子组件的实例对象,之后的代码相当于是子组件在对自己做什么
      this.$refs.daughter.money -= 150;

      this.money += 150;
    },

    borrowAll() {
      // console.log(this.$children)
      // this.$children可以找到所有子组件实例对象组成的数组
      // 不要操作$children数组,没用,不具有响应式的效果
      this.$children.forEach((child) => {
        child.money -= 200;
        this.money += 200;
      });
    },
  },
  mounted() {
    this.$refs.son.giveMoney();
  },
};
</script>

<style></style>
