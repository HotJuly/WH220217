<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{count}}</h2>
    <button @click="addCount">+1</button>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(){
    /*
      setup
        他是一个新增的生命周期
        执行时机:
          最早,早于beforeCreate,
          他会在初始化data和props之前执行

        特点:
          1.该函数中无法使用this,this为undefined
          2.该函数需要返回一个对象,用于模版中进行使用(类似于以前的data函数)

        用处:
          整个Vue3组合API的核心生命周期
    
    */

    /*
      ref
        他是一个用于创建响应式数据的函数
        返回值:是一个Ref对象,该对象具有value属性(具有响应式效果)

        注意:
          如果在template中使用Ref对象,那么模版会自动读取该对象的value属性值,用于展示
          如果在js中使用Ref对象,必须.value来进行数据操作(否则无效)
    
    */
    // console.log('--------setup--------',this)

    // 改写法是非响应式的,不要这么写
    // let count = 2;

    //简单区分一个属性是否是响应式属性的方法
    // 打印该对象,如果内部的某个属性是...,说明就是响应式属性,如果直接显示原值就是非响应式属性
    let count = ref(2);
    // console.log(count)

    const addCount = ()=>{
      count.value++;
      // console.log('addCount',count)
    }

    return {
      count,
      addCount
    }
  },
  // beforeCreate(){
  //   console.log('--------beforeCreate--------',this)
  // },
  // created(){
  //   console.log('--------created--------')
  // },
  // beforeMount(){
  //   console.log('--------beforeMount--------')
  // },
  // mounted(){
  //   console.log('--------mounted--------')
  // }
}
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
