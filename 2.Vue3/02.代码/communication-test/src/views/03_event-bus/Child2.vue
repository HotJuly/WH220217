<template>
  <div class="box">
    <h2>Child222 component</h2>
    <button @click="handleClick">更新兄弟组件的数据</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Child2',
}
</script>

<script setup lang="ts">
import myBus from '@/myBus';
const handleClick = ()=>{
  myBus.emit('sendMsg','~~');
}
</script>

