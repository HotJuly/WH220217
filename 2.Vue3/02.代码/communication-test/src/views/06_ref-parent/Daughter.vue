<template>
  <div class="box">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="giveMoney($parent)">给BABA钱: 100</button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  const money = ref(2000)
  
  const giveMoney = (parent:any)=>{
    // console.log('giveMoney',parent)
    money.value -=100;
    parent.getMoney(100);
  }
</script>
