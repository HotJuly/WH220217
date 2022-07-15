<template>
  <div class="box">
    <h1>组件间通信9: vuex</h1>
    <Child1/>
    <Child2/>
  </div>
</template>

<script>
import Child1 from './Child1.vue'
import Child2 from './Child2.vue'
export default {
  name: 'VuexTest',
  components: {
    Child1,
    Child2,
  }
}
</script>

<style scoped>

</style>
