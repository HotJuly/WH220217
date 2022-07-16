<template>
  <div class="box">
    <h4>孙组件标题</h4>
    <p>content11: {{ content11 }}</p>
    <p>content22.name: {{ content22.name }}</p>
    <button @click="updateContent22('wh666')">更新祖辈的数据</button>
  </div>
</template>

<script>
export default {
  name: "GrandChild",
  inject: ["content11", "content22", "updateContent22"],
};
</script>
