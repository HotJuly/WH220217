<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" ref="input666">
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
      input666
    }
  },
  // mounted(){}
}
</script>

<script setup>

</script>
