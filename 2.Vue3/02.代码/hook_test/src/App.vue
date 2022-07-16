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

     <h1>pageX:{{pageX}}</h1>
     <h1>pageY:{{pageY}}</h1>
     <h2>count:{{count}}</h2>
  </div>
</template>

<script>
import mixins from '@/mixins';
export default {
  name: 'App',
  data(){
    return{
      count:1
    }
  },
  mounted(){
    console.log(1)
  },
  mixins:[mixins]
}
</script>

<style>
</style>
