<template>
  <div id="app">
    <!-- 
      需求:当用户的鼠标在页面上移动时,实时显示用户当前的鼠标坐标
      拆解:
        1.如何知道用户鼠标是否正在移动
          绑定事件监听
          事件名:mousemove
          事件源:document
        
        2.如何获取到用户的鼠标坐标
          需要通过浏览器传递的事件对象event中查找

        3.如何将坐标信息展示在页面上
          使用状态数据存储坐标信息,在页面上使用插值语法展示即可
     -->

     <!-- <h1>pageX:{{pageX}}</h1>
     <h1>pageY:{{pageY}}</h1> -->
     <h2>count:{{count}}</h2>
     <h2>age:{{obj.age}}</h2>
     <button @click="addAge">添加age属性</button>
     <button @click="removeAge">删除age属性</button>

     <ul>
      <li v-for="item in arr" :key="item">{{item}}</li>
     </ul>
     <button @click="changeNum">将数字3改为数字6</button>
  </div>
</template>

<script>

// import mixins from '@/mixins';
// import Vue from 'vue';
export default {
  name: 'App',
  data(){
    // data返回的其实是一个普通对象
    // 但是Vue会将该对象的所有属性处理成响应式属性(这个过程叫做数据劫持)
    // 在组件初始化的时候,Vue会调用data函数得到普通对象,在交给observe函数进行数据劫持
    return{
      count:1,
      obj:{
        // age:23
      },
      arr:[1,2,3,4,5]
    }
  },
  mounted(){
    console.log(this.obj)
  },
  // mixins:[mixins],
  methods:{
    addAge(){
      // 给data中的对象添加一个原本没有的属性,以下写法添加的属性是非响应式属性
      // this.obj.age = 23;

      // 新增响应式属性的API
      // this.$set(this.obj,'age',23);
      // Vue.set(this.obj,'age',23)

      // 数据劫持:将非响应式属性变成响应式属性
      // 如果对一个响应式属性进行重新赋值,那个该属性值如果是对象,内部所有的属性都会变成响应式属性
      // this.obj = {
      //   ...this.obj,
      //   age:23
      // }


      /*
        Vue2的多个BUG
          1.添加属性:直接给一个对象添加属性,该属性是非响应式属性
            新增加的属性没有经过数据劫持,所以是非响应式属性的

          2.删除属性:如果直接使用delete关键字删除某个响应式属性,不会具有响应式效果
            Object.defineProperty这个方法,只能监视用户对属性的修改和读取,没办法监视删除

          3.下标修改数组:直接通过下标形式操作数组的内容,不具有响应式效果
            数组的下标其实是可以有响应式效果的,只是Vue故意不这么做
            问题:为啥不这么做?
              数组是特殊的对象,特殊在key是下标(属性名是数字形式)
              arr = {0:"a",1:"b",2:"c"}=>arr[0]
              arr = ["a","b","c"]=>arr[0]
            回答:为了较少数据劫持的属性个数
            扩展:中小型项目的属性较少,Vue速度更快
                大型项目的属性较多,React速度更快

            小总结:Vue对数组的下标有能力劫持,但是他不愿意
      */
      console.log(this.obj)
    },
    removeAge(){
      console.log('删除之前',this.obj.age)

      // 如果想要让删除属性操作具有响应式效果,就需要使用this.$delete或者Vue.delete方法来删除
      // delete this.obj.age;
      this.$delete(this.obj,"age")
      console.log('删除之后',this.obj)
    },
    changeNum(){
      // 直接通过下标操作数组中的内容,该操作是非响应式的
      // 小总结:数组的下标不具有响应式效果,如果需要有响应式效果,需要使用Vue提供的7种操作数组的方法
      // this.arr[2]= 6;

      this.arr.splice(2,1,6);
      console.log(this.arr)
    }
  }
}
</script>

<style>
</style>
