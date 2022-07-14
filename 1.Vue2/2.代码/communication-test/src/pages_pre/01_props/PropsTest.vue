<template>
  <div class="box">
    <h1>组件间通信1: props</h1>
    <p>
      count: {{count}}
      <button>更新自己的数据</button>
    </p>
    
    <Child/>
  </div>
</template>

<script>
import Child from './Child.vue'
export default {
  name: 'PropsTest',
  components: {
    Child
  },
  data () {
    return {
      count: 0
    }
  }
}
</script>

<style scoped>

</style>
