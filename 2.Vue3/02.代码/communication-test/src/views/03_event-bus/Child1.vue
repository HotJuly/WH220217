<template>
  <div class="box">
    <h2>Child111 component</h2>
    <p>msg: {{msg}}</p>
  </div>
</template>

<script>
export default {
  name: 'Child1',
  data () {
    return {
      msg: 'abc'
    }
  },
}
</script>
