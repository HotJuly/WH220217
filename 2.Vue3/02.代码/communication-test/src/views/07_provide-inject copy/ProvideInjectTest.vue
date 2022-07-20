<template>
  <div class="box">
    <h1>组件间通信8: provide + inject</h1>

    <h2>祖组件标题</h2>
    <p>
      content1: {{state.content1}} 
      <button @click="state.content1+='--'">更新</button>
    </p>
    <p>
      content2.name: {{state.content2.name}}
      <button @click="state.content2 = {name: state.content2.name + '++'}">更新content2对象</button>
      &nbsp;
      <button @click="state.content2.name += '~~'">更新content2对象内的name</button>
    </p>
    
    <Child/>
  </div>
</template>

<script  lang="ts" setup>
  import { provide, reactive } from 'vue';
  import Child from './Child.vue'

  const state = reactive({
    content1: 'abc',
    content2: {
      name: 'tom'
    }
  })

  provide("content1111",state.content1)
  provide("content2222",state.content2)


</script>
