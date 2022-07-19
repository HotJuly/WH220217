<template>
  <div class="box">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button>给BABA钱: 50</button>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Son',
  }
</script>
<script lang="ts" setup>
  import { ref, defineExpose } from 'vue';

  // setup的内容是封闭的,不会对其他组件进行暴露,
  // 所以即便你获取到了当前组件的实例对象,你也拿不到他的数据
  const money = ref(1000)

  const giveMoney = (value:number)=>{
    money.value -= value;
  }

  // 当前defineExpose接收一个对象,该对象中的内容才会向外暴露,其他组件才能看到到
  defineExpose({
    money,
    giveMoney
  })
</script>
