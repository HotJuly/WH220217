<template>
  <div class="box">
    <h1>组件间通信7: $ref & $parent</h1>

    <p>BABA有存款: {{money}}</p>
    <button @click="borrowSon">找小明借钱100</button><br>
    <button>找小红借钱150</button><br>

    <br>
    <Son ref="sonRef"/>

    <br>
    <Daughter/>

  </div>
</template>

<script lang="ts" setup>
  import Son from './Son.vue'
  import Daughter from './Daughter.vue'
  import { ref } from 'vue';

  const money = ref(1000);

  /* 流程:
    1.给子组件标签上添加ref属性,属性值是一个字符串
    2.在setup标签中,声明一个与ref属性值同名的变量
    3.在这个同名变量中,存放一个空的ref对象
    4.Vue3在解析模版的时候,会将对应的标签实例存放到指定的ref对象中
  */

  /*
    ref和parent变化情况
      1.Vue3,找到对应的组件实例对象的方法变得更加复杂
      2.想要获取到对应组件实例的属性,需要对方提前暴露出来(使用defineExpose暴露)
  
  
  */
  const sonRef = ref();

  const borrowSon = ()=>{
    // console.log(sonRef.value)
    sonRef.value.giveMoney(100);

    money.value += 100;
  }

  const getMoney = (value:number)=>{
    money.value += value;
  }

  defineExpose({
    // getMoney:getMoney,
    getMoney
  })

</script>

<style>

</style>
