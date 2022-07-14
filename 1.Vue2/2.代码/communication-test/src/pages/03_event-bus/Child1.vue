<template>
  <div class="box">
    <h2>Child111 component</h2>
    <p>msg: {{msg}}</p>
  </div>
</template>

<script>
export default {
  name: 'Child1',
  data () {
    return {
      msg: 'abc'
    }
  },

  mounted () {
    this.$bus.$on('updateMsg', (end) => {
      console.log('事件总线回调处理')
      this.msg += end
    })
  },

  beforeDestroy () {
    this.$bus.$off('updateMsg')
  }
}
</script>

<style scoped>

</style>
