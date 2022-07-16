<template>
  <div class="box">
    <span>{{ title }}: </span>
    <input type="text" :value="otherProp" 
      @input="$emit('update:otherProp', ($event.target as HTMLInputElement).value)">
  </div>
</template>

<script lang="ts">
  export default {
    name: 'CustomInput2',
  }
</script>
<script lang="ts" setup>
  defineProps(['title', 'otherProp'])
</script>
