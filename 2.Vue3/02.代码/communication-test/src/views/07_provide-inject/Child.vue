<template>
  <div class="box">
    <h2>子组件标题</h2>
    
    <br>
    <GrandChild />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Child',
  }
</script>
<script lang="ts" setup>
  import GrandChild from './GrandChild.vue'
</script>