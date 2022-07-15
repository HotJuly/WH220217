<template>
  <div class="box">
    <h1>组件间通信2: vue自定义事件</h1>
    <p>count: {{count}}</p>

    <h2>原生事件监听</h2>

    <h2>自定义事件监听</h2>
  </div>
</template>

<script type="text/ecmascript-6">
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {
    name: 'EventTest',

    data () {
      return {
        count: 0
      }
    },

    components: {
      Event1,
      Event2,
    },
  }
</script>
