<template>
    <div>
        <CategorySelector />

        <!-- 给组件标签添加的class和style都会被该组件的根节点继承 -->
        <el-card style="margin-top:20px">
            <el-button type="primary" :icon="Plus">添加属性</el-button>
            <el-table :data="attrList" border style="width: 100%;margin-top:10px">
                <el-table-column type="index" label="序号" align="center" width="80" />
                <el-table-column prop="attrName" label="属性名称" width="150" />
                <el-table-column label="属性值列表">
                    <template #default="{ row }">
                        <el-tag type="success" 
                        style="margin-right:10px"
                        v-for="attrValue in row.attrValueList"
                        :key="attrValue.id"
                        >{{attrValue.valueName}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template #default>
                        <el-button type="primary" :icon="Edit"></el-button>
                        <el-button type="danger" :icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CategorySelector from '@/components/CategorySelector/index.vue';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';

import { useCategoryStore } from '@/stores/category';
import { getAttrInfoListApi } from '@/api/product/attr';
import { ElMessage } from 'element-plus';

const categoryStore = useCategoryStore();

const attrList = ref([]);

// console.log('categoryStore',categoryStore.category3Id)

// 如果是ref对象或者reactive对象,可以直接写入变量名
// 如果是reactive身上的一个属性,需要写成函数格式才能被进行监听
watch(() => categoryStore.category3Id, async () => {
    // watch的回调函数,第一个实参是最新值,第二个实参是更新之前的旧值
    // console.log(newValue,oldValue)
    attrList.value = await getAttrInfoListApi({
        category1Id: categoryStore.category1Id,
        category2Id: categoryStore.category2Id,
        category3Id: categoryStore.category3Id
    })
    ElMessage.success("属性列表请求成功");
})

</script>

<style scoped>
</style>