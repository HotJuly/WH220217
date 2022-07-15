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
    /*
      消息订阅发布/全局事件总线

      角色:
        两个
        1.订阅者
          想要接收数据的一方
        2.发布者
          想要发送数据的一方

      操作:
        1.订阅($on)
        2.发布($emit)
        3.解除订阅

      约束:
        1.订阅者和发布者必须同时存在
        2.订阅必须早于发布

      注意:
        1.在使用完全局事件总线之后记得解绑
          一定要记得解绑,否则内存可能会溢出(最终导致程序无法正常运行)
    
    
    */
    this.$myBus.$on("changeMsg",(value)=>{
      // console.log(value)
      this.msg += value;
    })

    // console.log(this)
  },
  beforeDestroy() {
    // 
    this.$myBus.$off("changeMsg")
  },
}
</script>

<style scoped>

</style>
