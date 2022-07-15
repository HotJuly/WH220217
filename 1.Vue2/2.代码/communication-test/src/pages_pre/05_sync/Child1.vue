<template>
  <div class="box">
    <span>小明每次花100元, 老爸还有{{total}}元</span>
    <!-- <button @click="$emit('spendMoney',100)">花老爸的钱</button> -->
    <button @click="$emit('update:total',total-100)">花老爸的钱</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Child1',
    props:["total"]
  }
</script>
