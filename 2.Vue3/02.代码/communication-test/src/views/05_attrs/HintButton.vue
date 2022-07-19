<template>
    <el-tooltip effect="dark" :content="content" placement="top">
        <!-- <el-button :size="size" :type="type">删除</el-button> -->
        <!-- Vue3中不需要在写完 v-on="$listeners" -->
        <!-- <el-button v-bind="$attrs" v-on="$listeners">删除</el-button> -->
        <el-button v-bind="$attrs" >删除</el-button>
    </el-tooltip>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';

// defineProps(["content","size","type"])
defineProps(["content"])

// Vue3在模版中使用$attrs没有变化
// 主要的变化是在JS中,没有this,无法从this身上找到$attrs属性了

// Vue2中的$listeners用于收集当前组件所有的自定义事件
// Vue3中没有这个家伙了
// Vue3中$attrs对象等于Vue2中的$attrs+$listeners

// 模版中常见的预留关键字:$emit,$event,$attrs

const attrs = useAttrs();
console.log(attrs)
</script>

<style scoped>

</style>