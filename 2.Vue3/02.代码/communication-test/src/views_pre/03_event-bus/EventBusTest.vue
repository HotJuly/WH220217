<template>
  <div class="box">
    <h1>组件间通信3: 消息订阅与发布</h1>
    
    <Child1/>
    <Child2/>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'EventBusTest',
  }
</script>
<script lang="ts" setup>
  import Child1 from './Child1.vue'
  import Child2 from './Child2.vue'
</script>