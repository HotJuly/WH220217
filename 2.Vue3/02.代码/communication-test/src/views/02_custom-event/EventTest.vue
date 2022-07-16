<template>
  <div class="box">
    <h1>组件间通信2: vue自定义事件</h1>

    <h2>原生事件监听</h2>
    <button>原生标签原生DOM事件监听</button>
    <button>原生标签原生DOM事件监听2</button>

    <br>
    <br>
    <Event1/>

    <br>
    <br>
    <h2>自定义事件监听</h2>
    <Event2/>
  </div>
</template>

<script lang="ts" setup>
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

</script>
