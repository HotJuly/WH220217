<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>count:{{ count }}</h1>
    <h1>doubleCount:{{ doubleCount }}</h1>
    <h1>ThreeCount:{{ ThreeCount }}</h1>
    <!-- <h1 @click="handleClick">count2:{{ count2 }}</h1> -->
  </div>
</template>

<script>
import { ref, computed, watch, watchEffect } from 'vue';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {

    const count = ref(1);

    const obj = reactive({
      age: 28
    })

    /*
      computed
        他是一个返回计算属性的函数
    
    */

    const doubleCount = computed(() => {
      return count.value * 2
    });

    const ThreeCount = computed({
      get() {
        // 访问/读取当前计算属性的结果时会执行
        return count.value * 3
      },
      set(value) {
        // 给当前计算属性赋值的时候会触发
        // console.log('ThreeCount set',value)
        count.value = value;
      }
    });

    // console.log(ThreeCount)

    setTimeout(() => {
      ThreeCount.value = 9;
    }, 2000)

    // 此处千万不要写成count.value,否则会失去监视效果
    // watch(count,(newValue,oldValue)=>{
    //   console.log('count change',newValue)
    // });

    // 第一个实参可以是数组类型,用于同时监视多个数据的变化
    // 第二个参数是回调函数,监视数据发生变化,该函数就会重新执行
    // 第三个参数是配置对象,可以配置watch是否在初始化阶段立即执行,以及是否需要深度监视对象
    // watch([count,a,b,c],(newValue,oldValue)=>{
    //   console.log('count change',newValue)
    // },{immediate:true,deep:true});


    // watchEffect
    // 
    // watchEffect(()=>{
    //   // 这个函数中用到响应式数据,都会自动监视
    // })

    // 小总结:
    //  如果现在具有100个属性,我都想监视,watchEffect
    // 如果现在具有1个属性需要监视,watch||watchEffect
    // 如果现在具有5个属性,但是其中4个,只能使用watch


// console.log(111,obj.age)

// 错误写法
    // watch(obj.age, (newValue, oldValue) => {
    //   console.log('count change', newValue)
    // }, { immediate: true, deep: true });

    
// 相当于"$route.query.keyword"(newValue,oldValue){
  //     getData(value);
  //   },
  // 如果监视的是一个ref对象,直接写ref对象的名称
  // 如果监视的是一个reactive对象中的某个属性,需要写成函数形式,该函数返回你想监视的属性值
    // watch(()=>obj.age, (newValue, oldValue) => {
    //   console.log('count change', newValue)
    // }, { immediate: true, deep: true });

    return {
      count,
      doubleCount,
      ThreeCount
    }
  },
  /*
    watch和computed的区别
      相同点:
        1.他们都可以监视响应式属性的变化
          computed函数中,如果使用到了相关的响应式属性,那么这些属性值发生变化,该函数就会重新执行
          watch函数中,如果声明监视的属性值发生变化,该函数就会重新执行

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
  //     return this.list.reduce((pre,item)=>{
  //       const price = item.num * item.price;
  //       return pre+price
  //     },0)
  //   }
  // a:{
  //   get(){},
  //   set(){}
  // }
  // },
  // watch:{
  //   "$route.query.keyword"(newValue,oldValue){
  //     getData(value);
  //   },
  // a(){
  //   console.log(1)
  // },
  // b(){
  //   console.log(1)
  // },
  // c(){
  //   console.log(1)
  // }
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
