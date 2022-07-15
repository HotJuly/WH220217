import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import './plugins/elements'

// vue组件实例对象如果使用$myBus
// 会现在VueComponent的原型对象上查找,如果没找到,会继续顺这个隐式原型链找到Vue的原型对象
Vue.prototype.$myBus = new Vue();

Vue.config.productionTip = false

new Vue({
  beforeCreate(){
    // Vue.prototype.$bus = this;
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
