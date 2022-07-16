<template>
  <div class="box">
    <span>{{ title }}: </span>
    <input type="text" :value="modelValue" 
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
  </div>
</template>

<script lang="ts">
  export default {
    name: 'CustomInput',
  }
</script>
<script lang="ts" setup>
  defineProps(['title', 'modelValue'])
</script>
