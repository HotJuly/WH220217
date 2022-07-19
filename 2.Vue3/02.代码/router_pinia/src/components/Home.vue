<template>
    <div>
        Home
        <h1>当前一共点击{{count}}次,是{{evenOrOdd}}</h1>
        <!-- <h1>当前一共点击{{store.count}}次,是{{store.evenOrOdd}}</h1> -->
        <input type="text" />
    </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter.js';

// const store = useCounterStore();
const { count, evenOrOdd } = useCounterStore();

// console.log(store)

</script>

<style scoped>

</style>