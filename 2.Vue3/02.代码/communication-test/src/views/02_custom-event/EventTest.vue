<template>
  <div class="box">
    <h1>组件间通信2: vue自定义事件</h1>

    <h2>原生事件监听</h2>
    <button @click="test1">原生标签原生DOM事件监听</button>
    <button @click="test1($event)">原生标签原生DOM事件监听2</button>

    <br>
    <br>
    <Event1 @click.native="test1" />

    <br>
    <br>
    <h2>自定义事件监听</h2>
    msg:{{msg}}
    <Event2 @click="test2" @xxx="test1"/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'

const msg = ref<string>("父组件的数据")
const test1 = (event: MouseEvent) => {
  // alert((<HTMLElement>event.target).innerText);
  alert((event.target as HTMLElement).innerText);
}
const test2 = () => {
  console.log('test2 success')
}
</script>
