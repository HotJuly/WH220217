<template>
  <div class="box">
    <h1>组件间通信2: vue自定义事件</h1>
    <!-- 
    区别原生事件与自定义事件
      原生事件
        原生标签上绑定 / 组件标签上绑定加.native
        事件名是特定的一些
        事件对象 / $event: 包含事件相关信息的数据对象, 如: pageX/pageY/target/keyCode
      自定义事件
        组件标签上绑定(不加.native)
        事件名是任意名称
        事件对象 / $event: $emit分发时指定的数据, 可以是任意类型, 甚至是undefined
    -->


    <h2>原生事件监听</h2>
    <button @click="test1">原生标签原生DOM事件监听</button>
    <button @click="test1($event)">原生标签原生DOM事件监听2</button>

    <br>
    <br>
    <Event1 @click.native="test2"/>

    <br>
    <br>
    <h2>自定义事件监听</h2>
    <p>count: {{count}}</p>
    <event2 @click="test3" @xxx="test4($event)"/>


    <br>
    <br>
    <button @click="$bus.$emit('updateMsg', '--')">测试总线分发事件</button>
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

    methods: {
      updateCount (num) {
        this.count += num
      },

      test1 (event) {
        alert(event.target.innerHTML)
      },

      test2 (event) {
        alert(event.target.tagName)
      },

      test3 (num) {
        alert(num)
        this.updateCount(num)
      },

      test4 (num) {
        alert('--' + num)
        this.updateCount(num)
      }
    }
  }
</script>
