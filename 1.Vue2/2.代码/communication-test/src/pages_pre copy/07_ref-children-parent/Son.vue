<template>
  <div class="box">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button>给BABA钱: 50</button>
  </div>
</template>

<script>
export default {
  name: 'Son',
  
  data () {
    return {
      money: 30000
    }
  }
}
</script>
