<template>
  <div class="box">
    <span>小明每次花200元</span>
    <button @click="$emit('input', value-200)">花爸爸的钱</button>
    , 爸爸还剩 {{value}} 元
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Child2',
    props: ['value']
  }
</script>
