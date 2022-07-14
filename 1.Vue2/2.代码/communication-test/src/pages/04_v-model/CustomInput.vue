<template>
  <div class="box">
    <span style="margin-right: 10px">{{title}}: </span>
    <input type="text" :value="value" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'CustomInput',
    props: ['title', 'value']
  }
</script>
