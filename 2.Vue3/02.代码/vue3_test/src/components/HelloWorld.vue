<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>name:{{obj2.name}}</h2>
    <h2>age:{{obj2.age}}</h2>
    <h2>sex:{{obj2.sex}}</h2>
    <button @click="handleClick">年龄+1</button>

    
     <ul>
      <li v-for="item in arr" :key="item">{{item}}</li>
     </ul>
     <button @click="changeNum">将数字3改为数字6</button>
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

    const arr = reactive([1,2,3,4,5]);

    const changeNum = ()=>{
      arr[2] = 6;
    }

    /* Vue2和Vue3的区别
      1.Vue3可以直接给对象添加属性,一定是响应式的(前提该对象必须是Ref对象或者Proxy对象)
      注意:Vue3中不存在this.$set和Vue.set这两个API,已经废弃

      2.Vue3可以直接使用delete关键字删除某个对象的属性,具有响应式效果
      注意:Vue3中不存this.$delete和Vue.delete这两个API,已经废弃

      3.Vue3中可以直接使用下标操作数组中的数据,具有响应式效果
    */ 

    const handleClick = ()=>{

      // obj2.age = 23;
      delete obj2.sex;
      console.log(obj2)
    }

    return {
      obj2,
      arr,
      changeNum,
      handleClick
    }
  },
  // mounted(){}
}
</script>

<script setup>

</script>
