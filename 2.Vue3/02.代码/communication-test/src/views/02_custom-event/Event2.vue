<template>
  <div class="box">
    <h2>Event2组件</h2>
    <button @click="$emit('click')">分发自定义click事件</button><br>
    <button @click="handleClick">分发自定义xxx事件</button><br>
  </div>
</template>


<script setup lang="ts">
// import { defineEmits } from 'vue'

// 通过defineEmits可以获取到用于触发自定义事件的方法emits
// Vue3中必须声明有哪些自定义事件,否则无法触发
// 由于defineEmits使用频率很高,所以Vue内置该API,不需要引入
// $on和$once都废弃了,无法在给指定的组件实例绑定自定义事件,只能通过@符号绑定

// 第一种:传入一个数组,内部声明有哪些自定义事件
// const emits = defineEmits(["click","xxx"]);
// console.log(emits)

// 第二种:通过泛型+接口来告知Vue,有哪些自定义事件,并对其传参进行约束
// 简单说法:未来第一个实参数据必须是'click'字符串
// 完整说法:临时声明一个'click'数据类型,注意该类型只有字符串'click'满足他的要求
//          第一个实参的数据类型必须满足类型'click'的要求

// Vue3最新特性,如果一个组件标签上具有绑定事件的语法@click="回调函数"
// 如果该组件使用defineEmits声明接收该事件,他就是自定义事件
// 如果该组件没有使用defineEmits声明接收该事件,那他默认就是原生事件,自动绑定在根节点身上

interface Emits{
  (event:'click'):void
  (event:'xxx',data:MouseEvent):void
}

const emits = defineEmits<Emits>()

const handleClick = (event:MouseEvent)=>{
  // emits("xxx",event)
  emits('xxx',event);
}
</script>

