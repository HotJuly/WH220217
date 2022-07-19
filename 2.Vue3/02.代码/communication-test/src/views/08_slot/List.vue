<template>
  <div class="box">
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <!-- {{item.text}} -->
        <slot :row="item" :$index="index"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    data: Array
  }
}
</script>