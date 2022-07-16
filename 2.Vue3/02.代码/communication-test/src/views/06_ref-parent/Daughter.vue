<template>
  <div class="box">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button>给BABA钱: 100</button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  const money = ref(2000)
  
</script>
