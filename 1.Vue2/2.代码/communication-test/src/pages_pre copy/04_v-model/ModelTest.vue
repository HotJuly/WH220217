<template>
  <div class="box">
    <h1>组件间通信4: v-model</h1>

    <h2>1. 用在原生标签上</h2>


    <h2>2. 用在组件标签上</h2>
    <h2>需求: 自定义带左侧标题的输入框</h2>
  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    data () {
      return {
        msg1: 'abc',
        msg2: 'atguigu'
      }
    },
    components: {
      CustomInput
    }
  }
</script>
