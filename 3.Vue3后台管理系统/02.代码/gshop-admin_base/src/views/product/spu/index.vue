<template>
    <CategorySelector :disabled="false"/>

    <el-card>
        <SpuList v-if="showStatus === ShowStatus.SpuList" @changeShowStatus="changeShowStatus"/>
        <SpuForm v-else-if="showStatus === ShowStatus.SpuForm" @changeShowStatus="changeShowStatus"/>
        <SkuForm v-else-if="showStatus === ShowStatus.SkuForm" @changeShowStatus="changeShowStatus"/>
    </el-card>
</template>

<script  lang="ts">
export default {
    name: "Spu"
}
</script>

<script setup lang="ts">
import {ref} from 'vue';

import CategorySelector from '@/components/CategorySelector/index.vue';
import SpuList from './components/SpuList.vue';
import SpuForm from './components/SpuForm.vue';
import SkuForm from './components/SkuForm.vue';

import { ShowStatus } from './types';

const showStatus = ref<ShowStatus>(ShowStatus.SpuList);

const changeShowStatus = (value:any)=>{
    showStatus.value = value;
}
</script>

<style scoped>
</style>