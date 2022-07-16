<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>count:{{ count }}</h1>
    <h1 @click="handleClick">count2:{{ count2 }}</h1>
  </div>
</template>

<script>
import { listenerCount } from 'process';
import { ref, reactive } from 'vue';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      count:2
    }
  },
  setup() {

    return {
    }
  },
  /*
    watch和computed的区别
      相同点:
        1.他们都可以监视响应式属性的变化
        2.数据类型相同

      不同点:
        1.使用场景不同
          computed->我现在需要一个数据,但是我没有,但是可以根据已有数据计算得到
            购物车总价,总数
              根据现有的购物车数组,将数量*单价,最终累加所有商品,可以得到总价数据

          watch->当某个数据发生变化的时候,我想要做一些事情(事情就是函数)
            当地址栏中的keyword,我们需要重新请求最新的数据


          小总结:computed更注重于结果,watch更注重于过程
  
  
  */
  // computed:{
  //   total(){
  //     return list.reduce((pre,item)=>{
  //       const price = item.num * item.price;
  //       return pre+price
  //     },0)
  //   }
  // },
  // watch:{
  //   "$route.query.keyword"(value){
  //     getData(value);
  //     return 123;
  //   }
  // }
}
</script>

<script setup>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
