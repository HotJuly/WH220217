<template>
  <div class="box">
    <h2>Child111 component</h2>
    <p>点击了{{ count }}次, 当前count为{{ count % 2 === 0 ? `偶数` : "奇数" }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Child1",
  computed: {
    ...mapState(["count"]),
    count222() {
      // 根据现有数据计算出一个全新的数据
      return this.$store.state.count;
    },
  },
};
</script>

<style scoped></style>
