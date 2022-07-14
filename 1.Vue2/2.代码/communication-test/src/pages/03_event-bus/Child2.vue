<template>
  <div class="box">
    <h2>Child222 component</h2>
    <button @click="updateBrother">更新兄弟组件的数据</button>
  </div>
</template>

<script>
export default {
  name: 'Child2',

  methods: {
    updateBrother () {
      this.$bus.$emit('updateMsg', '--')
    }
  }
}
</script>

<style scoped>

</style>
