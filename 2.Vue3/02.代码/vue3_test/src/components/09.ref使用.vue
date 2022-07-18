<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- Vue3会自动从setup函数返回的对象中,
    寻找属性名和ref标签属性值相同的属性,
    读取他的结果,将当前节点的内容放在属性值中
    注意:属性值必须是一个Ref对象
     -->
    <input type="text" ref="input">
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    const input666 = ref(null);

    onMounted(()=>{
      // console.log(input666)
      // Vue2,写法this.$refs.input666
      input666.value.focus();
    })

    return {
      input:input666
    }
  },
  // mounted(){}
}
</script>

<script setup>

</script>
