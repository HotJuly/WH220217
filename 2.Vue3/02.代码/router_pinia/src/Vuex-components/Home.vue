<template>
    <div>
        Home
        <h1>当前一共点击{{store.state.count}}次,是{{store.getters.evenOrOdd}}</h1>
        <input type="text" />
    </div>
</template>

<script setup>
import {useStore} from 'vuex'
const store = useStore();
// console.log(store)

</script>

<style scoped>

</style>