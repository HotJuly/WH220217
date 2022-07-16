<template>
  <div class="box">
    <h2>Event2组件</h2>
    <button @click="$emit('xxx', 'atguigu')">分发自定义的xxx事件</button>
    <button @click="$emit('click', {name: 'tom'})">分发自定义的click事件</button>
    <button @click="$emit('increment', 5)">分发自定义事件更新父组件数据</button>
  </div>
</template>

<script lang="ts" setup>
  // 简单定义
  // const emit = defineEmits(['xxx', 'click', 'increment'])

  // 带类型定义
  const emit = defineEmits<{
    (e: 'xxx', val: string): void
    (e: 'click', val: object): void
    (e: 'increment', val: number): void
  }>()

  // emit可在用于在ts中调用
</script>