<template>
  <div class="box">
    <h2>Child component</h2>
    <p>count: {{count}}</p>
    <button @click="updateCount(3)">更新父组件的数据</button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  // 声明接收属性  ==> 会自动成为组件对象的属性
  props: {
    count: {
      type: Number,
      require: true
    },
    updateCount: Function
  }
}

</script>
