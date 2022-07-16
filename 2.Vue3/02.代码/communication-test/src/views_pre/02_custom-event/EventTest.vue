<template>
  <div class="box">
    <h1>组件间通信2: vue自定义事件</h1>
    <p>count: {{count}}</p>

    <h2>原生事件监听</h2>
    <button @click="test1">原生标签原生DOM事件监听</button>
    <button @click="test1($event)">原生标签原生DOM事件监听2</button>
    <Event1 @click.native="test1"/>


    <h2>自定义事件监听</h2>
    <Event2 @xxx="test2" @click="test3" @increment="handleIncrement"/>

    <br>
    <button @click="PubSub.publish('updateBrother', '++')">测试全局总线</button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'
  import PubSub from 'pubsub-js'  // 需要也下载@types/pubsub-js

  const count = ref(0)

  const test1 = (event: MouseEvent) => { // 原生的event
    console.log(event)
    alert((event.target as HTMLElement).innerHTML)
  }

  const test2 = (event: string) => { // 自定义的event
    console.log(event)
    alert(event)
  }
  
  const test3 = (event: object) => { // 自定义的event
    console.log(event)
    alert(event)
  }

  const handleIncrement = (num: number) => {
    count.value += num
  }
</script>
