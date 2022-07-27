<template>
    <div id="sku_list">
        喜欢我的请亮灯:
        <h2 a>刘亦菲</h2>
        <child />
    </div>
</template>

<script lang="ts">
export default {
    name: "Sku"
}
</script>

<script setup lang="ts">
import child from './components/child.vue';
</script>

<style lang="scss" scoped>
#sku_list{
    :deep(h2){
        color:red;
    }
}
</style>