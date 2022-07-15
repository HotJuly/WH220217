<template>
  <div class="box">
    <h1>组件间通信6: $attrs与$listeners</h1>
    <h2>需求: 自定义带Hover提示的按钮</h2>
    <!-- <el-button type="danger" size="small" @click="handleClick">删除</el-button> -->

    <HintButtonVue content="该操作很危险,请注意" type="danger" size="small" @click123="handleClick" />
    <HintButtonVue content="该操作很危险,请注意" type="primary" size="big" @click="handleClick" />

  </div>
</template>

<script type="text/ecmascript-6">
import HintButtonVue from './HintButton.vue'
export default {
  name: 'AttrsListenersTest',
  methods: {
    handleClick() {
      console.log(1)
    }
  },
  components: {
    HintButtonVue
  }
}
</script>
