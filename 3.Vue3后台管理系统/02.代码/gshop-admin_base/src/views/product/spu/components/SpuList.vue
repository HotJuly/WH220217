<template>
    <el-button type="primary" :icon="Plus" @click="showAdd">添加SPU</el-button>
    <el-table :data="tableData" border style="width: 100%;margin-top:10px;">
        <el-table-column type="index" align="center" label="序号" width="80" />
        <el-table-column prop="spuName" label="SPU名称" />
        <el-table-column prop="description" label="SPU描述" />
        <el-table-column label="操作">
            <template #default="{ row }">
                <el-button type="primary" title="添加SKU" size="small" :icon="Plus" @click="toSkuForm(row)"></el-button>
                <el-button type="primary" title="修改SPU" size="small" :icon="Edit" @click="editSpu(row)"></el-button>
                <el-button type="info" title="查看SKU" size="small" 
                :icon="InfoFilled"
                @click="showSkuList(row)"
                ></el-button>
                <el-button type="danger" title="删除SPU" size="small" :icon="Delete" @click="deleteSpu(row)"></el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination style="margin-top:10px;" v-model:currentPage="currentPage" v-model:page-size="pageSize"
        :page-sizes="[3, 6, 9, 12]" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    <el-dialog v-model="isShowSkuList" :title="`${spu?.spuName}=> SKU列表`">
        <el-table :data="skuList">
            <el-table-column property="skuName" label="名称" />
            <el-table-column property="price" label="价格(元)"/>
            <el-table-column property="weight" label="重量(千克)" />
            <el-table-column  label="默认图片" >
                <template #default="{row}">
                    <img :src="row.skuDefaultImg" style="width:100px;" alt="" srcset="">
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>

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

import { getSpuPageListApi, deleteSpuApi } from '@/api/product/spu';
import { getSkuListApi } from '@/api/product/sku';
import type { SpuListModel, SpuModel } from '@/api/product/model/spuModel';
import type { SkuListModel } from '@/api/product/model/skuModel';
import { ElMessage, ElMessageBox } from 'element-plus';

import { ShowStatus } from '../types';

const tableData = ref<SpuListModel>([]);

const categoryStore = useCategoryStore();
const currentPage = ref<number>(1);
const pageSize = ref<number>(6);
const total = ref<number>(0);

// 用于控制dialog显示隐藏
const isShowSkuList = ref<boolean>(false);

// 用于存储服务器返回的sku的列表数据
const skuList = ref<SkuListModel>([]);

// 用于存储用户选中的spu
const spu = ref<SpuModel>();

interface Emits {
    (event: "changeShowStatus", value: ShowStatus): void
    (event: "setCurrentSpu", spu?: SpuModel): void
}
const emits = defineEmits<Emits>();

const handleCurrentChange = (page: number) => {
    currentPage.value = page;
    getSpuPageList();
}

const handleSizeChange = (limit: number) => {
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

// 监视用户点击添加按钮,切换SPUForm组件显示操作
const showAdd = () => {
    emits('changeShowStatus', ShowStatus.SpuForm);
    emits('setCurrentSpu');
}

// 用于监视用户点击修改SPU按钮
const editSpu = (row: SpuModel) => {
    emits('changeShowStatus', ShowStatus.SpuForm);
    emits('setCurrentSpu', {
        ...row,
        spuSaleAttrList: [],
        spuImageList: []
    });
}

const deleteSpu =async  (spu: SpuModel) => {
    const promise =  ElMessageBox.confirm(
        `你确定要删除${spu.spuName}吗?`,
        "警告", 
        {
            confirmButtonText: '确定删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    );
    await promise;
    // 能执行以下代码,说明用户点击了确定删除按钮
    await deleteSpuApi(spu.id!);
    ElMessage.success(`${spu.spuName}已删除`);
    currentPage.value = tableData.value.length>1?currentPage.value:currentPage.value-1;
    getSpuPageList();
}

const toSkuForm = (row:SpuModel)=>{
    emits("changeShowStatus",ShowStatus.SkuForm);
    emits("setCurrentSpu",{
        ...row,
        spuImageList:[],
        spuSaleAttrList:[]
    });
}

// 用于监视用户点击查看SKU按钮
const showSkuList =async (row:SpuModel)=>{
    spu.value = row;
    skuList.value = await getSkuListApi(row.id!);
    isShowSkuList.value = true;
}

watch(() => categoryStore.category3Id, (newValue) => {
    if (newValue) {
        getSpuPageList();
    } else {
        // 清空页面数组
        tableData.value = [];
    }
}, {
    immediate: true
});
</script>

<style scoped>
</style>