<template>
  <div class="box">
    <span>{{title}}: </span>
    <input type="text" v-model="value">
    <!-- <input type="text"  :value="value" @input="(event)=>{value=event.target.value}"> -->
    <!-- <input type="text" :value="value" @input="handleInput"> -->
    <button @click="$emit('input',1)">=1</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'CustomInput',
    props:["value","title"],
    methods:{
      handleInput(event){
        // 1.获取到用户输入的数据
        const value = event.target.value;

        // 触发父组件给子组件绑定的自定义事件input,同时给回调函数传入实参value
        this.$emit('input',value)
      }
    },
    // model属性的用处就是用于自定义v-model的标签属性名和事件名
    // model:{
    //   prop: 'msg2',
    //   event: 'input99999'
    // }
  }
</script>
