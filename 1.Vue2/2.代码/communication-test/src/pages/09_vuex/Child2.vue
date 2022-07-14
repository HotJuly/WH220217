<template>
  <div class="box">
    <h2>Child222 component</h2>
    <button @click="increment(2)">增加2</button>
    <button @click="asyncIncrement(3)">异步增加3</button>
  </div>
</template>

<script>
export default {
  name: 'Child2',

  methods: {
    increment (num) {
      this.$store.commit('increment', num)
    },
    asyncIncrement (num) {
      console.log('asyncIncrement', num)
      this.$store.dispatch('asyncIncrement', num)
    }
  }
}
</script>

<style scoped>

</style>
