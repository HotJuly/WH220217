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
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      pageX:0,
      pageY:0
    }
  },
  mounted(){
    // 做Vue项目,尽量使用数据驱动,不要直接操作真实DOM
    // 如果现在需要保证一个动画的流畅度,建议操作真实DOM
    // 如果现在只是显示一些页面数据,更新频率不高,建议使用数据驱动
    document.addEventListener('mousemove',(event)=>{
      // console.log(event)
      const {pageX,pageY} = event;
      this.pageX = pageX;
      this.pageY = pageY;
      // console.log(this.pageX)
      // debugger
      // 注意点:Vue更新数据是同步更新,更新视图是异步更新
    })
  }
}
</script>

<style>
</style>
