<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>name:{{obj2.name}}</h2>
    <h2>age:{{obj2.age}}</h2>
    <h2>sex:{{obj2.sex}}</h2>
    <button @click="handleClick">年龄+1</button>
  </div>
</template>

<script>
import {reactive,toRefs} from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {

    const obj = {
      name:"xiaoming",
      sex:"男"
    }

    const obj2 = reactive(obj);

    const handleClick = ()=>{
      
      obj2.age = 23;
      // console.log(obj2.age)
    }

    return {
      obj2,
      handleClick
    }
  },
  // mounted(){}
}
</script>

<script setup>

</script>
