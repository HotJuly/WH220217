<template>
    <el-card>
        <el-table :data="skuList" border>
            <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
            <el-table-column prop="skuName" label="名称"></el-table-column>
            <el-table-column prop="skuDesc" label="描述"></el-table-column>
            <el-table-column label="默认图片">
                <template #default="{ row }">
                    <img style="width:100px;height:100px" :src="row.skuDefaultImg" alt="" srcset="">
                </template>
            </el-table-column>
            <el-table-column prop="weight" label="重量(千克)"></el-table-column>
            <el-table-column prop="price" label="价格(元)"></el-table-column>
            <el-table-column label="操作" width="250">
                <template #default="{ row }">
                    <el-button v-if="!row.isSale" @click="onSale(row)" type="info" size="small" :icon="Top"></el-button>
                    <el-button v-else type="success" @click="cancelSale(row)" size="small" :icon="Bottom"></el-button>
                    <el-button type="primary" size="small" :icon="Edit"></el-button>
                    <el-button type="info" @click="showDrawer(row)" size="small" :icon="InfoFilled"></el-button>
                    <el-button type="danger" size="small" :icon="Delete"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
            layout="prev, pager, next, jumper,->, sizes,total" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />

        <el-drawer v-model="isShowDrawer" :with-header="false" size="50%" direction="rtl">
            <el-row>
                <el-col :span="5">名称</el-col>
                <el-col :span="16">{{currentSku.skuName}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">描述</el-col>
                <el-col :span="16">{{currentSku.skuDesc}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">价格</el-col>
                <el-col :span="16">{{currentSku.price}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">平台属性</el-col>
                <el-col :span="18">
                    <el-tag 
                    v-for="attr in currentSku.skuAttrValueList"
                    :key="attr.valueId"
                    style="margin-right:10px;"
                    type="success" >
                    {{attr.attrName +'-'+ attr.valueName}}
                    </el-tag>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">销售属性</el-col>
                <el-col :span="18">
                    <el-tag 
                    v-for="attr in currentSku.skuSaleAttrValueList"
                    :key="attr.saleAttrValueId"
                    style="margin-right:10px;"
                    type="success" >
                    {{attr.saleAttrName +'-'+ attr.saleAttrValueName}}
                    </el-tag></el-col>
            </el-row>
            <el-row>
                <el-col :span="5">商品图片</el-col>
                <el-col :span="16">
                    <el-carousel height="400px">
                        <el-carousel-item v-for="image in currentSku.skuImageList" :key="image.spuImgId">
                            <img style="width:400px;height:400px" :src="image.imgUrl" alt="" srcset="">
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </el-drawer>
    </el-card>
</template>

<script lang="ts">
export default {
    name: "Sku"
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Top, Bottom, Edit, InfoFilled, Delete } from '@element-plus/icons-vue'

import { getSkuPageListApi, onSaleApi, cancelSaleApi, getSkuInfoApi } from '@/api/product/sku';
import type { SkuListModel, SkuModel } from '@/api/product/model/skuModel';
import { ElMessage } from 'element-plus';
const skuList = ref<SkuListModel>([]);

const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);

// 用于控制抽屉的显示隐藏
const isShowDrawer = ref<boolean>(false);

const initData = ():SkuModel => ({
    category3Id: undefined,
    spuId: undefined,
    tmId: undefined,

    skuName: "",
    price: 0,
    weight: 0,
    skuDesc: "",

    // 以下四个数据需要我们手动收集,相对比较麻烦
    skuAttrValueList: [],
    skuImageList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: "",

    id: undefined
})

// 用于存储抽屉组件中需要展示的sku的数据
const currentSku = ref<SkuModel>(initData());

const handleCurrentChange = () => {

}
const handleSizeChange = () => {

}

// 当前函数需要接受两个参数,可以不穿,如果不传参数相当于是刷新当前列表
const getSkuPageList = async (
    page: number = currentPage.value,
    limit: number = pageSize.value
) => {
    const { records, total: sum } = await getSkuPageListApi(page, limit);
    skuList.value = records;
    total.value = sum;
}

// 用于操作商品上下架
const onSale = async (row: SkuModel) => {
    await onSaleApi(row.id!);
    ElMessage.success("商品上架成功");

    getSkuPageList();
}
const cancelSale = async (row: SkuModel) => {
    await cancelSaleApi(row.id!);
    ElMessage.success("商品下架成功");

    getSkuPageList();
}

// 用于控制抽屉组件的显示隐藏
const showDrawer =async (row:SkuModel) => {
    currentSku.value = await getSkuInfoApi(row.id!);
    isShowDrawer.value = true;
}

onMounted(() => {
    getSkuPageList();
})
</script>

<style scoped>
</style>