import type { RouteRecordRaw } from 'vue-router';
/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      hidden：        是否隐藏此路由
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

/**
 * 静态路由（默认路由）
 */
/*
  路由一共分为三种:
    1.常量路由->不需要任何权限,所有人都能访问的路由
    2.异步路由->需要根据帐号的权限,来实现动态添加的路由
    3.任意路由->匹配常量路由和异步路由中不存在的路由地址,常用于重定向会404
*/
// 该数组中只留常量路由
 export const staticRoutes: Array<RouteRecordRaw> = [
	{
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true
    }
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true
    }
  },

  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: { 
        title: '首页', 
        icon: 'ele-HomeFilled', 
      }
    }]
  },

];

/**
 * 该数组只留异步路由
 */
export const allAsyncRoutes: Array<RouteRecordRaw> = [
  {
    name:"Product",
    path:"/product",
    component:()=>import('@/layout/index.vue'),
    redirect:"/product/trademark/list",
    children:[
      {
        name:"Trademark",
        path:"/product/trademark/list",
        component:()=>import('@/views/product/trademark/index.vue'),
        meta:{
          title:"品牌管理"
        }
      },
      {
        name:"Attr",
        path:"/product/attr/list",
        component:()=>import('@/views/product/attr/index.vue'),
        meta:{
          title:"属性管理"
        }
      },
      {
        name:"Spu",
        path:"/product/spu/list",
        component:()=>import('@/views/product/spu/index.vue'),
        meta:{
          title:"SPU管理"
        }
      },
      {
        name:"Sku",
        path:"/product/sku/list",
        component:()=>import('@/views/product/sku/index.vue'),
        meta:{
          title:"SKU管理"
        }
      },
      {
        name:"Category",
        path:"/product/category/list",
        component:()=>import('@/views/product/category/index.vue'),
        meta:{
          title:"分类管理"
        }
      }
    ],
    meta:{
      title:"商品管理",
      icon:"ele-ShoppingBag"
    }
  }
];

// 该数组只留任意路由
export const anyRoutes: Array<RouteRecordRaw> = [
  /* 匹配任意的路由 必须最后注册 */
  { 
    path: '/:pathMatch(.*)', 
    name: 'Any',
    redirect: '/404', 
    meta: {
      hidden: true 
    }
  }
];
