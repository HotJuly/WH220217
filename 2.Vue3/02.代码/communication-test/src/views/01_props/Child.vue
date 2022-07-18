<template>
  <div class="box">
    <h2>Child component</h2>
    <p>count: {{count}}</p>
    <button @click="updateParent">更新父组件的数据</button>
  </div>
</template>

<script lang="ts" setup>
// setup标签其实只是个语法糖,他最终还是会编译成setup函数

// import { defineProps } from 'vue';

// defineProps用于声明需要接受的标签属性名称
// 如果不打算在js代码中使用props的数据,就不需要接受defineProps的返回值
// 模版中可以直接使用props接收到的数据

// defineProps由于使用频率非常频繁,所以官网已将该API变为内置API,不需要引入

// const props = defineProps(["count"]);
// console.log(props.count)

// 第一种:通过实参告知需要接受的标签属性名
// defineProps(["count","updateCount"]);

// 第二种:通过泛型+接口的形式来约束接收的数据
interface Props{
  count:number
  updateCount:(value:number)=>void
}

const props = defineProps<Props>()


const updateParent = ()=>{
  // const count =2;
  props.updateCount(3)
}

</script>
