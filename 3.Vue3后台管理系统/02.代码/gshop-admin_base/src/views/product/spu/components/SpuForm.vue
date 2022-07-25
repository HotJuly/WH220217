<template>
    <el-form label-width="120px">
        <el-form-item label="SPU名称">
            <el-input v-model="spuForm.spuName" placeholder="请输入SPU名称" />
        </el-form-item>

        <el-form-item label="品牌">
            <el-select v-model="spuForm.tmId" placeholder="请选择品牌">
                <el-option 
                v-for="tm in tmList"
                :label="tm.tmName" 
                :value="tm.id!"
                :key="tm.id!"
                >
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="SPU描述">
            <el-input v-model="spuForm.description" rows="4" type="textarea" placeholder="请输入详细描述" />
        </el-form-item>

        <el-form-item label="SPU图片">
            <el-upload v-model:file-list="(spuImageList as any)"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>

        <el-form-item label="销售属性">
            <el-select v-model="d" placeholder="">
                <el-option
                    label="label1"
                    value="1">
                </el-option>
                <el-option
                    label="label2"
                    value="2">
                </el-option>
            </el-select>
            <el-button type="primary" :icon="Plus">添加销售属性</el-button>

            <el-table :data="spuForm.spuSaleAttrList" style="width: 100%;margin:20px 0;" border>
                <el-table-column
                    type="index"
                    label="序号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="saleAttrName"
                    label="属性名"
                    width="150">
                </el-table-column>
                <el-table-column
                    label="属性值名称列表">
                    <template #default>
                      1
                    </template>
                </el-table-column>
                <el-table-column
                    prop="prop"
                    label="操作"
                    width="150">
                    <template #default>
                      <el-button type="danger" :icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <el-button type="primary">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
export default {
    name: "SpuForm"
}

</script>

<script setup lang="ts">

import { ref, reactive, onMounted } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash'

import { getTrademarkListApi, getBaseSaleAttrListApi, getSpuImageListApi, getSpuSaleAttrListApi } from '@/api/product/spu';

import type { UploadProps, UploadUserFile } from 'element-plus'
import { ShowStatus } from '../types';
import type { SpuModel, BaseSaleAttrListModel, SpuImageListModel } from '@/api/product/model/spuModel';
import type { TrademarkListModel } from '@/api/product/model/TrademarkModel';

interface Emits{
    (event:"changeShowStatus",value:ShowStatus):void
}

const emits = defineEmits<Emits>();

interface Props{
    currentSpu:SpuModel
}

const props = defineProps<Props>();

// 该对象用于收集所有的表单数据,后续用于发送请求
const spuForm = reactive(cloneDeep(props.currentSpu))

const d = ref('')

// 用于存储当前平台所有品牌
const tmList = ref<TrademarkListModel>()

// 用于存储当前平台所有销售属性
const baseSaleAttrList = ref<BaseSaleAttrListModel>()

// 用于存储当前spu的所有图片信息(暂时不放在spuForm身上,等确定修改再放入)
const spuImageList = ref<SpuImageListModel>()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const cancel = ()=>{
    emits('changeShowStatus',ShowStatus.SpuList);
}

const getTrademarkList = async ()=>{
  tmList.value = await getTrademarkListApi();
}

const getBaseSaleAttrList = async ()=>{
  baseSaleAttrList.value = await getBaseSaleAttrListApi();
}

const getSpuImageList = async ()=>{
  // baseSaleAttrList.value = await getSpuImageListApi(spuForm.id as number);
  spuImageList.value = await getSpuImageListApi(spuForm.id!);
  // 由于upload组件,想要展示图片墙,要求每个对象必须具有name和url属性,所以在此动态添加
  spuImageList.value?.forEach((imageObj)=>{
    imageObj.url = imageObj.imgUrl;
    imageObj.name = imageObj.imgName;
  })
}

const getSpuSaleAttrList = async ()=>{
  spuForm.spuSaleAttrList = await getSpuSaleAttrListApi(spuForm.id!);
}

onMounted(()=>{
  // 以下两个请求,无论是添加还是修改都要发送
  getTrademarkList();
  getBaseSaleAttrList();

  if(spuForm.id){
    // 说明当前是修改SPU
    getSpuImageList();
    getSpuSaleAttrList();
  }
})
</script>

<style scoped>
</style>