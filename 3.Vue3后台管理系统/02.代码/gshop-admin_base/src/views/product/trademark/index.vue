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

                <!-- 声明使用插槽来自定义table表格该列中显示的内容 -->
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

        <!-- pagination组件可以通过layout属性控制分页器内容的排列顺序 -->
        <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 6, 9, 12]"
            layout="prev, pager, next, jumper,->, sizes,total" :total="total"
            @current-change="handleCurrentChange" @size-change="handleSizeChange" />
    </el-card>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'

import { getTrademarkPageListApi } from '@/api/product/trademark'

// 用于控制table组件显示的数据
const tableData = ref([]);

// 用于存储当前处于第几页
const currentPage = ref(1);

// 用于存储当前页面显示数据条数
const pageSize = ref(3);

// 用于存储当前品牌总数量
const total = ref();

// 用于发送请求获取当前品牌列表数据,并自动更新到对应的响应数据中
const getTrademarkPageList = async () => {
    const result = await getTrademarkPageListApi(currentPage.value, pageSize.value);
    console.log(result);
    tableData.value = result.records;
    total.value = result.total;
}

// 该方法会交给分页器组件,用于监视用户修改当前页数操作
const handleCurrentChange = (page:number)=>{
    // console.log(page)
    // Vue更新数据是同步更新,页面是异步更新
    // 注意:只要更新了对应状态数据,下一行代码一定能得到最新的结果
    currentPage.value = page;
    // console.log(currentPage.value)
    getTrademarkPageList()
}

// 该方法会交给分页器组件,用于监视用户修改当前页面显示条数操作
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