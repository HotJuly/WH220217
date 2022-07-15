<template>
  <div class="box">
    <h1>组件间通信8: provide + inject</h1>

    <h2>祖先组件标题</h2>
    <p>
      content1: {{content1}} 
      <button @click="content1+='--'">更新</button>
    </p>
    <p>
      content2.name: {{content2.name}}
      <button @click="content2 = {name: content2.name+'++'}">更新content2对象</button>
      &nbsp;
      <button @click="content2.name += '~~'">更新content2对象内的name</button>
    </p>
    
    <Child/>
  </div>
</template>

<script>
import Child from './Child'
export default {
  name: 'ProvideInjectTest',

  data () {
    return {
      content1: 'abc',
      content2: {
        name: 'tom',
      }
    }
  },

  components: {
    Child
  }
}
</script>

<style lang="less" scoped>

</style>
