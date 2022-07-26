<template>
    <el-form label-width="120px">

        <el-form-item label="SPU名称">
            {{ currentSpu.spuName }}
        </el-form-item>

        <el-form-item label="SKU名称">
            <el-input v-model="skuForm.skuName" placeholder="请输入SKU名称"></el-input>
        </el-form-item>

        <el-form-item label="价格(元)">
            <!-- <el-input-number v-model=""  :min="0" label="label"></el-input-number> -->
            <el-input v-model="skuForm.price" type="number" min="0" placeholder="请输入价格"></el-input>
        </el-form-item>

        <el-form-item label="重量(千克)">
            <el-input v-model="skuForm.weight" type="number" min="0" placeholder="请输入重量"></el-input>
        </el-form-item>

        <el-form-item label="规格描述">
            <el-input v-model="skuForm.skuDesc" type="textarea" rows="4" placeholder="请输入详细描述"></el-input>
        </el-form-item>

        <el-form-item label="平台属性">
            <el-form inline>
                <el-form-item v-for="attr in attrList" :key="attr.id" :label="attr.attrName">
                    <el-select placeholder="请选择">
                        <el-option v-for="attrValue in attr.attrValueList" :label="attrValue.valueName"
                            :value="attrValue.id!" :key="attrValue.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>

        <el-form-item label="销售属性">
            <el-form inline>
                <el-form-item v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id" :label="saleAttr.saleAttrName">
                    <el-select placeholder="请选择">
                        <el-option v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :label="saleAttrValue.saleAttrValueName"
                            :value="saleAttrValue.id!" :key="saleAttrValue.id!">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>

        <el-form-item label="图片列表">
            <el-table :data="spuImageList" border style="width: 100%">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column label="图片">
                    <template #default="{ row }">
                        <img :src="row.imgUrl" style="width:100px;height:100px;" alt="" srcset="">
                    </template>
                </el-table-column>
                <el-table-column prop="imgName" label="名称">
                </el-table-column>
                <el-table-column label="操作">
                </el-table-column>
            </el-table>

            <el-button type="primary">保存</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
export default {
    name: "SkuForm"
}

</script>

<script setup lang="ts">
import { getAttrInfoListApi } from '@/api/product/attr'
import { getSpuSaleAttrListApi, getSpuImageListApi } from '@/api/product/spu'
import { useCategoryStore } from '@/stores/category';

import type { SpuModel, SpuSaleAttrListModel, SpuImageListModel } from '@/api/product/model/spuModel';
import type { AttrListModel } from '@/api/product/model/attrModel';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';

const categoryStore = useCategoryStore();

interface Props {
    currentSpu: SpuModel
}

const props = defineProps<Props>();

/*
    该模块一共使用三个接口
        1.请求当前SPU所有的图片信息
            在spu.ts中查找
        2.请求当前SPU所有的销售属性
            在spu.ts中查找
        3.请求当前分类下所有的平台属性
            在attr.ts中查找
*/
const initData = () => ({
    // 以下三者数据都是SPU自带的，不需要我们收集
    category3Id: props.currentSpu.category3Id,
    spuId: props.currentSpu.id,
    tmId: props.currentSpu.tmId,
    // "createTime": "2022-07-26T04:10:53.225Z",    不需要
    // "id": 0, 不需要
    // "isSale": 0, 不需要

    // 以下四个数据收集非常简单,通过Input组件配合v-model就能实现
    skuName: "",
    price: 0,
    weight: "",
    skuDesc: "",

    // 以下四个数据需要我们手动收集,相对比较麻烦
    skuAttrValueList: [
        // {
        //     "attrId": 0,
        //     "attrName": "string",
        //     "id": 0,
        //     "skuId": 0,
        //     "valueId": 0,
        //     "valueName": "string"
        // }
    ],
    skuImageList: [
        // {
        //     "id": 0,
        //     "imgName": "string",
        //     "imgUrl": "string",
        //     "isDefault": "string",
        //     "skuId": 0,
        //     "spuImgId": 0
        // }
    ],
    skuSaleAttrValueList: [
        // {
        //     "id": 0,
        //     "saleAttrId": 0,
        //     "saleAttrName": "string",
        //     "saleAttrValueId": 0,
        //     "saleAttrValueName": "string",
        //     "skuId": 0,
        //     "spuId": 0
        // }
    ],
    skuDefaultImg: ""
});
const skuForm = ref(initData());

// 用于存储当前分类下所有的平台属性
const attrList = ref<AttrListModel>([]);

// 用于存储当前分类下所有的平台属性
const spuSaleAttrList = ref<SpuSaleAttrListModel>([]);

// 用于存储当前分类下所有的平台属性
const spuImageList = ref<SpuImageListModel>([]);


const getAttrInfoList = async () => {
    attrList.value = await getAttrInfoListApi({
        category1Id: categoryStore.category1Id,
        category2Id: categoryStore.category2Id,
        category3Id: categoryStore.category3Id
    });
}

const getSpuImageList = async () => {
    spuImageList.value = await getSpuImageListApi(props.currentSpu.id!);
}

const getSpuSaleAttrList = async () => {
    spuSaleAttrList.value = await getSpuSaleAttrListApi(props.currentSpu.id!);
}

onMounted(() => {
    /*
        async函数的返回值,一定是一个promise对象
        如果async函数中的代码执行结束,那么返回的promise对象的状态就会变为成功
    */
    const promise1 = getAttrInfoList();
    const promise2 = getSpuImageList();
    const promise3 = getSpuSaleAttrList();
    Promise.all([promise1, promise2, promise3])
        .then(() => {
            ElMessage.success("可以开始添加SKU了")
        })
})
</script>

<style scoped>
</style>