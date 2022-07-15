<template>
  <div class="box">
    <h2 @click="$emit('click123',$event)">Event2组件</h2>
  </div>
</template>

<script>
export default {
  name: 'Event2',
  mounted() {
    // console.log(1)
    
    this.$emit('click666',8)
  },
}
</script>
