<template>
  <div class="box">
    <h2>Child222 component</h2>
    <button @click="addSync(2)">增加2</button>
    <button @click="addAsync(3)">异步增加3</button>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "Child2",

  methods: {
    ...mapMutations(["addSync"]),
    ...mapActions(["addAsync"]),

    // 以上写法等同于以下写法
    // addSync(value) {
    //   this.$store.commit("addSync", value);
    // },
    // addAsync(value) {
    //   this.$store.dispatch("addAsync", value);
    // },
  },
};
</script>

<style scoped></style>
