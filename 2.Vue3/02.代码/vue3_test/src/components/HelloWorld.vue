<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>名字:{{obj2.name}}</h2>
    <h2>年龄:{{obj2.age}}</h2>
    <button @click="changeName">改名</button>
  </div>
</template>

<script>
import { reactive } from 'vue';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(){

    /*
      reactive
        他可以根据元对象产生一个全新的响应式对象的函数
        reactive对对象进行使用
        ref对基本数据类型使用
    
    */

    // 元对象
    // 操作元对象没有响应式效果
    const obj = {
      name:"小明",
      age:28
    }

    //这个是新生成的代理对象
    // 操作代理对象具有响应式的效果
    const obj2 = reactive(obj);

    // console.log(obj2,obj)
    // console.log(obj2===obj)

    const changeName = ()=>{
      // obj.name = "王" + obj.name;

      // 当我们操作代理对象的时候,代理对象也会对元对象做相同的事情
      obj2.name = "王" + obj.name;
      console.log(obj2)
    }

    return {
      obj,
      obj2,
      changeName
    }
  },
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
