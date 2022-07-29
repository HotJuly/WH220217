<template>
    <el-card class="box-card">
        <template #header>
            <el-button v-has-permission="`btn.Trademark.add`" type="primary" :icon="Plus" @click="showDialog">添加</el-button>
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
                <template #default="{ row }">
                    <el-button  v-has-permission="`btn.Trademark.update`" type="warning" :icon="Edit" size="small" @click="handleEdit(row)"></el-button>
                    <el-button  v-has-permission="`btn.Trademark.remove`" type="danger" :icon="Delete" size="small" @click="handleDelete(row)"></el-button>
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
        <el-dialog v-model="dialogFormVisible" :title="`${title}品牌`" @closed="cancel">
            <el-form ref="formRef" :model="form" :rules="rules">
                <el-form-item prop="tmName" label="品牌名称" label-width="100px">
                    <el-input v-model="form.tmName" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="logoUrl" label="品牌LOGO" label-width="100px">
                    <el-upload class="avatar-uploader" :action="`${BASE_URL}/admin/product/fileUpload`"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="save">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<script lang="ts">
export default {
    name: "Trademark"
}
</script>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { TrademarkListModel, TrademarkModel } from '@/api/product/model/TrademarkModel'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'


import { getTrademarkPageListApi, saveTrademarkApi, updateTrademarkApi, deleteTrademarkApi } from '@/api/product/trademark'

// 通过以下代码可以获取到当前运行环境中的部分环境变量,例如VITE_API_URL
const BASE_URL = import.meta.env.VITE_API_URL;

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
const initData = () => ({
    id:undefined,
    tmName: "",
    logoUrl: ""
});
const form = reactive<TrademarkModel>(initData());

// 通过ref对象配合标签属性ref,可以找到对应form组件的实例对象
const formRef = ref<FormInstance>();

const validateTmName = (rule: any, value: any, callback: any) => {
    // rule是当前进行自定义校验的相关数据
    // value是当前收集到的数据,也就是即将用于校验的内容
    // callback是一个函数,该函数如果直接调用,不传入参数,说明校验成功
    //  如果调用时候,将创建的这个报错对象传入callback,就代表校验失败
    // console.log(rule, value, callback)

    if (value.length < 2 || value.length > 6) {
        // 能进入到这里说明当前校验失败
        // callback(new Error('品牌名称长度必须在2-6个字符之间'))
        // return false;
        
        return callback(new Error('品牌名称长度必须在2-6个字符之间'));
    } else {
        // return true;
        // callback();

        return callback();
    }
}
// rules中对象的属性名必须跟form中的对应
// 属性值为数组,数组中存储多个对象,每个对象就是一条校验规则
// trigger数值:blur代表失去焦点触发,change代表内容发生修改时触发

/*
    表单校验一共分为三种
        1.普通校验(使用预设好的规则进行校验)
        2.自定义校验(可以通过validator属性,传入函数来实现自定义规则的效果)
        3.统一校验

    统一校验的API是validate
    清空校验结果的API是clearValidate,该函数如果不传实参,就是清空所有的校验结果

*/
const rules = reactive<FormRules>({
    tmName: [
        { required: true, message: '请输入品牌名称', trigger: 'blur' },
        // { min: 2, max: 6, message: '品牌名称长度必须在2-6个字符之间', trigger: 'change' },
        { validator: validateTmName, trigger: 'change' }
    ],
    logoUrl: [
        { required: true, message: '请输入品牌名称' }
    ]
})

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
    response
) => {
    // console.log(response,uploadFile)
    form.logoUrl = response.data;
}

// 用于监视用户上传图片操作,在上传图片之前可以对其进行判断,决定是否上传
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // 控制上传的文件类型,允许jpg,jpeg,png三种格式可以上传,其他都不可以

    const types = ['image/jpeg', 'image/jpg', 'image/png']
    // includes方法可以检查你所传入的实参,是否存在于前面的数组中,存在就返回true,否则false
    if (!types.includes(rawFile.type)) {
        ElMessage.error('图片格式必须是jpg/jpeg/png其中一种!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小最多为2MB!')
        return false
    }
    return true
}


// 用于监视用户点击保存按钮,发送请求给服务器,添加品牌
const save = () => {

    // 通过validate方法可以强制当前表单所有校验规则都执行一次
    formRef.value?.validate(async (flag: boolean) => {
        if (flag) {
            if (form.id) {
                await updateTrademarkApi(form);
            } else {
                // 没有返回值,如果当前API请求成功,promise的状态就会变成成功,否则就是失败
                await saveTrademarkApi(form);
            }

            // 用来隐藏dialog组件
            dialogFormVisible.value = false;


            // console.log('title',title)
            // 弹出提示窗口提示用户
            // 计算属性的返回值是一个ref对象，想要在js代码中获取他的值，必须加上.value
            ElMessage({
                message: `${title.value}品牌成功`,
                type: 'success',
            })

            // 清空当前dialog展示的数据
            // form = initData()
            const data = initData();
            // form.tmName = data.tmName;

            // Object.assign(target,source)
            // 当前API可以将后续来源对象的所有属性名和属性值都给目标对象target复制一份,
            // 如果出现同名就以后者为准,也就是覆盖
            Object.assign(form, data);

            nextTick(() => {
                formRef.value?.clearValidate();
            })

            // 在发送请求之前,先讲currentPage修改为1,回到第一页,防止出现逻辑BUG
            currentPage.value = 1;

            // 发送请求,刷新当前的列表
            getTrademarkPageList();
        }
    })

}

// 用户点击dialog取消按钮逻辑
const cancel = () => {
    // Vue中,对数据的更新有做判断,如果旧数据与新数据相同,那么本次更新失效(页面不会更新)
    dialogFormVisible.value = false;
    // form.id=undefined;
    Object.assign(form, initData());

    // 清空本轮的校验结果,防止遗留到下一次展示
    // Vue更新数据是同步更新,页面异步更新
    // nextTick的回调函数会在最近一个DOM更新结束之后执行
    nextTick(() => {
        formRef.value?.clearValidate();
    })
}

// 当用户点击某个编辑按钮的时候,实现品牌数据修改操作
const handleEdit = (row: TrademarkModel) => {
    // console.log('handleEdit',row)
    dialogFormVisible.value = true;

    // 将当前行的对象数据复制一份给form对象,用于dialog展示
    // Object.assign方法的效果其实是浅拷贝的
    /*
        问题:什么是浅拷贝?什么是深拷贝?
        回答:
            前言:基本数据类型,不存在深拷贝还是浅拷贝的问题
            高逼格:在拷贝一个对象中的内容时候,如果堆内存中有开辟全新的空间,那么就成为深拷贝,反之浅拷贝
            正常:如果一个对象中的属性值又是对象数据类型,此时
                如果创建的新对象中,对应的属性值是内部对象的地址值,这种称为浅拷贝
                如果创建的新对象中,对应的属性值是是根据内部对象的结构创建的全新对象,这种称为深拷贝
    */
    Object.assign(form, row)
}

const handleDelete = (row: TrademarkModel) => {
    ElMessageBox.confirm(
        `你确定要删除${row.tmName}吗?`,
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            // 用户如果点击了确定,就会进行该回调函数

            await deleteTrademarkApi(row.id as number);
            ElMessage({
                type: 'success',
                message: '已删除该品牌',
            });

            // 如果当前页面展示的数据条数大于1,就重新请求当前页面的数据,否则请求上一页
            currentPage.value = tableData.value.length > 1 ? currentPage.value : currentPage.value - 1;
            getTrademarkPageList();
        })
        .catch(() => {
            // 用户如果点击了取消,就会进行该回调函数
            ElMessage({
                type: 'info',
                message: '已取消删除',
            })
        })
}

const title = computed(() => {
    return form.id ? '修改' : '添加';
})

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