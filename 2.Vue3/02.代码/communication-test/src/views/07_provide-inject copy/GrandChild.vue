<template>
  <div class="box">
    <h4>孙组件标题</h4>
    <p>content11: {{ content11 }}</p>
    <p>content22.name: {{ content22?.name }}</p>
    <button>更新祖辈的数据</button>
  </div>
</template>

<script  lang="ts">
export default {
  name: 'GrandChild',
}
</script>
<script  lang="ts" setup>
import { inject } from 'vue';

// inject接收一个字符串,他会从当前组件开始出发,向上查找最近的provide,如果找到对应的属性,就获取它的属性值
// inejct如果查找最近的provide,没有找到对应属性,会顺着组件链向上查找,如果最后没找到就是undefined
const content11 = inject("content1111");
// console.log(content11)
const content22 = inject<{name:string}>("content2222");
// console.log(content22)

// const obj = {
//   name: "xiaoming",
//   wife: {
//     name: "xiaohong"
//   }
// }

// obj?.name
</script>

