<template>
  <div class="box">
    <h2>Event2组件</h2>
    <button @click="$emit('click', 2)">分发自定义click事件</button><br>
    <button @click="$emit('xxx', 3)">分发自定义xxx事件</button><br>
  </div>
</template>
