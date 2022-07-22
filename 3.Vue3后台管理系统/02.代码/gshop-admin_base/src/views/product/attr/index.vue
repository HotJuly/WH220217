<template>
    <div>
        <CategorySelector />

        <!-- 
            问题:v-if与v-show的区别
                相同点:都可以控制标签在页面上的显示和消失
                不同点:
                    1.v-if是从js层面干掉一个标签(就是不解析该标签)
                    2.v-show是从css层面干掉一个标签(解析该标签,但是不显示,会给节点加上display:none的样式)

                    深入:
                        1.在页面初次渲染的时候,谁的性能更高
                            v-if优于v-show
                            流程:
                                判断值如果为true
                                    v-if->先解析内部的所有标签,然后直接挂载到页面上
                                    v-show->解析内部的所有标签,然后判断是否需要添加display:none,最后挂载到页面上

                        2.在页面组件频繁切换的时候,谁的性能更高
                            v-show优于v-if
                            流程:
                                如果判断值频繁切换
                                    v-if->每次都要重新解析内部的所有标签,在挂载到页面上
                                    v-show->只有首次才会解析内部所有的标签,后续仅仅是修改display样式的值即可
         -->

        <!-- 给组件标签添加的class和style都会被该组件的根节点继承 -->
        <el-card v-if="isShowAdd" style="margin-top:20px">
            <el-button type="primary" :icon="Plus" @click="isShowAdd = false">添加属性</el-button>
            <el-table v-loading="loading" :data="attrList" border style="width: 100%;margin-top:10px">
                <el-table-column type="index" label="序号" align="center" width="80" />
                <el-table-column prop="attrName" label="属性名称" width="150" />
                <el-table-column label="属性值列表">
                    <template #default="{ row }">
                        <el-tag type="success" style="margin-right:5px" v-for="attrValue in row.attrValueList"
                            :key="attrValue.id">{{ attrValue.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template #default="{row}">
                        <el-button type="primary" :icon="Edit" @click="updateAttr(row)"></el-button>
                        <el-button type="danger" :icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card v-else>
            <el-form>
                <el-form-item label="属性名" label-width="70px">
                    <el-input v-model="attrForm.attrName" style="width:200px" placeholder="请输入属性名"></el-input>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-button type="primary" :icon="Plus" @click="addAttrValue">添加属性值</el-button>
                    <el-button  @click="cancel">取消</el-button>
                </el-form-item>
                <el-form-item>
                    <el-table :data="attrForm.attrValueList" style="width: 100%">
                        <el-table-column type="index" label="序号" width="80" />
                        <el-table-column prop="valueName" label="属性值名称">
                            <template #default="{row,$index}">
                                <el-input ref="inputRef" v-if="row.isEdit" @blur="toLook(row,$index)" v-model="row.valueName" placeholder="请输入属性值名称"></el-input>
                                <span v-else @click="toEdit(row)">{{row.valueName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template #default="{row,$index}">
                                <el-button type="danger" :icon="Delete" @click="deleteAttrValue($index)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-button type="primary" @click="save">保存</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts">
export default {
    name:"Attr"
}
</script>

<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue';
import CategorySelector from '@/components/CategorySelector/index.vue';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';

import { useCategoryStore } from '@/stores/category';
import { getAttrInfoListApi } from '@/api/product/attr';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash';

import type { InputInstance } from 'element-plus';
import type { AttrListModel, AttrModel, AttrValueModel } from '@/api/product/model/attrModel';

const categoryStore = useCategoryStore();

// 用于存储当前页面的属性列表
const attrList = ref<AttrListModel>([]);

// 用于控制table表格loading效果
const loading = ref<boolean>(false);

// 用于控制属性列表和添加属性模块内容切换显示
const isShowAdd = ref<boolean>(true);

// 用于收集当前添加属性模块用户输入的数据,最终作为请求体发送给服务器
const attrForm = reactive<AttrModel>({
    // 当前属性名称
    attrName: "",
    // 当前属性值的列表
    attrValueList: [
        // {
        //   当前属性值属于哪个属性,就填写对应的属性id,新增肯定没有
        //     "attrId": 0,
        //   id一定是当前这个属性值的唯一标识,新增肯定没有,修改可能有
        //     "id": 0,
        //   该属性是当前属性值的内容,肯定有,需要是用户自己输入,要么是修改自带
        //     "valueName": "string"
        // }
    ],

    // 当前三级分类的id
    categoryId: undefined,

    // 当前分类的等级,直接写死为3
    categoryLevel: 3,

    // 当前属性的唯一标识,但是新增没有,修改肯定有
    id: undefined
});

// 用于找到页面上的input框,方便后续使其获取焦点
const inputRef = ref<InputInstance>();

// 调用该方法可以获取到当前最新的属性列表
const getAttrList = async () => {

    // 开启table表格的加载效果
    loading.value = true;

    attrList.value = await getAttrInfoListApi({
        category1Id: categoryStore.category1Id,
        category2Id: categoryStore.category2Id,
        category3Id: categoryStore.category3Id
    })

    ElMessage.success("属性列表请求成功");

    // 关闭table表格的加载效果
    loading.value = false;
}

// 监视用户点击添加属性值操作
const addAttrValue = ()=>{
    attrForm.attrValueList.push({
        // 其实如果是指做新增功能,不需要添加该属性,但是修改操作和添加很相似,所以这里做一个兼容性处理
        attrId:attrForm.id,
        valueName:""
    })
}

// 监视用户点击删除属性值按钮
const deleteAttrValue = (index:number)=>{
    attrForm.attrValueList.splice(index,1);
}

// 
const save = ()=>{
    isShowAdd.value = true;
}

const cancel = ()=>{
    isShowAdd.value = true;
}

// 监视用户点击修改属性按钮
const updateAttr = (row:AttrModel)=>{
    isShowAdd.value = false;

    // 由于row对象中的attrValueList数据类型是数组,如果不实现深拷贝,就会影响到列表数据的展示
    Object.assign(attrForm,cloneDeep(row));
}

// 监视用户span被点击事件,切换到input框实现编辑模式,收集用户输入数据
const toEdit = (row:AttrValueModel)=>{
    // 将isEdit属性变为true,可以导致页面显示出对应的input框
    // this.$set和Vue.set
    row.isEdit = true;

    // 找到页面上最新的input框,让其获得焦点,防止用户不会触发失去焦点事件
    // BUG:由于isEdit属性更新是同步操作,但是视图更新是异步更新,会导致先执行获取焦点的代码,才会显示出input框,所以会获取焦点失败
    // 解决:将获取焦点的代码,放到input框更新出来之后,再执行,就能解决
    nextTick(()=>{
        inputRef.value?.focus();
    })
    // debugger
}

// 监视用户输入框失去焦点事件,切回span标签进行展示效果
const toLook = (row:AttrValueModel,index:number)=>{
    if(!row.valueName.trim()){
        attrForm.attrValueList.splice(index,1);
        ElMessage.info("属性值不能为空!")
        // return;
    }
    
    row.isEdit = false;
}

// console.log('categoryStore',categoryStore.category3Id)

// 如果是ref对象或者reactive对象,可以直接写入变量名
// 如果是reactive身上的一个属性,需要写成函数格式才能被进行监听
watch(() => categoryStore.category3Id, (id: number | undefined) => {
    // watch的回调函数,第一个实参是最新值,第二个实参是更新之前的旧值
    // console.log(newValue,oldValue)
    if (!id) return;
    getAttrList();
}, {
    immediate: true
})

</script>

<style scoped>
</style>