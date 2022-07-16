<template>
  <div class="box">
    <h1>组件间通信7: $ref & $parent</h1>

    <p>BABA有存款: {{money}}</p>
    <button>找小明借钱100</button><br>
    <button>找小红借钱150</button><br>

    <br>
    <Son/>

    <br>
    <Daughter/>

  </div>
</template>

<script lang="ts" setup>
  import Son from './Son.vue'
  import Daughter from './Daughter.vue'
  import { ref } from 'vue';

  const money = ref(1000)

</script>

<style>

</style>
