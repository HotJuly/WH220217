<template>
    <el-form label-width="120px" :disabled="requestResult">

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
                    <el-select v-model="attr.inputValue" placeholder="请选择">
                        <el-option v-for="attrValue in attr.attrValueList" :label="attrValue.valueName"
                            :value="`${attr.id}-${attrValue.id!}`" :key="attrValue.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>

        <el-form-item label="销售属性">
            <el-form inline>
                <el-form-item v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id" :label="saleAttr.saleAttrName">
                    <el-select v-model="saleAttr.inputValue" placeholder="请选择">
                        <el-option v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :label="saleAttrValue.saleAttrValueName"
                            :value="`${saleAttr.baseSaleAttrId}-${saleAttrValue.id!}`" :key="saleAttrValue.id!">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>

        <el-form-item label="图片列表">
            <el-table :data="spuImageList" border style="width: 100%" @selection-change="handleChange">
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
                    <template #default="{row,$index}">
                        <el-tag  v-if="row.isDefault==='1'" type="success">默认</el-tag>
                        <el-button size="small" @click="changeDefault($index)" v-else type="primary">设为默认</el-button>
                    </template>
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
        //     "attrId": 0,     需要,当前属性的id
        //     "attrName": "string",    不需要
        //     "id": 0,         不需要
        //     "skuId": 0,      不需要
        //     "valueId": 0,    需要,当前属性值的id
        //     "valueName": "string"    不需要
        // }
    ],
    skuImageList: [
        // {
        //     "id": 0, 不需要
        //     "imgName": "string", 需要
        //     "imgUrl": "string",  需要
        //     "isDefault": "string",   需要
        //     "skuId": 0,  不需要
        //     "spuImgId": 0 需要
        // }
    ],
    skuSaleAttrValueList: [
        // {
        //     "id": 0,     不需要
        //     "saleAttrId": 0, 需要
        //     "saleAttrName": "string",    不需要
        //     "saleAttrValueId": 0,    需要
        //     "saleAttrValueName": "string",   不需要
        //     "skuId": 0,不需要
        //     "spuId": 0不需要
        // }
    ],
    skuDefaultImg: ""
});
const skuForm = ref(initData());

const requestResult = ref<boolean>(true);

// 用于存储当前分类下所有的平台属性
const attrList = ref<AttrListModel>([]);

// 用于存储当前分类下所有的平台属性
const spuSaleAttrList = ref<SpuSaleAttrListModel>([]);

// 用于存储当前分类下所有的平台属性
const spuImageList = ref<SpuImageListModel>([]);

// 用于存储用户选中的图片信息
const selectedImageList = ref<SpuImageListModel>([]);

// 获取当前分类下,所有的平台属性
const getAttrInfoList = async () => {
    attrList.value = await getAttrInfoListApi({
        category1Id: categoryStore.category1Id,
        category2Id: categoryStore.category2Id,
        category3Id: categoryStore.category3Id
    });
}

// 获取当前spu下,所有的图片数据
const getSpuImageList = async () => {
    spuImageList.value = await getSpuImageListApi(props.currentSpu.id!);

    // 在数据请求回来的时候,默认给所有图片都添加上isDefault属性,方便后面发送请求
    // isDefault为"0",代表不是默认图,为"1"代表此为默认图
    spuImageList.value.forEach((imageObj)=>{
        imageObj.isDefault = "0"
    })

    // 将第一张图的url作为默认展示图片使用
    skuForm.value.skuDefaultImg = spuImageList.value[0].imgUrl;
    spuImageList.value[0].isDefault = "1";
}

// 获取当前spu下,所有的销售属性数据
const getSpuSaleAttrList = async () => {
    spuSaleAttrList.value = await getSpuSaleAttrListApi(props.currentSpu.id!);
}

// 用于监视用于对图片table进行多选操作
const handleChange = (selection:SpuImageListModel)=>{
    // console.log('handleChange',selection)
    // 千万不要修改spuImageList中的数据,因为用户有可能会反悔,还想选择其他的内容
    // 而且修改该数据,很可能导致页面显示失败
    // spuImageList.value = selection;
    selectedImageList.value = selection;
}

// 用于监视用户点击设为默认按钮,切换默认图的设置
const changeDefault = (index:number)=>{
    // 无论上一个默认图是谁,数组中所有图片都变为非默认
    spuImageList.value.forEach((imageObj)=>{
        imageObj.isDefault = "0";
    });

    // 找到用户当前点击的图片对象,将其isDefault更新为"1",变为默认图
    const imageObj = spuImageList.value[index];
    imageObj.isDefault="1";
    skuForm.value.skuDefaultImg = imageObj.imgUrl;
}

onMounted(() => {
    /*
        async函数的返回值,一定是一个promise对象
        如果async函数中的代码执行结束,那么返回的promise对象的状态就会变为成功
    */
    const promise1 = getAttrInfoList();
    const promise2 = getSpuImageList();
    const promise3 = getSpuSaleAttrList();

    // all方法会返回一个promise对象,返回的promise对象的状态与all中所有的promise有关
    // 所有promise都成功,那么返回的promise也变为成功
    // 如果有一个promise失败,那么返回的promise也变为失败
    Promise.all([promise1, promise2, promise3])
        .then(() => {
            requestResult.value = false;
            ElMessage.success("可以开始添加SKU了")
        })
        .catch(()=>{
            ElMessage.success("当前网络异常,无法添加SKU,请稍后再试")
        })
})
</script>

<style scoped>
</style>