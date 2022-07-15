<template>
  <div class="box">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="giveMoney">给BABA钱: 50</button>
  </div>
</template>

<script>
export default {
  name: 'Son',
  
  data () {
    return {
      money: 30000
    }
  },
  methods: {
    giveMoney(){
      // this.$parent可以找到父组件的实例对象
      this.money -=50;
      this.$parent.money += 50;
      // console.log(this.$parent)
    }
  },
}
</script>
