<template>
  <div class="box">
    <h1>组件间通信1: props</h1>
    <p>
      count: {{count}}
      <br>
      <button @click="updateCount(2)">更新自己的数据</button>
    </p>
    
    <Child :count="count" :updateCount="updateCount"/>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Child from './Child.vue'
// Vue3 setup中引入的文件内容,可以直接在template使用

const count = ref<number>(0)

// count.value="222";

// 函数的作用域与函数声明位置有关,与调用位置无关
const updateCount =  (num:number) => {
  count.value += num
}
</script>
