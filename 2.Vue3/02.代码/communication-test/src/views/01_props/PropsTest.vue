<template>
  <div class="box">
    <h1>组件间通信1: props</h1>
    <p>
      count: {{count}}
      <br>
      <button @click="updateCount(2)">更新自己的数据</button>
    </p>
    
    <Child/>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Child from './Child.vue'

const count = ref<number>(0)
const updateCount =  (num: number) => {
  count.value += num
}
</script>
