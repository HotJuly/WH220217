<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <h2>name:{{obj2.name}}</h2>
    <h2>age:{{obj2.age}}</h2>
    <h2>sex:{{obj2.sex}}</h2> -->
    <h2>name:{{name}}</h2>
    <h2>age:{{age}}</h2>
    <h2>sex:{{sex}}</h2>
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
      age:23,
      sex:"男"
    }

    const obj2 = reactive(obj);

// toRefs可以将代理对象中所有的直系属性都进行二次处理,将原先的属性值交给Ref处理,最终再放回对应的属性中
    const obj3 = toRefs(obj2);

    // console.log(obj3)

    const handleClick = ()=>{
      obj2.age +=1;
      console.log(obj2.age)
    }

    return {
      // ...obj2,
      // name:obj2.name,
      // age:obj2.age,
      // sex:obj2.sex,
      // name:"xiaoming",
      // age:23,
      // sex:"男",
      ...obj3,
      handleClick
    }
  },
  // mounted(){}
}
</script>

<script setup>

</script>
