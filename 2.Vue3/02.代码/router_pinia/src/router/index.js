// import VueRouter from 'vue-router'
// import Vue from 'vue'

// // import Home from '@/components/Home.vue';

// Vue.use(VueRouter)

// export default new VueRouter({
//     mode:"hash"||"history",
//     routes:[
//         {
//             path:"/home",
//             // component:Home
//             component:()=>import("@/components/Home.vue")
//         }
//     ]
// })

import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

export default createRouter({
  // history: createWebHashHistory()=>对应Vue2时期的hash值模式,mode:"hash"
  // 以下写法相当于Vue2时期中的history,mode:"history"
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      // component:Home
      component: () => import("@/components/Home.vue"),
    },
    {
      path: "/about",
      // component:Home
      component: () => import("@/components/About.vue"),
    },
    {
        path:"",
        redirect:"/home"
    }
  ],
});
