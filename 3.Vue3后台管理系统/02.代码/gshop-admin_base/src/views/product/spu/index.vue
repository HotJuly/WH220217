<template>
    <CategorySelector :disabled="false" />

    <el-card style="margin-top:10px">
        <SpuList v-if="showStatus === ShowStatus.SpuList" @setCurrentSpu="setCurrentSpu" @changeShowStatus="changeShowStatus" />
        <SpuForm v-else-if="showStatus === ShowStatus.SpuForm" :currentSpu="currentSpu" @changeShowStatus="changeShowStatus" />
        <SkuForm v-else-if="showStatus === ShowStatus.SkuForm" :currentSpu="currentSpu" @changeShowStatus="changeShowStatus" />
    </el-card>
</template>

<script  lang="ts">
export default {
    name: "Spu"
}
</script>

<script setup lang="ts">
import { ref } from 'vue';

import CategorySelector from '@/components/CategorySelector/index.vue';
import SpuList from './components/SpuList.vue';
import SpuForm from './components/SpuForm.vue';
import SkuForm from './components/SkuForm.vue';

import type { SpuModel } from '@/api/product/model/spuModel'

import { ShowStatus } from './types';

const showStatus = ref<ShowStatus>(ShowStatus.SpuList);

// 这里需要修改一下SPUModel的category3Id的类型
const initSpu = ():SpuModel => ({
    id: undefined,
    spuName: "",
    description: "",
    category3Id: undefined,
    tmId: undefined,
    spuSaleAttrList: [],
    spuImageList: []
})
const currentSpu = ref<SpuModel>(initSpu());

const changeShowStatus = (value: any) => {
    showStatus.value = value;
}

// 用于获取List组件中,用户想要修改的SPU
const setCurrentSpu = (spu:SpuModel = initSpu())=>{
    currentSpu.value = spu;
}
</script>

<style scoped>
</style>