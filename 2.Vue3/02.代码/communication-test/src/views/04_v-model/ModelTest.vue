<template>
  <div class="box">
    <h1>组件间通信4: v-model</h1>

    <h2>1. 用在原生标签上</h2>
    <!-- 
      原生标签上的本质: 动态value属性 + 原生input监听(将输入的最新值保存到属性上)
    -->
    <input type="text" v-model="msg1">
    <span>{{ msg1 }}</span><br>

    <br>
    <br>
    <hr>

    <h2>2. 用在组件标签上</h2>
    <h2>需求: 自定义带左侧标题的输入框</h2>
    <!-- 
      组件标签上的本质: 动态value属性 + 自定义input监听(将子组件分发数据保存父组件的属性上)
    -->
    msg3:{{msg3}}
    <custom-input v-model:msg3="msg3"/>
    <!-- <custom-input :msg3.sync="msg3"/> -->
    <!-- <custom-input :modelValue="msg3" @update:modelValue="(data)=>{msg3=data}"/> -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'ModelTest',
  components: {
    CustomInput
  }
}
</script>

<script setup lang="ts">
import { ref } from 'vue';
import CustomInput from './CustomInput.vue'
const msg1 = ref('abc')
const msg2 = ref('atguigu')
const msg3 = ref('haha')
const msg4 = ref('hehe')
</script>
