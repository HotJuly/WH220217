<template>
  <div class="box">
    <h1>组件间通信10: 插槽==> 作用域插槽</h1>

    <h2>需求: 自定义TODO列表组件能实现下面需求</h2>

    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <List :data="todos">
    </List>

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <List :data="todos">
    </List>
  </div>
</template>

<script type="text/ecmascript-6">
  import List from './List'
  export default {
    name: 'SlotTest',
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: false},
          {id: 4, text: 'DDD', isComplete: false},
        ]
      }
    },

    components: {
      List
    }
  }
</script>
