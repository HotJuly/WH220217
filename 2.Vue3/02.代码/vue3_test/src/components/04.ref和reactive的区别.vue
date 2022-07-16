<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>名字:{{obj2.name}}</h2>
    <h2>年龄:{{obj2.age}}</h2>
    <h2>名字:{{obj3.name}}</h2>
    <h2>年龄:{{obj3.age}}</h2>
    <button @click="changeName">改名</button>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(){

    /*
      ref和reactive的区别
        相同点:
          1.他们都可以接收一个对象
            如果ref接收到一个对象,返回值是Ref对象,该对象具有value属性,属性值是代理对象
              也就是说:ref会将得到的元对象交给reactive处理,之后存入到value属性中

          2.在模版中的使用语法相同
            因为Ref对象在模版中不需要.value(因为Vue会自动读取),而Proxy对象没有value属性

        不同点:
          1.ref可以接收基本数据类型,reactive不行
          2.在js代码中,更新数据的话,Ref对象需要.value,而Proxy对象不需要
            语法上来说,Ref对象更麻烦

            重点:
              由于Ref对象具有响应式属性value,所以可以直接更新整个元对象
              但是reactive他会返回一个代理对象存储于变量obj3中,只有操作代理对象才有响应式效果
          
        总结:
          如果未来有一个对象,我们只修改他的属性值,不换对象,用reactive相对比较方便
          如果未来有一个对象,我们可能修改他的属性值,也可能换对象,用ref相对比较方便
    
    */

    // 对象1号:元对象
    const obj = {
      name:"xiaoming",
      age:23,
      wife:{
        name:"小红",
        age:18
      }
    }

    // 对象2号:Ref对象
    const obj2 = ref(obj);

    //对象3号,Proxy对象
    // 注意:每次生成的代理对象一定都是不一样的
    // 因为:reactive函数中会调用new Proxy创建实例对象,所以不可能重复
    let obj3 = reactive(obj);

    // console.log(1,obj2)

    const changeName = ()=>{
      // obj2.value.name="王小明"
      // obj3.name = "王小明"


      // 将一个非响应式的对象交给了响应式属性value
      // obj2.value = {
      //   name:"李小明",
      //   age:33,
      //   wife:{
      //     name:"小红",
      //     age:18
      //   }
      // }

      // obj3 = {
      //   name:"李小明",
      //   age:33,
      //   wife:{
      //     name:"小红",
      //     age:18
      //   }
      // };
    }

    return {
      obj2,
      obj3,
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
