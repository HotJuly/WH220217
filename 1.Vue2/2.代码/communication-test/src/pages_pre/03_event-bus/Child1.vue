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
    // 给总线绑定监听
    this.$bus.$on('updateBrother', (end) => {
      console.log('------------')
      this.msg += end
    })
  },

  beforeDestroy () {
    // 在组件死亡前, 解绑总线上的事件监听
    this.$bus.$off('updateBrother')
  },
}
</script>

<style scoped>

</style>
