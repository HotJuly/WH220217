<template>
    <el-button type="primary" :icon="Plus">添加SPU</el-button>
    <el-table :data="tableData" border style="width: 100%;margin-top:10px;">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="spuName" label="SPU名称" />
        <el-table-column prop="description" label="SPU描述" />
        <el-table-column label="操作" >
            <template #default>
                <el-button type="primary" title="添加SKU" size="small" :icon="Plus"></el-button>
                <el-button type="primary" title="修改SPU" size="small" :icon="Edit"></el-button>
                <el-button type="info" title="查看SKU" size="small" :icon="InfoFilled"></el-button>
                <el-button type="danger" title="删除SPU" size="small" :icon="Delete"></el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination style="margin-top:10px;" v-model:currentPage="currentPage" v-model:page-size="pageSize"
        :page-sizes="[3, 6, 9, 12]" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script lang="ts">
export default {
    name: "SpuList"
}

</script>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue';

import { useCategoryStore } from '@/stores/category';

import { getSpuPageListApi } from '@/api/product/spu';
import type { SpuListModel } from '@/api/product/model/spuModel';
import { ElMessage } from 'element-plus';

const tableData = ref<SpuListModel>([]);

const categoryStore = useCategoryStore();
const currentPage = ref<number>(1);
const pageSize = ref<number>(3);
const total = ref<number>(0);

const handleCurrentChange = (page:number) => {
    currentPage.value = page;
    getSpuPageList();
}

const handleSizeChange = (limit:number) => {
    currentPage.value = 1;
    pageSize.value = limit;
    getSpuPageList();
}

const getSpuPageList = async () => {
    const result = await getSpuPageListApi(currentPage.value, pageSize.value, categoryStore.category3Id as number)
    tableData.value = result.records;
    total.value = result.total;
    ElMessage.success("SPU列表展示成功");
}

watch(() => categoryStore.category3Id, (newValue) => {
    if (newValue) {
        getSpuPageList();
    } else {
        // 清空页面数组
        tableData.value = [];
    }
},{
    immediate:true
});
</script>

<style scoped>
</style>