<template>
    <div>
        <CategorySelector :disabled="!isShowAdd" />

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
            <el-button type="primary" :icon="Plus" :disabled="!categoryStore.category3Id" @click="isShowAdd = false">
                添加属性</el-button>
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
                    <template #default="{ row }">
                        <el-button type="primary" size="small" :icon="Edit" @click="updateAttr(row)"></el-button>
                        <el-popconfirm :title="`确定删除${row.attrName}吗?`" @confirm="deleteAttr(row.id)">
                            <template #reference>
                                <el-button size="small" type="danger" :icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
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
                    <el-button type="primary" :icon="Plus" :disabled="!attrForm.attrName" @click="addAttrValue">添加属性值
                    </el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
                <el-form-item>
                    <el-table :data="attrForm.attrValueList" style="width: 100%">
                        <el-table-column type="index" label="序号" width="80" />
                        <el-table-column prop="valueName" label="属性值名称">
                            <template #default="{ row, $index }">
                                <el-input ref="inputRef" v-if="row.isEdit" @blur="toLook(row, $index)"
                                    v-model="row.valueName" placeholder="请输入属性值名称"></el-input>
                                <span v-else @click="toEdit(row)">{{ row.valueName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template #default="{ row, $index }">
                                <el-button type="danger" :icon="Delete" @click="deleteAttrValue($index)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-button type="primary" @click="save" :disabled="isSaveDisabled">保存</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts">
export default {
    name: "Attr"
}
</script>

<script setup lang="ts">
import { ref, reactive, watch, computed, nextTick } from 'vue';
import CategorySelector from '@/components/CategorySelector/index.vue';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';

import { useCategoryStore } from '@/stores/category';
import { getAttrInfoListApi, saveAttrInfoApi, deleteAttrInfoApi } from '@/api/product/attr';
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
const initData = () => ({
    // 当前属性名称,新增修改都必传
    attrName: "",

    // 当前属性值的列表,新增修改都必须有,不能为空
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

    // 当前三级分类的id,无论新增还是修改都必传
    categoryId: undefined,

    // 当前分类的等级,直接写死为3
    categoryLevel: 3,

    // 当前属性的唯一标识,但是新增没有,修改肯定有
    id: undefined
})
const attrForm = reactive<AttrModel>(initData());

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
const addAttrValue = () => {
    // 扩展:Vue更新数据是同步更新,更新视图是异步更新
    // 宏任务->setTimeout,ajax,事件
    // 微任务->.then
    // Vue更新视图是微任务,nextTick方法也是微任务
    // 什么是队列?
    // 实现的数据类型是数组
    /*
        数据模型:
            栈结构
                栈结构是先进后出,后进先出
            队列结构
                队列结构是先进先出,后进后出
        
        宏任务队列和微任务队列
            主线程代码->清空微任务队列->执行宏任务
    */

    //    setTimeout是开启宏任务的方法,内部的回调函数才是宏任务
    //     setTimeout(() => {
    //         console.log(1);
    //     }, 100)

    // //    then是开启微任务的方法,内部的回调函数才是微任务
    //     Promise.resolve().then(() => {
    //         console.log(2)
    //     })

    //     setTimeout(() => {
    //         console.log(3);
    //     }, 0)

    //     console.log(4)

    attrForm.attrValueList.push({
        // 其实如果是指做新增功能,不需要添加该属性,但是修改操作和添加很相似,所以这里做一个兼容性处理
        attrId: attrForm.id,
        valueName: "",
        isEdit: true
    })

    nextTick(() => {
        // 在这里才能拿到最新的真实DOM
        inputRef.value?.focus();
    })
}

// 监视用户点击删除属性值按钮
const deleteAttrValue = (index: number) => {
    attrForm.attrValueList.splice(index, 1);
}

// 
const save = async () => {
    isShowAdd.value = true;
    // Object.assign(attrForm,initData());

    /*
        发请求的流程:
            1.收集数据
            2.处理数据结构(带上表单校验)
            3.发送请求
            4.成功之后做什么
            5.失败之后做什么
    */

    //    1.收集数据(已经收集到当前模块的attrForm对象中了)
    // 补齐当前属性所属的分类id,必传
    attrForm.categoryId = categoryStore.category3Id;

    //    2.处理数据结构(带上表单校验)
    /*
        1.数据来源:attrForm.attrValueList,数据类型是数组
        2.需求:将内部每个对象的isEdit属性删除
        3.返回值:map(需要新数组),forEach(不需要新数组)
    */

    attrForm.attrValueList.forEach((attrValue) => {
        delete attrValue.isEdit;
    })

    //  3.发送请求
    // attr模块比较特殊,新增和修改只有一个接口,也就是说后端那边会考虑是新增还是修改
    try {
        // 4.成功做什么
        await saveAttrInfoApi(attrForm);
        ElMessage.success('保存属性成功');
        getAttrList();
    } catch (e) {
        // 5.失败做什么
        ElMessage.error('保存属性失败' + e);
    }
}

const cancel = () => {
    isShowAdd.value = true;
    // Object.assign(attrForm,initData());
}

// 监视用户点击修改属性按钮
const updateAttr = (row: AttrModel) => {
    isShowAdd.value = false;

    // 由于row对象中的attrValueList数据类型是数组,如果不实现深拷贝,就会影响到列表数据的展示
    Object.assign(attrForm, cloneDeep(row));
}

// 监视用户点击确定删除属性按钮
const deleteAttr = async (id:number) => {
    await deleteAttrInfoApi(id);
    ElMessage.success("删除属性成功");
    getAttrList();
}

// 监视用户span被点击事件,切换到input框实现编辑模式,收集用户输入数据
const toEdit = (row: AttrValueModel) => {
    // 将isEdit属性变为true,可以导致页面显示出对应的input框
    // this.$set和Vue.set
    row.isEdit = true;

    // 找到页面上最新的input框,让其获得焦点,防止用户不会触发失去焦点事件
    // BUG:由于isEdit属性更新是同步操作,但是视图更新是异步更新,会导致先执行获取焦点的代码,才会显示出input框,所以会获取焦点失败
    // 解决:将获取焦点的代码,放到input框更新出来之后,再执行,就能解决
    nextTick(() => {
        inputRef.value?.focus();
    })
    // debugger
}

// 监视用户输入框失去焦点事件,切回span标签进行展示效果
const toLook = (row: AttrValueModel, index: number) => {
    // 如果没有数据,或者都是空格,就删除该条记录
    if (!row.valueName.trim()) {
        attrForm.attrValueList.splice(index, 1);
        ElMessage.info("属性值不能为空!")
        return;
    }

    // 如果有数据,但是数据已经重复,也删除该条记录
    // 用于当前输入的数据在row.valueName中存储,所有的属性值都在attrForm.attrValueList数组中
    // attrForm.attrValueList是数组,内部存储是对象
    // row.valueName是字符串
    // 其实最终要的效果,是取出内部对象的valueName和row.valueName进行对比,判断是否出现过
    // filter,find,every,some都可以,但是我们需要的返回值是布尔值类型,所以排除filter,find
    // 又因为只找一个就够,所以some即可
    const result = attrForm.attrValueList.some((item, i) => {
        // 1.先判断是不是同一个人,如果是同一个人就不执行后续代码
        // 2.如果不是同一个人才判断名字
        return i !== index && item.valueName === row.valueName;
    })

    // 如果result值为true代表该属性已存在,需要删除
    if (result) {
        attrForm.attrValueList.splice(index, 1);
        ElMessage.info("属性值不能重复!")
        return;
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


// 通过watch监视页面的切换展示效果,达到我们预期的效果,就清空表单数据
watch(isShowAdd, (newValue) => {
    // newValue如果为true,代表即将显示列表页,需要清空数据
    // newValue如果为false,标签即将显示添加页面,不需要清空
    if (newValue) {
        Object.assign(attrForm, initData());
    }
})


// 根据添加属性模块的属性名和属性值列表,来判断,保存按钮是否可以使用
// 返回值类型:布尔值
//  true->禁用,false->允许使用
const isSaveDisabled = computed(() => {
    // 获取到需要判断的数据
    const { attrName, attrValueList } = attrForm;

    const hasName = !!attrName;
    // const hasName = Boolean(attrName);

    // length属性的取值范围0-无限大,其中只有0是false值
    // 出现了问题:用户点击添加属性值之后,会立即插入一条记录到该数组中,所以长度不会为0
    // const hasValue = attrValueList.length;

    // every如果遇到数组长度为0,返回值为true
    const hasValue = attrValueList.length && attrValueList.every((item) => {
        return item.valueName
    })

    // some如果遇到数组长度为0,返回值为false
    // some只要数组有一个满足条件就行
    // const hasValue = attrValueList.some((item)=>{
    //     return !item.valueName
    // })

    return !(hasName && hasValue)
})

</script>

<style scoped>
</style>