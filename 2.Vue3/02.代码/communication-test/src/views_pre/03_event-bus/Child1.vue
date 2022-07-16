<template>
  <div class="box">
    <h2>Child111 component</h2>
    <p>msg: {{msg}}</p>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue';

  const msg = ref('abc')

  onMounted(() => {
    PubSub.subscribe('updateBrother', (msgName, data) => {
      console.log('++++++++')
      msg.value += data
    })
  })

  onBeforeUnmount(() => {
    PubSub.unsubscribe('updateBrother')
  })
</script>
