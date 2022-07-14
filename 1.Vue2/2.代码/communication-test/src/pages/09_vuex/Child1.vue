<template>
  <div class="box">
    <h2>Child111 component</h2>
    <p>count: {{count}}, count is {{evenOrOdd}}</p>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
export default {
  name: 'Child1',
  computed: {
    ...mapState(['count']),
    ...mapGetters(['evenOrOdd'])
  }
}
</script>

<style scoped>

</style>
