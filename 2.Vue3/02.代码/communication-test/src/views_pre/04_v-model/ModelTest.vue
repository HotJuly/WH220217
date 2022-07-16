<template>
  <div class="box">
    <h1>组件间通信4: v-model</h1>

    <!-- 
      v-model在原生标签上
      本质: 动态value和原生的input监听(将最新输入值更新给data数据)
      实现双向数据绑定
     -->
    <h2>1. 用在原生标签上</h2>
    <input type="text" v-model="msg1">
    <br>
    <input type="text" :value="msg1" @input="msg1=($event.target as HTMLInputElement).value">
    <p>{{ msg1 }}</p>

    <!-- 
      v-model在组件标签上
      本质: 动态modelValue(默认)和自定义的input监听(将接收到的数据更新给data数据)
      实现父子组件间相互通信(数据双向同步)
    -->

    <h2>2. 用在组件标签上</h2>
    <h2>需求: 自定义带左侧标题的输入框</h2>
    <custom-input title="消息1" v-model="msg2"></custom-input>
    <custom-input title="消息2" :modelValue="msg2" @update:modelValue="msg2=$event"></custom-input>
    <p>{{msg2}}</p>

    <custom-input2 title="消息22" v-model:otherProp="msg2"></custom-input2>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ModelTest',
  }
</script>
<script lang="ts" setup>
  import { ref } from 'vue';
  import CustomInput from './CustomInput.vue'
  import CustomInput2 from './CustomInput2.vue'
  const msg1 = ref('abc')
  const msg2 = ref('atguigu')

</script>
