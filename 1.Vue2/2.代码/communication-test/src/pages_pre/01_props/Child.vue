<template>
  <div class="box">
    <h2>Child component</h2>
    <p>来自于父组件的count: {{count}}</p>
    <button @click="fn(5)">更新父组件的数据</button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  // props:["count"],
  // props:{
  //   count:Number
  // },
  props:{
    count:{
      type:Number,
      require:true
    },
    fn:Function
  }
}
</script>

<style scoped>

</style>
