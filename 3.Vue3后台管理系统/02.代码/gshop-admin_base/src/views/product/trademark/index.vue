<template>
    <el-card class="box-card">
        <template #header>
            <el-button type="primary" :icon="Plus">添加</el-button>
        </template>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="Date" width="100" />
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="address" label="Address" />
            <el-table-column prop="address" label="Address" />
        </el-table>

        <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4" :page-sizes="[3, 6, 9, 12]"
            layout="prev, pager, next, jumper,->, sizes,total" :total="400" />
    </el-card>
</template>

<script setup lang="ts">
import {
    Plus
} from '@element-plus/icons-vue'

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

const currentPage4 = 2;
const pageSize4 = 3;
</script>

<style scoped>
</style>