<template>
  <div class="box">
    <span>{{title}}: </span>
    <input type="text" :value="msg2" @input="handleInput">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'CustomInput',
    props:["msg2","title","value"],
    methods:{
      handleInput(event){
        const value = event.target.value;
        this.$emit('input99999',value);
      }
    },
    // model属性的用处就是用于自定义v-model的标签属性名和事件名
    model:{
      prop: 'msg2',
      event: 'input99999'
    }
  }
</script>
