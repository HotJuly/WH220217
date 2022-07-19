<template>
    <div>
        <h2>当前点击次数:{{store.state.count}}</h2>
        <button @click="add">点击次数+1</button>
    </div>
</template>

<script setup>
import {useStore} from 'vuex'
const store = useStore();

const add = ()=>{
    store.commit('addCount');
}
</script>

<style scoped>

</style>