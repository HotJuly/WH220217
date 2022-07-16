<template>
  <div class="box">
    <h2>Child component</h2>
    <p>count: {{ count }}</p>
    <button @click="updateCount(3)">更新父组件的数据</button>
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    count: number;
    updateCount(val: number): void;
  }
  defineProps<Props>()
</script>
