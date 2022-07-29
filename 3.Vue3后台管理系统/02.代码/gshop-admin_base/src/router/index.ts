import { createRouter, createWebHistory } from 'vue-router';
import { staticRoutes , anyRoutes } from '@/router/routes';

const router = createRouter({
	history: createWebHistory(),
	routes: staticRoutes,
  scrollBehavior() {
    return { top: 0, left: 0}
  },
})

// 这里在测试API,练习如何动态注册一个路由,并不是权限管理功能的一部分
// router.addRoute(anyRoutes[0]);

// 导出路由
export default router;