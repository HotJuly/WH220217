<template>
  <el-tooltip effect="dark" :content="title" placement="top">
    <el-button v-bind="$attrs" class="myClass" style="color: white"></el-button>
  </el-tooltip>
</template>

<script lang="ts">
  export default {
    name: 'HintButton',
  }
</script>
<script lang="ts" setup>
  import { useAttrs } from 'vue';

  defineProps(['title'])
  // $attrs: 包含了没有在props中声明的属性和自定义事件监听
  const attrs = useAttrs()
  console.log('attrs', attrs)
</script>
