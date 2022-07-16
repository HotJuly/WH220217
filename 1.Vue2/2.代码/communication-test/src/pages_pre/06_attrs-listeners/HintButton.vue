<template>
    <!-- <el-tooltip class="item" effect="dark" :content="content" placement="top-start"> -->
        <!-- <el-button :type="type" :size="size" @click="handleClick">删除</el-button> -->
        <!-- <el-button v-bind="$attrs" @click="$emit('click')">删除</el-button> -->
        <!-- <el-button :size="$attrs.size" v-bind="{...$attrs}" v-on="{...$listeners}">删除</el-button>
        <!-- <el-button :size="$attrs.size" v-bind="$attrs" v-on="$listeners">删除</el-button>
    </el-tooltip> -->

    <!-- <button @click="fn" @click1="fn1" @click2="fn2" @click3="fn3">添加按钮</button> -->
    <!-- <button v-on="{
        click:fn,
        click1:fn1,
        click2:fn2,
        click3:fn3
    }">添加按钮</button> -->
    <button v-on="$listeners">添加按钮</button>
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
    },
    // methods:{
    //     a(value1,...args){

    //     }
    // },
    methods:{
        fn(){
            console.log(1)
        },
        fn1(){
            console.log(2)
        },
        fn2(){
            console.log(3)
        },
        fn3(){
            console.log(4)
        }
    }
}
</script>