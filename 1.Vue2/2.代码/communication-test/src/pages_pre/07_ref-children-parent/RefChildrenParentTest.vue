<template>
  <div class="box">
    <h1>组件间通信7: $refs & $children & $parent</h1>

    <p>BABA有存款: {{money}}</p>
    <button>找儿子借钱100</button><br>
    <button>找女儿借钱150</button><br>
    <button>找所有孩子借钱200</button><br>
    
    <br>
    <Son/>

    <br>
    <Daughter/>

  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name: 'ChildrenParentTest',
  data () {
    return {
      money: 1000
    }
  },

  components: {
    Son,
    Daughter
  }
}
</script>

<style>

</style>
