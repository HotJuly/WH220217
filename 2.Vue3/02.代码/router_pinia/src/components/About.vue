<template>
    <div>
        <h2>当前点击次数:{{store.count}}</h2>
        <button @click="add">点击次数+1</button>
    </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';
// import {useStore} from 'vuex'
// const store = useStore();

const store = useCounterStore();

const add = ()=>{
    store.addCount(3)
}
</script>

<style scoped>

</style>