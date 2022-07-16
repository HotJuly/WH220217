<template>
  <div class="box">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="() => gaveMoney(100, $parent)">给BABA钱: 100</button>
  </div>
</template>

<script lang="ts" setup>

  import { ref } from 'vue';
  const money = ref(2000)
  
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
