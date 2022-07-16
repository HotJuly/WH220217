<template>
  <div class="box">
    <h1>组件间通信2: vue自定义事件</h1>
    <p>count: {{ count }}</p>

    <!-- 
      在Vue中,事件分为两种
        原生事件
          绑定方法:
            1.给html标签绑定的事件(一定是原生事件)
            2.给组件标签绑定的事件(添加native修饰符即可)
              组件标签在页面上是没法显示的,能显示的只有该组件的template内容
              所以,如果使用该方法绑定原生事件,那么该事件会绑定给该组件的根节点实例
          
          指定事件名的人:W3C

            注意:Vue有一个预留关键词,$event,如果写事件回调函数的时候,
              没有传入其他数据,那么回调函数的第一个实参默认就是event
              如果有传入其他数据,那么回调函数就无法接收到原先是事件对象event,可以通过$event传入

        自定义事件
          绑定方法:
            1.给Vue组件标签通过@符号绑定的事件
            2.找到组件实例对象,使用$on也可以绑定
          指定事件名的人:开发的人(我)
     -->
    <h2>原生事件监听</h2>
    <button @click="handleClick">原生事件监听1</button>
    <button @click="handleClick1(2, $event)">原生事件监听2</button>

    <br />

    <Event1 @click.native="handleClick" />

    <h2>自定义事件监听</h2>
    <!-- 即便是同一个组件,在页面上使用标签显示两次,会产生两个不同的组件实例对象,生命周期也会分别执行 -->
    <Event2 @click123="handleClick" />
    <Event2 @click666="addCount" />
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'

export default {
  name: 'EventTest',

  data () {
    return {
      count: 0
    }
  },
  methods:{
    handleClick(event){
      // 形参是浏览器传递给我们的,事件对象,内部会存放与当前事件相关的所有数据
      // event.target内部存放的是当前事件触发流程中,最内层的目标元素
      const text = event.target.innerText;
      alert(text)
    },
    handleClick1(value,event){
      // 形参是浏览器传递给我们的,事件对象,内部会存放与当前事件相关的所有数据
      // event.target内部存放的是当前事件触发流程中,最内层的目标元素
      const text = event.target.innerText;
      alert(text+value)
    },
    addCount(value){
      this.count+=value;
    }
  },

  components: {
    Event1,
    Event2,
  },
}
</script>
