<template>
    <el-card class="box-card">
        <template #header>
            <el-button type="primary" :icon="Plus" @click="showDialog">添加</el-button>
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
            layout="prev, pager, next, jumper,->, sizes,total" :total="total" @current-change="handleCurrentChange"
            @size-change="handleSizeChange" />

        <!-- 用于显示添加品牌模块 -->
        <!-- 
            el-form组件是用来显示form表单的,其中el-form-item组件是用来显示一行的内容的
            注意点:
                el-form组件上必须具有model属性,属性值是用来收集存储数据的对象
         -->
        <el-dialog v-model="dialogFormVisible" title="添加品牌">
            <el-form :model="form">
                <el-form-item label="品牌名称" label-width="100px">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px">
                    <el-upload class="avatar-uploader"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

import type { TrademarkListModel } from '@/api/product/model/TrademarkModel'

import { getTrademarkPageListApi } from '@/api/product/trademark'
import type { UploadProps } from 'element-plus'

// 用于控制table组件显示的数据

// 此处为什么选择ref?
// reactive只能监视对内部属性的修改,不能监视到地址值的修改
// ref的value属性是一个响应式属性,如果对其重新赋值,那么也具有响应式效果
const tableData = ref<TrademarkListModel>([]);

// 用于存储当前处于第几页
const currentPage = ref<number>(1);

// 用于存储当前页面显示数据条数
const pageSize = ref<number>(3);

// 用于存储当前品牌总数量
const total = ref<number>();

// 用于控制dialog组件的显示隐藏
const dialogFormVisible = ref(false)

// 用于收集用户输入的表单数据
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})

const imageUrl = ref('')

// 用于发送请求获取当前品牌列表数据,并自动更新到对应的响应数据中
const getTrademarkPageList = async () => {
    const result = await getTrademarkPageListApi(currentPage.value, pageSize.value);
    // console.log(result);
    tableData.value = result.records;
    total.value = result.total;
    // console.log(result.num66666)
}

// 该方法会交给分页器组件,用于监视用户修改当前页数操作
const handleCurrentChange = (page: number) => {
    // console.log(page)
    // Vue更新数据是同步更新,页面是异步更新
    // 注意:只要更新了对应状态数据,下一行代码一定能得到最新的结果
    currentPage.value = page;
    // console.log(currentPage.value)
    getTrademarkPageList()
}

// 该方法会交给分页器组件,用于监视用户修改当前页面显示条数操作
const handleSizeChange = (size: number) => {
    // console.log(size)
    currentPage.value = 1;
    pageSize.value = size;
    getTrademarkPageList();
}

// 用于监视用于点击添加按钮,展示dialog组件,实现添加品牌功能
const showDialog = () => {
    dialogFormVisible.value = true;
}

// 用于监视用户上传图片是否成功,如果成功就会执行该回调函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

// 用于监视用户上传图片操作,在上传图片之前可以对其进行判断,决定是否上传
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

onMounted(() => {
    getTrademarkPageList();
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>