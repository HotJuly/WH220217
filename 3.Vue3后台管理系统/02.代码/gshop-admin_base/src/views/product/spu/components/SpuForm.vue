<template>
    <el-form label-width="120px">
        <el-form-item label="SPU名称">
            <el-input v-model="a" placeholder="请输入SPU名称" />
        </el-form-item>

        <el-form-item label="品牌">
            <el-select v-model="b" placeholder="请选择品牌">
                <el-option label="苹果" value="1">
                </el-option>
                <el-option label="华为" value="2">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="SPU描述">
            <el-input v-model="c" rows="4" type="textarea" placeholder="请输入详细描述" />
        </el-form-item>

        <el-form-item label="SPU图片">
            <el-upload v-model:file-list="fileList"
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

            <el-table style="width: 100%;margin:20px 0;" border>
                <el-table-column
                    type="index"
                    label="序号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="prop"
                    label="属性名"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="prop"
                    label="属性值名称列表">
                </el-table-column>
                <el-table-column
                    prop="prop"
                    label="操作"
                    width="150">
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

import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadUserFile } from 'element-plus'
import { ShowStatus } from '../types';

interface Emits{
    (event:"changeShowStatus",value:ShowStatus):void
}

const emits = defineEmits<Emits>();

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'plant-1.png',
    url: '/images/plant-1.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'plant-2.png',
    url: '/images/plant-2.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'figure-1.png',
    url: '/images/figure-1.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'figure-2.png',
    url: '/images/figure-2.png',
  },
])

const a = ref('')
const b = ref('')
const c = ref('')
const d = ref('')

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
</script>

<style scoped>
</style>