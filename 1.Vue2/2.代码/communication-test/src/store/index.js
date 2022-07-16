/* 
vuex的核心管理对象store  仓库
*/
import Vue from 'vue'
import Vuex from 'vuex'

// 扩展:为什么说Vuex是Vue的插件库
// 只要能使用Vue.use的npm包,就有资格被称为插件库
Vue.use(Vuex)

const state = {
  count:0
}

// 什么代码需要写在mutation中
// 同步代码都可以写在mutation中,千万不要涉及异步操作
const mutations = {
  addSync(state,value){
    // console.log('addSync',value)
    state.count += value;
  }
}

// 什么代码需要卸载action里
// 一般是异步操作,例如请求数据
const actions = {
  addAsync(context,data){
    // console.log('addAsync',data);
    setTimeout(()=>{
      context.commit('addSync',data);
    },2000)
  }
}

const getters = {
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})