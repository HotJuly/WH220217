<template>
  <div class="box">
    <h1>组件间通信7: $ref & $parent</h1>

    <p>BABA有存款: {{money}}</p>
    <button @click="borrowMoney1(100)">找小明借钱100</button><br>
    <button @click="borrowMoney2(150)">找小红借钱150</button><br>

    <br>
    <Son ref="sonRef"/>

    <br>
    <Daughter ref="dauRef"/>

  </div>
</template>

<script lang="ts" setup>
  import Son from './Son.vue'
  import Daughter from './Daughter.vue'
  import { ref } from 'vue';

  const money = ref(1000)
  const sonRef = ref<InstanceType<typeof Son> | null>(null)
  const dauRef = ref<InstanceType<typeof Daughter> | null>(null)

  const borrowMoney1 = (num: number) => {
    sonRef.value?.borrowMoney(num)
    money.value += num
  }

  const borrowMoney2 = (num: number) => {
    dauRef.value?.borrowMoney(num)
    money.value += num
  }

  const receiveMoney = (num: number) => {
    money.value += num

  }

  defineExpose({
    receiveMoney
  })

</script>

<style>

</style>
