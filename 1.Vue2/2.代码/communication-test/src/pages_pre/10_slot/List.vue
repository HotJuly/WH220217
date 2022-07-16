<template>
  <div class="box">
    <!-- <div>我是列表的头部</div> -->
    <slot name="default" />
    <ul>
      <li v-for="(item, index) in data" :key="item.id">
        <!-- <span>{{ item.text }}</span> -->
        <slot name="content" :item="item" :index="index" />
      </li>
    </ul>
    <slot name="footer" />
    <!-- <div>我是列表的底部</div> -->
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    data: Array,
  },
};
</script>
