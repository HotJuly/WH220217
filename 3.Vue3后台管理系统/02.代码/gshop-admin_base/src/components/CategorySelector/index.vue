<template>
    <el-card>
        <el-form :inline="true" :disabled="disabled">
            <el-form-item label="一级分类">
                <el-select v-model="category1Id" placeholder="请选择">
                    <el-option v-for="category1 in categoryStore.category1List" 
                    :label="category1.name" 
                    :value="category1.id" 
                    :key="category1.id" 
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="category2Id" placeholder="请选择">
                    <el-option v-for="category2 in categoryStore.category2List" 
                    :label="category2.name" 
                    :value="category2.id" 
                    :key="category2.id" 
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="category3Id" placeholder="请选择">
                    <el-option v-for="category3 in categoryStore.category3List" 
                    :label="category3.name" 
                    :value="category3.id" 
                    :key="category3.id" 
                    />
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts">
export default {
    name: "CategorySelector"
}
</script>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCategoryStore } from '@/stores/category';

interface Props{
    disabled:boolean
}

const props = defineProps<Props>();

const categoryStore = useCategoryStore();
// console.log(store.category1Id)

const category1Id = computed({
    get() {
        return categoryStore.category1Id
    },
    set(id: any) {
        categoryStore.getCategory2List(id);
    }
})

const category2Id = computed({
    get() {
        return categoryStore.category2Id
    },
    set(id: any) {
        categoryStore.getCategory3List(id);
    }
})

const category3Id = computed({
    get() {
        return categoryStore.category3Id
    },
    set(id: any) {
        // categoryStore.setCategory1Id(id)
        categoryStore.setCategory3Id(id);
    }
})


onMounted(() => {
    categoryStore.getCategory1List();
})
</script>

<style scoped>
</style>