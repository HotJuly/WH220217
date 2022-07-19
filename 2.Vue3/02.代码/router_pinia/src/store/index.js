// import Vuex from 'vuex';
// import Vue from 'vue';

// Vue.use(Vuex);

// export default new Vuex.Store({
//     state:{
//         count:0
//     },
//     mutations:{

//     },
//     actions:{

//     },
//     getters:{

//     }
// })

import { createStore } from "vuex";

export default createStore({
  state: {
    count:1,
  },
  mutations: {
    addCount(state){
      state.count+=1;
    }
  },
  actions: {},
  getters: {
    evenOrOdd(state){
        return state.count%2===1?'奇数':'偶数'
    }
  },
});
