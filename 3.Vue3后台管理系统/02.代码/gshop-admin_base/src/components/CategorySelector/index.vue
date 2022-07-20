<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select v-model="category1Id" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="formInline.region" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="formInline.region" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
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
import { reactive, computed } from 'vue'
import {useCategoryStore} from '@/stores/category';

const formInline = reactive({
  user: '',
  region: '',
})

const store = useCategoryStore();
console.log(store.category1Id)

const category1Id = computed({
    get(){
        return store.category1Id
    },
    set(id:any){
        store.setCategory1Id(id)
    }
})
</script>

<style scoped>
</style>