<template>
  <div class="box">
    <h1>组件间通信4: v-model</h1>

    <h2>1. 用在原生标签上</h2>
    <!-- 
      原生标签上的本质: 动态value属性 + 原生input监听(将输入的最新值保存到属性上)
    -->
    <input type="text" v-model="msg1">
    <span>{{msg1}}</span><br>
    <input type="text" :value="msg2" @input="msg2 = $event.target.value">
    <span>{{msg2}}</span>

    <br>
    <br>
    <hr>

    <h2>2. 用在组件标签上</h2>
    <h2>需求: 自定义带左侧标题的输入框</h2>
    <!-- 
      组件标签上的本质: 动态value属性 + 自定义input监听(将子组件分发数据保存父组件的属性上)
     -->
    <span>msg3: {{msg3}}</span>
    <custom-input :title="'消息1'" v-model="msg3"/>
    
    <br>
    
    <span>msg4: {{msg4}}</span>
    <custom-input :title="'消息2'" :value="msg4" @input="msg4 = $event"/>
    <br>
  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    data () {
      return {
        msg1: 'abc',
        msg2: 'atguigu',
        msg3: 'haha',
        msg4: 'hehe'
      }
    },
    components: {
      CustomInput
    }
  }
</script>
