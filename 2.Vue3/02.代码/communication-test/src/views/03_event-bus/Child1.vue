<template>
  <div class="box">
    <h2>Child111 component</h2>
    <p>msg: {{msg}}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Child1',
}
</script>


<script setup lang="ts">
import myBus from '@/myBus';
import { ref } from 'vue';

const msg = ref('abc');

const changeMsg = (value:string)=>{
  msg.value += value;
}

myBus.on("sendMsg",changeMsg)
</script>
