<template>
  <div class="box">
    <span>小明每次花100元</span>
    <button @click="spendMoney(100)">花爸爸的钱</button>
    , 爸爸还剩 {{money}} 元
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Child1',
    props: ['money'],
    methods: {
      spendMoney (count) {
        // this.money -= 100
        // 分发事件
        this.$emit('update:money', this.money - count)
      }
    }
  }
</script>
