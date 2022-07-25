<template>
  <el-form label-width="120px">
    <el-form-item label="SPU名称">
      <el-input v-model="spuForm.spuName" placeholder="请输入SPU名称" />
    </el-form-item>

    <el-form-item label="品牌">
      <el-select v-model="spuForm.tmId" placeholder="请选择品牌">
        <el-option v-for="tm in tmList" :label="tm.tmName" :value="tm.id!" :key="tm.id!">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="SPU描述">
      <el-input v-model="spuForm.description" rows="4" type="textarea" placeholder="请输入详细描述" />
    </el-form-item>

    <el-form-item label="SPU图片">
      <el-upload v-model:file-list="(spuImageList as any)"
        :action="`${BASE_URL}/admin/product/fileUpload`" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" style="width:600px;" alt="Preview Image" />
      </el-dialog>
    </el-form-item>

    <el-form-item label="销售属性">
      <el-select v-model="selectedSaleAttr" placeholder="">
        <el-option 
        v-for="attr in unusedSaleAttrList"
        :label="attr.name" :value="`${attr.name}:${attr.id}`" :key="attr.id">
        </el-option>
      </el-select>
      <el-button type="primary" :icon="Plus" @click="addSaleAttr">添加销售属性</el-button>

      <el-table :data="spuForm.spuSaleAttrList" style="width: 100%;margin:20px 0;" border>
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="saleAttrName" label="属性名" width="150">
        </el-table-column>
        <el-table-column label="属性值名称列表">
          <template #default="{ row }">
            <el-tag 
            v-for="saleAttr in row.spuSaleAttrValueList" 
            :key="saleAttr.id" 
             type="success"
            style="margin-right:10px" 
            closable 
            :disable-transitions="false"
              @close="">
              {{ saleAttr.saleAttrValueName }}
            </el-tag>
            <el-input v-if="row.isEdit" ref="InputRef" v-model="row.inputValue" size="small"
              @keyup.enter="" @blur="" />
            <el-button v-else class="button-new-tag ml-1" size="small" @click="">
              + New Tag
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="150">
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

import { ref, reactive, onMounted, computed } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash'

import { getTrademarkListApi, getBaseSaleAttrListApi, getSpuImageListApi, getSpuSaleAttrListApi } from '@/api/product/spu';

import type { UploadProps, UploadUserFile } from 'element-plus'
import { ShowStatus } from '../types';
import type { SpuModel, BaseSaleAttrListModel, SpuImageListModel } from '@/api/product/model/spuModel';
import type { TrademarkListModel } from '@/api/product/model/TrademarkModel';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Emits {
  (event: "changeShowStatus", value: ShowStatus): void
}
const emits = defineEmits<Emits>();

interface Props {
  currentSpu: SpuModel
}

const props = defineProps<Props>();

// 该对象用于收集所有的表单数据,后续用于发送请求
const spuForm = reactive(cloneDeep(props.currentSpu))

const selectedSaleAttr = ref('')

// 用于存储当前平台所有品牌
const tmList = ref<TrademarkListModel>()

// 用于存储当前平台所有销售属性
const baseSaleAttrList = ref<BaseSaleAttrListModel>()

// 用于存储当前spu的所有图片信息(暂时不放在spuForm身上,等确定修改再放入)
// 注意:由于upload组件上传和删除图片时候,都会自动修改该数组的内容,其中的数据结构不适合发送请求,后续需要做数据处理
const spuImageList = ref<SpuImageListModel>()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  // 当用户删除了图片墙中的东西时,会执行该回调函数
  // console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log('uploadFile',uploadFile)
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const cancel = () => {
  emits('changeShowStatus', ShowStatus.SpuList);
}

const getTrademarkList = async () => {
  tmList.value = await getTrademarkListApi();
}

const getBaseSaleAttrList = async () => {
  baseSaleAttrList.value = await getBaseSaleAttrListApi();
}

const getSpuImageList = async () => {
  // baseSaleAttrList.value = await getSpuImageListApi(spuForm.id as number);
  spuImageList.value = await getSpuImageListApi(spuForm.id!);

  // 由于upload组件,想要展示图片墙,要求每个对象必须具有name和url属性,所以在此动态添加
  spuImageList.value?.forEach((imageObj) => {
    imageObj.url = imageObj.imgUrl;
    imageObj.name = imageObj.imgName;
  })
}

const getSpuSaleAttrList = async () => {
  spuForm.spuSaleAttrList = await getSpuSaleAttrListApi(spuForm.id!);
}

// 用于监视用户点击添加销售属性按钮,实现添加功能
const addSaleAttr = ()=>{
  // 往哪个数组中添加?spuForm.spuSaleAttrList
  // 需要添加的内容格式?对象

  // console.log(selectedSaleAttr.value)
  // 将用户选中的销售属性框的结果,使用split切割,可以得到销售属性名以及销售属性id两个值
  const [saleAttrName,baseSaleAttrId] = selectedSaleAttr.value.split(":");

  // 生成一个属性对象添加到数组中,使得table表格中多出一行
  spuForm.spuSaleAttrList.push({
    // 当前属性的id
    baseSaleAttrId: +baseSaleAttrId,
    // 当前的属性名称
    saleAttrName, 
    // 当前的属性值列表
    spuSaleAttrValueList:[]
  })

  // 添加完属性之后,记得清空该数据,防止select框中还残留错误显示
  selectedSaleAttr.value="";
}

// 根据spu已使用的所有销售属性数组和当前平台所有的销售属性做对比,最终返回一个未使用的销售属性列表
// 返回值数据类型:数组
// 内容:未使用的销售属性对象
const unusedSaleAttrList = computed(()=>{

    /*
      类似于数组去重
      思路:
        1.双层for循环,缺点性能,而且逻辑一般
        2.映射标识+for循环
        3.对象+for循环
    */
  // 1.双层for循环,缺点性能,而且逻辑一般
    // const newArr = baseSaleAttrList.value?.filter((baseSaleAttr)=>{
    //   // 如果返回值为true,就保留当前对象
    //   // 问题:什么条件的对象是需要保留的?
    //   // 解答:也就是说如果未使用过就保留,
    //   // 未使用的定义:当前的销售属性没有在已使用过的数组中出现,就是未使用

    //   // 需要查找的属性名
    //   const saleAttrName = baseSaleAttr.name;

    //   // some的用处是只要有一个满足条件就返回true
    //   const result = spuForm.spuSaleAttrList.some((spuSaleAttr)=>{
    //     return spuSaleAttr.saleAttrName === saleAttrName;
    //   });

    //   return !result;
    // })


    // 第二种:映射标识+for循环,缺点性能也差,但是代码嵌套不深,容易理解
    // const names = spuForm.spuSaleAttrList.map((spuSaleAttr)=>{
    //   return spuSaleAttr.saleAttrName;
    // })

    // const newArr = baseSaleAttrList.value?.filter((baseSaleAttr)=>{
    //   return !names.includes(baseSaleAttr.name);
    // })

    // 第三种:对象+for循环
    // 通过一个对象记录已经出现过的销售属性
    const mapObj:any = {};

    spuForm.spuSaleAttrList?.forEach((spuSaleAttr)=>{
      const key = spuSaleAttr.saleAttrName;
      mapObj[key] = true;
    })

    const newArr = baseSaleAttrList.value?.filter((baseSaleAttr)=>{
      const name = baseSaleAttr.name;
      return !mapObj[name];
    })


    return newArr;
})

onMounted(() => {
  // 以下两个请求,无论是添加还是修改都要发送
  getTrademarkList();
  getBaseSaleAttrList();

  if (spuForm.id) {
    // 说明当前是修改SPU
    getSpuImageList();
    getSpuSaleAttrList();
  }
})

// setTimeout(()=>{
//   console.log(baseSaleAttrList.value,spuForm.spuSaleAttrList)
// },3000)
</script>

<style scoped>
</style>