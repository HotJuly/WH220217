<template>
  <div class="box">
    <h1>组件间通信6: attrs</h1>
    <h2>需求: 自定义带Hover提示的按钮</h2>

    <HintButtonVue content="放心,没有坑" size="big" type="warning" @click="handleClick"/>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AttrsTest'
  }
</script>

<script lang="ts" setup>
import HintButtonVue from './HintButton.vue';

const handleClick=()=>{
  alert(111)
}
</script>