<template>
  <div class="com">
    <h1>
      各种Vue组件间通信/传值(10种)
      <span style="color: red;">非常重要, 面试必备</span>
    </h1>
    <div>
      <h2 style="display: inline">完成版演示: </h2>&nbsp;&nbsp;
      <router-link to="/props">props</router-link>&nbsp;&nbsp;
      <router-link to="/event">custom event</router-link>&nbsp;&nbsp;
      <router-link to="/bus">event bus</router-link>&nbsp;&nbsp;
      <router-link to="/model">v-model</router-link>&nbsp;&nbsp;
      <router-link to="/sync">.sync</router-link>&nbsp;&nbsp;
      <router-link to="/attrs-listeners">$attrs & $listeners</router-link>&nbsp;&nbsp;
      <router-link to="/ref-children-parent">$ref & $children & $parent</router-link>&nbsp;&nbsp;
      <router-link to="/provide-inject">provide-inject</router-link>&nbsp;&nbsp;
      <router-link to="/vuex">vuex</router-link>&nbsp;&nbsp;
      <router-link to="/slot">slot</router-link>&nbsp;&nbsp;
    </div>
    <br>

    <div class="box">
      <h2 style="display: inline">课堂版实践:</h2>&nbsp;&nbsp;
      <router-link to="/props_pre">props</router-link>&nbsp;&nbsp;
      <router-link to="/event_pre">custom event</router-link>&nbsp;&nbsp;
      <router-link to="/bus_pre">event bus</router-link>&nbsp;&nbsp;
      <router-link to="/model_pre">v-model</router-link>&nbsp;&nbsp;
      <router-link to="/sync_pre">.sync</router-link>&nbsp;&nbsp;
      <router-link to="/attrs-listeners_pre">$attrs & $listeners</router-link>&nbsp;&nbsp;
      <router-link to="/ref-children-parent_pre">$ref & $children & $parent</router-link>&nbsp;&nbsp;
      <router-link to="/provide-inject_pre">provide-inject</router-link>&nbsp;&nbsp;
      <router-link to="/vuex_pre">vuex</router-link>&nbsp;&nbsp;
      <router-link to="/slot_pre">slot</router-link>&nbsp;&nbsp;
    </div>

    <br>
    
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style lang="less" scoped>
  .com {
    margin: 10px;
    a {
      font-size: 16px;
      margin-right: 5px;
      &.router-link-active {
        color: red;
      }
    }
  }
</style>
<style>
  .box {
    border: solid 1px #aaa;
    margin: 5px;
    padding: 5px;
  }
</style>