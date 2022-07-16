<template>
  <div class="box">
    <h1>组件间通信10: 插槽==> 作用域插槽</h1>

    <h2>需求: 自定义TODO列表组件能实现下面需求</h2>

    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <!-- 
      插槽
        一共分为三种
        1.默认插槽
          流程:
            1.父组件将一段结构传入到子组件的成对标签中
            2.子组件只需要在自己的template中使用slot组件声明显示插槽结构的位置即可
            
        2.具名插槽
          流程:
            1.父组件将一段结构传入到子组件的成对标签中
            2.在传递结构的时候,通过v-slot指令给当前插槽取个名字(语法: v-slot:名称)
            3.子组件只需要在自己的template中使用slot组件声明显示插槽结构的位置即可
            4.在使用slot组件的时候,可以添加上name标签属性,属性值为需要显示的插槽名称即可

            注意:默认插槽其实也有名字,叫做default

        3.作用域插槽
          流程:
            1.父组件将一段结构传入到子组件的成对标签中
            2.在传递结构的时候,通过v-slot指令给当前插槽取个名字(语法: v-slot:名称)
            3.子组件只需要在自己的template中使用slot组件声明显示插槽结构的位置即可
            4.在使用slot组件的时候,可以添加上name标签属性,属性值为需要显示的插槽名称即可
            5.将部分数据通过标签属性的形式,传递给slot组件
            6.slot组件会将数据传递给插槽结构
              所以在插槽结构声明的时候,需要提前写好变量接收未来可能收到的数据
                注意:这部操作是在父组件传递插槽的时候就做好的
     -->
    <List :data="todos">
      <template>
        <div>Header</div>
      </template>

      <template v-slot:content="a">
        <span
          :style="{
            color: a.item.isComplete ? 'green' : 'black',
          }"
          >{{ a.item.text }}</span
        >
        <!-- <span>{{ a }}</span> -->
      </template>

      <template v-slot:footer>
        <div>Footer</div>
      </template>
    </List>

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <List :data="todos">
      <template>
        <div>Header</div>
      </template>

      <template v-slot:content="{ item, index }">
        <span
          :style="{
            color: index % 2 === 0 ? 'blue' : 'green',
          }"
          >{{ `${index + 1}--${item.text}` }}</span
        >
      </template>

      <template #footer>
        <div>Footer</div>
      </template>
    </List>
  </div>
</template>

<script type="text/ecmascript-6">
import List from './List'
export default {
  name: 'SlotTest',
  data() {
    return {
      todos: [
        { id: 1, text: 'AAA', isComplete: false },
        { id: 2, text: 'BBB', isComplete: true },
        { id: 3, text: 'CCC', isComplete: false },
        { id: 4, text: 'DDD', isComplete: false },
      ]
    }
  },

  components: {
    List
  }
}
</script>
