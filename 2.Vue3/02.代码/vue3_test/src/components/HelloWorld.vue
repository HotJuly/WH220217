<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>count:{{ count }}</h1>
  </div>
</template>

<script>
import { ref, onUpdated } from 'vue';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {

    const count = ref(1);

    // 请求回来的数据如果是有数据的,我就在组件更新的时候做些事,比如说打印console.log(1)
    // 请求回来的数据如果是空的,我就在updated中不做任何
    // if(data){
    //   onUpdated(() => {
    //     console.log(1)
    //   })
    // }
    return {
      count,
    }
  },
  // updated(){
  //   // 数据更新结束,视图更新结束之后才会执行
  // }
}
</script>

<script setup>

</script>
