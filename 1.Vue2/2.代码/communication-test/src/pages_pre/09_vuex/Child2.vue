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
  },
};
</script>

<style scoped></style>
