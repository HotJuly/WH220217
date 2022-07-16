<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>count:{{ count }}</h1>
    <h1 @click="handleClick">count2:{{ count2 }}</h1>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      count:2
    }
  },
  setup() {

    const count = ref(1);


    // 早期版本都是以setup优先
    // 此处实测,目前是methods优先于setup
    const handleClick= ()=>{
      console.log(1)
    }

    return {
      count,
      handleClick
    }
  },
  methods:{
    handleClick(){
      console.log(2)
    }
  }
}
</script>

<script setup>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
