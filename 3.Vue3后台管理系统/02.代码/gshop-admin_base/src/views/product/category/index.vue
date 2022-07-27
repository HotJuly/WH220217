<template>
    <el-card>
        <el-table
            v-loading="loading"
            :data="category1List"
            style="width: 100%"
            :row-key="getRowKey"
            border
            lazy
            :load="load"
            :tree-props="{ hasChildren: 'hasChildren' }"
            >
            <el-table-column align="center" prop="id" label="分类ID" width="180" />
            <el-table-column prop="name" label="分类名称" />
            <el-table-column label="操作" width="250" />
        </el-table>
    </el-card>
</template>

<script lang="ts">
export default {
    name:"Category"
}
</script>

<script setup lang="ts">
import {ref,onMounted} from 'vue';

import type { CategoryListModel,CategoryModel } from '@/api/product/model/categoryModel'
import { getCategory1ListApi, getCategory2ListApi, getCategory3ListApi } from '@/api/product/category'
import { ElMessage } from 'element-plus';

const category1List = ref<CategoryListModel>([]);

const loading = ref<boolean>(false);

// 当用户第一次点击没有展开的分类的时候,会执行该函数
const load = async (
  row: CategoryModel,
  treeNode: unknown,
  resolve: (data: CategoryModel[]) => void
) => {
    // 如果已经获取到数据了,可以通过resolve方法将数据传递给当前的table表格实现树形展示
    // console.log(row)

    if(row.level===1){
        // 说明用户点了1级分类的展开按钮,需要请求对应的二级分类数据
        const category2List = await getCategory2ListApi(row.id);

        category2List.forEach((category2)=>{
            category2.hasChildren = true;
            category2.level = 2;
        })

        resolve(category2List);
    }else if(row.level===2){
        // 说明用户点了2级分类的展开按钮,需要请求对应的三级分类数据
        const category3List = await getCategory3ListApi(row.id);

        category3List.forEach((category3)=>{
            category3.hasChildren = false;
            category3.level = 3;
        })

        resolve(category3List);
    }
}

const getCategory1List =async ()=>{
    loading.value=true;
    category1List.value = await getCategory1ListApi();

    category1List.value.forEach((category1)=>{
        // 用于显示展开按钮
        category1.hasChildren = true;

        // 用于说明当前分类对象的等级
        category1.level=1;
    })
    ElMessage.success("一级分类列表加载结束")
    loading.value=false;
};

// 用于给每一行添加一个唯一的row-key值,防止出现BUG
const getRowKey = (row:CategoryModel)=>{
    return `${row.level}-${row.id}`;
}

onMounted(()=>{
    getCategory1List();
})
</script>

<style scoped>

</style>