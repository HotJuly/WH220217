<template>
  <div class="box">
    <div>我是列表的头部</div>
    <ul>
      <li v-for="item in data" :key="item.id">
        <span >{{item.text}}</span>
      </li>
    </ul>
    <div>我是列表的底部</div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    data: Array
  }
}
</script>