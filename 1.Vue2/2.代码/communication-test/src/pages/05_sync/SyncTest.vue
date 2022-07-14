<template>
  <div class="box">
    <h1>组件间通信5: sync属性修改符</h1>

    <p>小明的爸爸现在有{{total}}元</p>
    
    <h2>1. 不使用sync修改符</h2>
    <Child1 :money="total" @update:money="total=$event"/>

    <h2>2. 使用sync修改符</h2>
    <Child1 :money.sync="total"/>

    <h2>3. 使用v-model修改符</h2>
    <Child2 v-model="total"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Child1 from './Child1.vue'
  import Child2 from './Child2.vue'
  export default {
    name: 'SyncTest',
    data () {
      return {
        total: 1000,
      }
    },
    components: {
      Child1,
      Child2
    }
  }
</script>
