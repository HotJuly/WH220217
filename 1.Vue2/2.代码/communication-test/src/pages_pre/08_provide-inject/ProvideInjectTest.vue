<template>
  <div class="box">
    <h1>组件间通信8: provide + inject</h1>

    <h2>祖先组件标题</h2>
    <p>
      content1: {{ content1 }}
      <button @click="content1 += '--'">更新</button>
    </p>
    <p>
      content2.name: {{ content2.name }}
      <button @click="content2 = { name: content2.name + '++' }">更新content2对象</button>
      &nbsp;
      <button @click="content2.name = content2.name + '**'">
        更新content2对象内的name
      </button>
    </p>

    <Child />
  </div>
</template>

<script>
import Vue from "vue";
import Child from "./Child";
// 该对象不是组件实例对象,他只是当前组件的配置对象
// Vue会根据当前配置对象生成一个当前组件的构造函数,最终通过该构造函数生成组件的实例对象
export default {
  name: "ProvideInjectTest",

  data() {
    return {
      content1: "abc",
      content2: {
        name: "tom",
      },
    };
  },
  // provide: {
  //   content11: "abcd",
  // },
  provide() {
    // 函数形式相比于对象形式的好处,就是该函数内部可以访问data中的数据

    // provide函数会向外返回一个对象,该对象中的数据,可以被后代组件获取
    // 该方案传递数据,默认不具有响应式效果
    return {
      content11: this.content1,
      content22: this.content2,
      updateContent22: this.updateContent2,
    };
  },

  components: {
    Child,
  },
  methods: {
    updateContent2(value) {
      // 当前函数在祖先组件中声明,所以他的this就是当前组件实例
      this.content2.name = value;

      // 扩展:以下写法添加属性,是非响应式属性
      // 非响应式属性就是修改他的属性值,页面不会发生变化
      // this.content2.age = 23;
    },
  },
};
</script>

<style lang="less" scoped></style>
