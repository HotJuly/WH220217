<template>
  <div class="box">
    <h2>Child222 component</h2>
    <button @click="$store.commit('increment', 2)">增加2</button>
    <button @click="$store.dispatch('asyncIncrement', 3)">异步增加3</button>
  </div>
</template>

<script>
export default {
  name: 'Child2',

  methods: {
  }
}
</script>

<style scoped>

</style>
