<template>
  <h1>App</h1>
  <!-- <keep-alive>
    <router-view></router-view>
  </keep-alive> -->

  <!-- <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view> -->

  <router-link to="/home">toHome</router-link>
  <router-link to="/about">toAbout</router-link>
  <!-- <button @click="toAbout">toAbout</button> -->
</template>

<script>

export default {
  name: 'App',
}
</script>

<script setup>
// import {useRouter} from 'vue-router';
/*
  VueRouter控制用户跳转的方式
    1.编程式导航
      定义:通过JS的API的形式控制用户的跳转,这类操作称为编程式导航
      代表性方法:push,replace,go,back

    2.声明式导航
      代表性组件:router-link
      定义:通过标签形式引导用户进行跳转,这类操作称为声明式导航
*/

const toAbout = () => {
  // $router提供操作历史记录栈的方法
  // this.$router.push()

  // const router = useRouter();
  // console.log(useRouter);
  // router.push("/about")
}


</script>

<style>
</style>
