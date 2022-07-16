<template>
  <div class="box">
    <h1>组件间通信6: attrs</h1>
    <h2>需求: 自定义带Hover提示的按钮</h2>

    <!-- 
      自定义事件监听只有当子组件内部分发对应的事件时才会触发
      对el-button组件内部: 它分发了自定义click事件, 但没有分发自定义dblclick事件
      如果需要el-button能处理双击, 得绑定原生的dblclick事件
     -->
    <HintButton title="添加用户" type="primary" :icon="Plus" @click="add" @xxx="add"/>
    <HintButton title="修改用户" type="info" :icon="Edit" size="small" round @click="update"/>
    <HintButton title="删除用户" type="danger" :icon="Delete" size="small" circle @click="remove"/>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AttrsListenersTest'
  }
</script>
<script lang="ts" setup>
  import {Plus, Edit, Delete} from '@element-plus/icons-vue'
  import HintButton from './HintButton.vue'

  const add = () => alert('添加用户')
  const update = () => alert('更新用户')
  const remove = () => alert('删除用户')
</script>