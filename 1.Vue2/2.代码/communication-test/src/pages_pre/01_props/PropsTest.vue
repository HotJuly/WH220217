<template>
  <div class="box">
    <h1>组件间通信1: props</h1>
    <p>
      count: {{count}}
      <!-- <button @click="count++">更新自己的数据</button> -->
      <button @click="add">更新自己的数据</button>
    </p>
    
    <Child :count="count" :fn="add2"/>
  </div>
</template>

<script>
import Child from './Child.vue'
export default {
  name: 'PropsTest',
  components: {
    Child
  },
  data () {
    return {
      count: 0
    }
  },
  methods:{
    add(){
      // count代表变量,.count代表属性
      // 对象不存在自带的作用域

      // Vue在源码中会将methods中,所有的方法都是用bind进行加工,this全部强行指定为当前组件实例对象

      // 问题:bind返回的全新函数,能在被bind进行修改吗?
      // 无法再次修改,所以此处很稳
      // 前言:bind函数调用结果会返回一个全新的函数,这个函数的this是被修改过的

      this.count+=2;
    },
    add2(value){

      this.count+=value;
    },
    // count:2
  }
}
</script>

<style scoped>

</style>
