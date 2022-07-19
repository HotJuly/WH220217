<template>
    <el-card class="box-card">
        <template #header>
            <el-button type="primary" :icon="Plus">添加</el-button>
        </template>
        <el-table :data="tableData" border style="width: 100%">
            <!-- 
                prop的用处就是告知当前这一列显示的属性名称,该属性名称需要与每行的对象的属性名对应
                prop属性只有在默认以字符串形式展示属性值的时候才有用,如果已经使用插槽自定义解构了,就不需要写这个了
                 -->
            <el-table-column type="index" label="序号" align="center" width="100" />
            <el-table-column prop="tmName" label="品牌名称" />
            <el-table-column label="品牌LOGO">
                <template #default="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.logoUrl"></el-image>
                    <!-- {{scope.row}} -->
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default>
                    <el-button type="warning" :icon="Edit" size="small"></el-button>
                    <el-button type="danger" :icon="Delete" size="small"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 6, 9, 12]"
            layout="prev, pager, next, jumper,->, sizes,total" :total="total"
            @current-change="handleCurrentChange" @size-change="handleSizeChange" />
    </el-card>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'

import { getTrademarkPageListApi } from '@/api/product/trademark'

const tableData = ref([]);

const currentPage = ref(1);
const pageSize = ref(3);
const total = ref();

const getTrademarkPageList = async () => {
    const result = await getTrademarkPageListApi(currentPage.value, pageSize.value);
    console.log(result);
    tableData.value = result.records;
    total.value = result.total;
}

const handleCurrentChange = (page:number)=>{
    // console.log(page)
    // Vue更新数据是同步更新,页面是异步更新
    // 注意:只要更新了对应状态数据,下一行代码一定能得到最新的结果
    currentPage.value = page;
    // console.log(currentPage.value)
    getTrademarkPageList()
}

const handleSizeChange = (size:number)=>{
    // console.log(size)
    currentPage.value = 1;
    pageSize.value = size;
    getTrademarkPageList();
}

onMounted(() => {
    getTrademarkPageList();
})
</script>

<style scoped>
</style>