<template>
  <div class="box">
    <h2>Child222 component</h2>
    <button @click="PubSub.publish('updateBrother', '--')">更新兄弟组件的数据</button>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Child2',
  }
</script>
<script lang="ts" setup>
  import PubSub from 'pubsub-js'
</script>