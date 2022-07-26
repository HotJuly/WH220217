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
                <el-form-item label="手机一级">
                    <el-select placeholder="请选择">
                        <el-option label="苹果" value="1">
                        </el-option>
                        <el-option label="华为" value="2">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机一级">
                    <el-select placeholder="请选择">
                        <el-option label="苹果" value="1">
                        </el-option>
                        <el-option label="华为" value="2">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>

        <el-form-item label="销售属性">
            <el-form inline>
                <el-form-item label="手机一级">
                    <el-select placeholder="请选择">
                        <el-option label="苹果" value="1">
                        </el-option>
                        <el-option label="华为" value="2">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机一级">
                    <el-select placeholder="请选择">
                        <el-option label="苹果" value="1">
                        </el-option>
                        <el-option label="华为" value="2">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>

        <el-form-item label="图片列表">
            <el-table border style="width: 100%">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column label="图片">
                </el-table-column>
                <el-table-column label="名称">
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
import type { SpuModel } from '@/api/product/model/spuModel';
import { ref } from 'vue';

interface Props {
    currentSpu: SpuModel
}

const props = defineProps<Props>();

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

</script>

<style scoped>
</style>