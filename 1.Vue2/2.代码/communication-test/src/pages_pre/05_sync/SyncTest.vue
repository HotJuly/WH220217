<template>
  <div class="box">
    <h1>组件间通信5: sync属性修改符</h1>

    <p>小明的爸爸现在有{{total}}元</p>
    
    <h2>1. 不使用sync修改符</h2>
    <Child1 :total="total" @update:total="spendMoney"/>

    <h2>2. 使用sync修改符</h2>
    <!-- 
      在Vue3中,sync和v-model二合一了,因为相似度极高
      对比v-model:
        1.属性名不同
          v-model的属性名默认是value
          .sync的属性名完全由开发者自定义

        2.事件名不同
          v-model的事件名默认是input
          .sync的事件名是"update:" + "属性名"
       -->
    <Child1 :total.sync="total"/>

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
    },
    methods:{
      spendMoney(value){
        this.total = value;
      }
    }
  }
</script>
