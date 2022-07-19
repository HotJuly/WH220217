<template>
  <div class="box">
    <span style="margin-right: 10px">标题: </span>
    <input type="text" :value="msg3">
    <button @click="changeMsg3">修改父组件的msg3</button>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'CustomInput',
  }
</script>

<script setup lang="ts">
// defineProps(["modelValue"])
defineProps(["msg3"])
// 与Vue2的v-model的区别
// 1.默认属性名是modelValue,不再是value了

// Vue3中,v-model和.sync语法合二为一
// 指令语法用的是v-model
// 实际效果用的是.sync
// 扩展语法:v-model:属性名="value",该语法可以自定义传递的标签属性名称,不一定非要是modelValue
//  但是,自定义属性名称之后,自定义事件的名称也会跟着发生变化

// const emits = defineEmits(["update:modelValue"])
const emits = defineEmits(["update:msg3"])

const changeMsg3 = ()=>{
  // emits('update:modelValue',"xixi")
  emits('update:msg3',"xixi")
}
</script>
