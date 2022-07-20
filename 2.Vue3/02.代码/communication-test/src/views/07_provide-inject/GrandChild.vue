<template>
  <div class="box">
    <h4>孙组件标题</h4>
    <p>content11: {{ content11 }}</p>
    <p>content22.name: {{ content22?.name }}</p>
    <button @click="changeContent11">更新祖辈的数据</button>
  </div>
</template>

<script  lang="ts">
export default {
  name: 'GrandChild',
}
</script>
<script  lang="ts" setup>
import {inject} from 'vue';

const content11 = inject("content1111");
const content22 = inject<{name:string}>("content2222");
const update = inject<(value:string)=>void>("updateContent1");

// console.log(content11,content22)

const changeContent11 = ()=>{
  // 该语法等同于以下语法:update && update("dcf");
  update?.("dcf");
}
</script>

