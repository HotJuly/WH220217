<template>
  <el-tooltip :content="title" placement="top-start">
    <!-- 内部的子组件需要接收一些不确定的属性 -->
    <el-button v-bind="$attrs" v-on="$listeners"/>
  </el-tooltip>
</template>

<script>
export default {
  name: 'HintButton',
  props: ['title'],

  created () {
    console.log(this.$attrs, this.$listeners)
  },
}
</script>

<style>
  .el-button {
    margin: 5px;
  }
</style>