<template>
  <el-form ref="formRef" :model="spuForm" :rules="rules" label-width="120px">
    <el-form-item label="SPU名称" prop="spuName">
      <el-input v-model="spuForm.spuName" placeholder="请输入SPU名称" />
    </el-form-item>

    <el-form-item label="品牌" prop="tmId">
      <el-select v-model="spuForm.tmId" placeholder="请选择品牌">
        <el-option v-for="tm in tmList" :label="tm.tmName" :value="tm.id!" :key="tm.id!">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="SPU描述" prop="description">
      <el-input v-model="spuForm.description" rows="4" type="textarea" placeholder="请输入详细描述" />
    </el-form-item>

    <el-form-item label="SPU图片" prop="spuImageList">
      <el-upload v-model:file-list="(spuImageList as any)" :action="`${BASE_URL}/admin/product/fileUpload`"
        list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" style="width:600px;" alt="Preview Image" />
      </el-dialog>
    </el-form-item>

    <el-form-item label="销售属性" prop="spuSaleAttrList">
      <el-select v-model="selectedSaleAttr" placeholder="">
        <el-option v-for="(attr,index) in unusedSaleAttrList" :label="attr.name" :value="`${attr.name}:${attr.id}`"
          :key="attr.id">
        </el-option>
      </el-select>
      <el-button type="primary" :icon="Plus" @click="addSaleAttr" :disabled="!selectedSaleAttr">添加销售属性</el-button>

      <el-table :data="spuForm.spuSaleAttrList" style="width: 100%;margin:20px 0;" border>
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="saleAttrName" label="属性名" width="150">
        </el-table-column>
        <el-table-column label="属性值名称列表">
          <template #default="{ row, $index }">
            <el-tag v-for="(saleAttr, index) in row.spuSaleAttrValueList" :key="saleAttr.id" type="success"
              style="margin-right:10px" closable :disable-transitions="false" @close="deleteSaleAttrValue(row, index)">
              {{ saleAttr.saleAttrValueName }}
            </el-tag>
            <el-input v-if="row.isEdit" style="width:100px" ref="InputRef" v-model="row.inputValue" size="small"
              @keyup.enter="toLook(row)" @blur="toLook(row)" />
            <el-button v-else class="button-new-tag ml-1" size="small" @click="toEdit(row)">+</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="150">
          <template #default="{ $index }">
            <el-button type="danger" :icon="Delete" @click="deleteSaleAttr($index)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button type="primary" @click="save">保存</el-button>
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

import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash'

import { getTrademarkListApi, getBaseSaleAttrListApi, getSpuImageListApi, getSpuSaleAttrListApi, SaveSpuInfoApi,UpdateSpuInfoApi } from '@/api/product/spu';
import { useCategoryStore } from '@/stores/category';


import { type UploadProps, type UploadUserFile, type InputInstance,type FormInstance, type FormRules, ElMessage } from 'element-plus'
import { ShowStatus } from '../types';
import type { SpuModel, BaseSaleAttrListModel, SpuImageListModel, SpuSaleAttrModel } from '@/api/product/model/spuModel';
import type { TrademarkListModel } from '@/api/product/model/TrademarkModel';

const BASE_URL = import.meta.env.VITE_API_URL;

const categoryStore = useCategoryStore();

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
const spuImageList = ref<SpuImageListModel>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const InputRef = ref<InputInstance>();

const formRef = ref<FormInstance>();

// 用于约束每个属性的数据情况(表单校验)
const rules:FormRules = {
  spuName:[{required:true,message:"SPU名称必传",trigger:"blur"}],
  description:[{required:true,message:"SPU描述必传",trigger:"blur"}],
  tmId:[{required:true,message:"品牌信息必选"}],
  spuSaleAttrList:[{required:true,message:"销售属性列表必须有值"}],
  spuImageList:[{required:true,message:"SPU必须具有图片信息"}]
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  // 当用户删除了图片墙中的东西时,会执行该回调函数
  // console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log('uploadFile', uploadFile)
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
const addSaleAttr = () => {
  // 往哪个数组中添加?spuForm.spuSaleAttrList
  // 需要添加的内容格式?对象

  // console.log(selectedSaleAttr.value)
  // 将用户选中的销售属性框的结果,使用split切割,可以得到销售属性名以及销售属性id两个值
  const [saleAttrName, baseSaleAttrId] = selectedSaleAttr.value.split(":");

  // 生成一个属性对象添加到数组中,使得table表格中多出一行
  spuForm.spuSaleAttrList.push({
    // 当前属性的id
    baseSaleAttrId: +baseSaleAttrId,
    // 当前的属性名称
    saleAttrName,
    // 当前的属性值列表
    spuSaleAttrValueList: []
  })

  // 添加完属性之后,记得清空该数据,防止select框中还残留错误显示
  selectedSaleAttr.value = "";
}

// 用于监视用户点击删除销售属性按钮
const deleteSaleAttr = (index: number) => {
  spuForm.spuSaleAttrList.splice(index, 1);
}

// 用于监视用户点击删除销售属性标签上的删除按钮
const deleteSaleAttrValue = (row: SpuSaleAttrModel, index: number) => {
  // 一定要注意数据的来源,下标需要的是第几个tag,而不是第几行
  // console.log(row.spuSaleAttrValueList,index)
  row.spuSaleAttrValueList.splice(index, 1);
}

// 用于监视用户点击添加销售属性值按钮
const toEdit = (row: SpuSaleAttrModel) => {
  row.isEdit = true;

  nextTick(() => {
    InputRef.value?.focus();
  })
}

// 用于监视用户输入属性值之后,input框失去焦点事件
const toLook = (row: SpuSaleAttrModel) => {
  // 由于键盘抬起事件和失去焦点公用一个回调函数,很可能出现连续执行两次的情况
  // 所以此处做出判断,防止回调函数多次执行
  if(!row.isEdit){
    return;
  }

  // 判断属性值不能为空
  if(!row.inputValue){
    ElMessage.info("属性值不能为空");
    row.isEdit = false;
    return;
  }

  // 用于产生tag标签的数组
  // 这里与属性模块唯一的区别,就是当前不需要排除自己来比较,因为用户输入的属性值内容还没有推入数组中
  const result = row.spuSaleAttrValueList.some((attrValue)=>{
    return attrValue.saleAttrValueName === row.inputValue
  })

  if(result){
    ElMessage.info("属性值不能重复");
    InputRef.value?.focus();
    return;
  }

  row.spuSaleAttrValueList.push({
    baseSaleAttrId: row.baseSaleAttrId,
    saleAttrValueName: row.inputValue!
  });

  row.isEdit = false;
  row.inputValue = "";
}

// 用于监视用户点击保存按钮,发送请求,实现真正的数据更新
const save= async ()=>{
  /*
    1.收集数据
    2.处理数据结构
    3.发送请求
    4.成功做什么
    5.失败做什么
*/
  // formRef.value?.validate()返回值是一个promise对象,如果校验合格就是成功状态
  // console.log(formRef.value?.validate())

// spuImageList格式有问题,其中存在两种图片对象,一种是服务器返回的对象,一种是我们上传得到的对象
/*
  服务器返回的
    {
      id: 27
      imgName: "0e99152a7e59c478.jpg"
      imgUrl: "http://47.93.148.192:8080/group1/M00/02/DA/rBHu8mGxO7mAJ8keAACU-49r2kw775.jpg"
      name: "0e99152a7e59c478.jpg"
      spuId: 5
      status: "success"
      uid: 1658807599693
      url: ""
    }

  我们本地上传的
    {
      name: "1.jpg"
      percentage: 100
      raw: File {uid: 1658807602235, name: '1.jpg', lastModified: 1658076466902, lastModifiedDate: Mon Jul 18 2022 00:47:46 GMT+0800 (中国标准时间), webkitRelativePath: '', …}
      response: {code: 200, message: '成功', data: 'http://139.198.127.41:9000/sph/20220726/1.jpg', ok: true}
      size: 476282
      status: "success"
      uid: 1658807602235
      url:""(注意,这种格式的图片对象的url是本地链接,无法使用)
    }

    最终,我们需要处理成什么样?
    {
      imgName: "0e99152a7e59c478.jpg"
      imgUrl: "http://47.93.148.192:8080/group1/M00/02/DA/rBHu8mGxO7mAJ8keAACU-49r2kw775.jpg"
    }
*/
  // console.log(spuImageList)
  // 2.处理数据
  // 2.1 处理图片数组
  // 保证每个对象身上都一定具有imgName和imgUrl属性
  if(spuImageList.value){
    spuForm.spuImageList = spuImageList.value.map((imageObj)=>{
      return {
        imgName:imageObj.imgName?imageObj.imgName:imageObj.name!,
        imgUrl:imageObj.response?imageObj.response.data:imageObj.imgUrl
      }
    })
  }

  // 2.2  需要删除之前为了实现编辑模式切换而添加的无用属性isEdit和inputValue
  spuForm.spuSaleAttrList.forEach((saleAttr)=>{
    delete saleAttr.isEdit;
    delete saleAttr.inputValue;
  })

  //2.3 需要将没有属性值的属性进行删除
  // filter方法会返回全新的数据,不会影响到原数组,所以需要重新赋值
  spuForm.spuSaleAttrList = spuForm.spuSaleAttrList.filter((saleAttr)=>{
    return saleAttr.saleAttrName&&saleAttr.spuSaleAttrValueList.length;
  })

  //2.4 将当前三级分类ID进行赋值
  // 这一步是为了新增SPU准备的,修改SPU他自带三级分类ID
  spuForm.category3Id = categoryStore.category3Id;

  // console.log(spuForm)

  // 进行统一表单校验
  await formRef.value?.validate();

  // 3.发送请求
  if(spuForm.id){
    await UpdateSpuInfoApi(spuForm);
  }else{
    await SaveSpuInfoApi(spuForm);
  }

  // 4.成功做什么
  ElMessage.success("保存成功");
  emits("changeShowStatus",ShowStatus.SpuList);
}

// 根据spu已使用的所有销售属性数组和当前平台所有的销售属性做对比,最终返回一个未使用的销售属性列表
// 返回值数据类型:数组
// 内容:未使用的销售属性对象
const unusedSaleAttrList = computed(() => {

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
  const mapObj: any = {};

  spuForm.spuSaleAttrList?.forEach((spuSaleAttr) => {
    const key = spuSaleAttr.saleAttrName;
    mapObj[key] = true;
  })

  const newArr = baseSaleAttrList.value?.filter((baseSaleAttr) => {
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