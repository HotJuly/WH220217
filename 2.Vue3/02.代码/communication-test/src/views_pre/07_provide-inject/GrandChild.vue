<template>
  <div class="box">
    <h4>孙组件标题</h4>
    <p>content11: {{content11}}</p>
    <p>content22.name: {{content22?.name}}</p>
    <button @click="updateContent1('--')">更新祖辈的数据</button>
  </div>
</template>

<script  lang="ts">
export default {
  name: 'GrandChild',
}
</script>
<script  lang="ts" setup>
import { inject } from 'vue';


const content11 = inject<string>('content11')
const content22 = inject<{name: string}>('content22')
const updateContent1 = inject<(msg: string) => void>('updateContent1')
</script>

