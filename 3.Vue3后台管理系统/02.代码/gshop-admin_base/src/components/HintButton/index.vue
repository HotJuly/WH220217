<template>
    <!-- <el-popconfirm :title="title"> -->
    <!-- <el-popconfirm @confirm="emits('confirm')" :title="title">
        <template #reference>
            <el-button v-bind="$attrs"></el-button>
        </template>
    </el-popconfirm> -->
    
    <el-popconfirm v-bind="attrs" :title="title">
        <template #reference>
            <el-button v-bind="$attrs"></el-button>
        </template>
    </el-popconfirm>
</template>

<script lang="ts">
export default {
    name: "HintButton"
}
</script>

<script setup lang="ts">
import { useAttrs } from 'vue';
interface Props{
    title:string;
}
defineProps<Props>()


// interface Emits{
//     (event:"confirm",id:number):void
// }
// const emits = defineEmits<Emits>();

// 如果没有呗defineEmits接收的事件,就会存在于attrs内部
const attrs = useAttrs();

console.log(attrs)
</script>

<style scoped>
</style>