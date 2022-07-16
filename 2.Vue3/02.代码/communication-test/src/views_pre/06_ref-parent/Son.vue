<template>
  <div class="box">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="() => gaveMoney(50, $parent) ">给BABA钱: 50</button>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Son',
  }
</script>
<script lang="ts" setup>
  import { ref } from 'vue';
  const money = ref(1000)
  
  

  const borrowMoney = (num: number) => {
    money.value -= num
  }

  const gaveMoney = (num: number, parent: any) => {
    parent.receiveMoney(num)
    money.value -= num
  }

  defineExpose({
    borrowMoney
  })
</script>
