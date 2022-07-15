<template>
  <div class="box">
    <h1>组件间通信4: v-model</h1>

    <h2>1. 用在原生标签上</h2>

    <!-- 
      对原生input标签使用的本质:
        1.将msg1的数据作为初始值展示在input框中(属性名是value)
        2.当input框的值发生变化时,同步修改对应属性的值
          拆解:
            -如何知道input框的值是否发生了变化
              跟监听有关
              事件源:input框
              事件名:input(输入内容的时候)||change(失去焦点的时候)
                扩展:v-model有一个修饰符.lazy
            -如何修改对应属性的值
              this.msg1 = value;
    -->
    <input type="text" v-model="msg1">
    {{ msg1 }}

    <input type="text" :value="msg2" @input="handleInput">
    {{ msg2 }}

    <h2>2. 用在组件标签上</h2>
    <h2>需求: 自定义带左侧标题的输入框</h2>

    <!-- 
      对组件标签使用的本质:
        1.将msg2的数据使用标签属性传递给子组件(默认属性名为value)
        2.给当前子组件绑定自定义事件(默认事件名为input)

        扩展:
          可以通过子组件的model配置属性,对属性名和事件名进行自定义效果
     -->

    父组件的msg2:{{ msg2 }}
    <br />
    <CustomInput title="来自于父组件的msg2" :value="msg2" @input="changeMsg2" />
    <br />
    <CustomInput title="来自于父组件的msg2" v-model="msg2" />
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from './CustomInput.vue'
export default {
  name: 'ModelTest',
  data() {
    return {
      msg1: 'abc',
      msg2: 'atguigu'
    }
  },
  components: {
    CustomInput
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.msg2 = value;
    },
    changeMsg2(value) {
      this.msg2 = value;
    }
  }
}
</script>
