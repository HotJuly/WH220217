<template>
  <div class="box">
    <ul>
      <li v-for="(item, index) in data" :key="item.id">
        <!-- 
          子组件需要向父组件传递数据 ==> 作用域插槽
          slot标签的所有属性会自动传递给父组件
         -->
        <slot :row="item" :$index="index"/> <!-- 插槽点位 -->
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { Users } from './types';

  interface Props {
    data: Users;
  }
  defineProps<Props>()
</script>