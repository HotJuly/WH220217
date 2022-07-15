<template>
    <el-tooltip class="item" effect="dark" :content="content" placement="top-start">
        <!-- <el-button :type="type" :size="size" @click="handleClick">删除</el-button> -->
        <!-- <el-button v-bind="$attrs" @click="$emit('click')">删除</el-button> -->
        <el-button v-bind="$attrs" v-on="$listeners">删除</el-button>
    </el-tooltip>
</template>

<script>
export default {
    name:"HintButton",
    // 只有被props声明接受的标签属性,才能直接this.的形式获取到结果
    props:["content"],
    mounted(){
        // 没有被props接收的标签属性,都会存放在$attrs中
        // console.log(this.$attrs)

        // $listeners会收集当前组件身上所有的自定义事件,事件名作为key,回调函数作为value
        // console.log(this.$listeners)
    }
}
</script>