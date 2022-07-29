<template>
    <el-card>
        <el-table ref="tableRef" v-loading="loading" :data="category1List" style="width: 100%" :row-key="getRowKey" border lazy
            :load="load" :tree-props="{ hasChildren: 'hasChildren' }">
            <el-table-column align="center" prop="id" label="分类ID" width="180" />
            <el-table-column prop="name" label="分类名称" />
            <el-table-column label="操作" width="250">
                <template #header>
                    <el-input v-model="category1Name" placeholder="按ENTER键添加一级分类"></el-input>
                </template>
                <template #default="{ row }">
                    <el-button type="primary" @click="addCategory(row)" size="small" title="添加子分类"
                        :disabled="row.level === 3" :icon="Plus"></el-button>
                    <el-button type="primary" size="small" title="编辑分类" :icon="Edit"></el-button>
                    <el-button type="danger" size="small" title="删除分类" :icon="Delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="isShowAdd" title="添加分类">
            <el-form :model="categoryForm">
                <el-form-item label="分类名称" label-width="120">
                    <el-input v-model="categoryForm.name" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="save">保存</el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<script lang="ts">
export default {
    name: "Category"
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { Plus, Edit, Delete } from '@element-plus/icons-vue';

import type { CategoryListModel, CategoryModel } from '@/api/product/model/categoryModel'
import { getCategory1ListApi, getCategory2ListApi, getCategory3ListApi, saveCategory1Api, saveCategory2Api, saveCategory3Api } from '@/api/product/category'
import { ElMessage } from 'element-plus';

const category1List = ref<CategoryListModel>([]);

const loading = ref<boolean>(false);

// 用于接收用户输入的需要添加的一级分类名称
const category1Name = ref<string>('');

// 用于控制dialog的显示隐藏
const isShowAdd = ref<boolean>(false);

// 用于收集用户输入的表单数据
const initData = ():CategoryModel =>({
    name:""
})
const categoryForm = ref<CategoryModel>(initData());

// 用于存储用户当前点击的分类对象,用于后续添加使用
const currentCategory = ref<CategoryModel>();

const tableRef =  ref<any>();

// 当用户第一次点击没有展开的分类的时候,会执行该函数
const load = async (
    row: CategoryModel,
    treeNode: unknown,
    resolve: (data: CategoryModel[]) => void
) => {
    // 如果已经获取到数据了,可以通过resolve方法将数据传递给当前的table表格实现树形展示
    // console.log(row)

    if (row.level === 1) {
        // 说明用户点了1级分类的展开按钮,需要请求对应的二级分类数据
        const category2List = await getCategory2ListApi(row.id);

        category2List.forEach((category2) => {
            category2.hasChildren = true;
            category2.level = 2;
        })

        resolve(category2List);
    } else if (row.level === 2) {
        // 说明用户点了2级分类的展开按钮,需要请求对应的三级分类数据
        const category3List = await getCategory3ListApi(row.id);

        category3List.forEach((category3) => {
            category3.hasChildren = false;
            category3.level = 3;
        })

        resolve(category3List);
    }
}

const getCategory1List = async () => {
    loading.value = true;
    category1List.value = await getCategory1ListApi();

    category1List.value.forEach((category1) => {
        // 用于显示展开按钮
        category1.hasChildren = true;

        // 用于说明当前分类对象的等级
        category1.level = 1;
    })
    ElMessage.success("一级分类列表加载结束")
    loading.value = false;
};

// 用于给每一行添加一个唯一的row-key值,防止出现BUG
const getRowKey = (row: CategoryModel) => {
    return `${row.level}-${row.id}`;
}

// 用于监视用户点击添加子分类按钮
// 该函数是用于添加二级分类和添加三级分类的,不能添加一级分类
const addCategory = (row: CategoryModel) => {
    isShowAdd.value = true;
    currentCategory.value = row;
}

// 用于监视用户点击保存按钮
const save = async ()=>{
    if(currentCategory.value?.level===1){
        // 能进入这里,说明用户点击了一级分类的添加子分类按钮,需要添加的是二级分类
        categoryForm.value.category1Id = currentCategory.value.id!;

        await saveCategory2Api(categoryForm.value);
        ElMessage.success("子分类添加成功")

    }else if(currentCategory.value?.level===2){
        // 能进入这里,说明用户点击了二级分类的添加子分类按钮,需要添加的是三级分类
        categoryForm.value.category2Id = currentCategory.value.id!;

        await saveCategory3Api(categoryForm.value);
        ElMessage.success("子分类添加成功")

    }
    
    const key = `${currentCategory.value?.level}-${currentCategory.value?.id}`;
    if(tableRef.value){
        // 通过源码找到对方的数据存储位置,清空数据的状态,将loaded属性改为false,代表没有展开过
        tableRef.value.store.states.treeData.value[key].loaded=false;

        // 要求table表格重新加载当前行的子数据
        tableRef.value.store.loadOrToggle(currentCategory.value);
    }
    // getCategory1List();
    isShowAdd.value=false;
    categoryForm.value = initData();
}

// 用于监视用户点击取消按钮
const cancel = ()=>{
    isShowAdd.value=false;
    categoryForm.value = initData();
}

onMounted(() => {
    getCategory1List();
})
</script>

<style scoped>
</style>