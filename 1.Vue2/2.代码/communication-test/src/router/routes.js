/*
所有路由配置的数组
  组件懒加载:就是当项目运行的时候,不立即加载某些组件
  路由懒加载:就是当项目运行的时候,不立即加载某些路由
*/

export default [
  {
    path: '/props',
    component: () => import('@/pages/01_props/PropsTest.vue'),
  },
  {
    path: '/event',
    component: () => import('@/pages/02_custom-event/EventTest'),
  },
  {
    path: '/bus',
    component: () => import('@/pages/03_event-bus/EventBusTest'),
  },
  {
    path: '/model',
    component: () => import('@/pages/04_v-model/ModelTest'),
  },
  {
    path: '/sync',
    component: () => import('@/pages/05_sync/SyncTest'),
  },
  {
    path: '/attrs-listeners',
    component: () => import('@/pages/06_attrs-listeners/AttrsListenersTest'),
  },
  {
    path: '/ref-children-parent',
    component: () => import('@/pages/07_ref-children-parent/RefChildrenParentTest'),
  },
  {
    path: '/provide-inject',
    component: () => import('@/pages/08_provide-inject/ProvideInjectTest'),
  },
  {
    path: '/vuex',
    component: () => import('@/pages/09_vuex/VuexTest'),
  },
  {
    path: '/slot',
    component: () => import('@/pages/10_slot/SlotTest'),
  },

  /* --------------------------------------- */
  {
    path: '/props_pre',
    component: () => import('@/pages_pre/01_props/PropsTest.vue'),
  },
  {
    path: '/event_pre',
    component: () => import('@/pages_pre/02_custom-event/EventTest'),
  },
  {
    path: '/bus_pre',
    component: () => import('@/pages_pre/03_event-bus/EventBusTest'),
  },
  {
    path: '/model_pre',
    component: () => import('@/pages_pre/04_v-model/ModelTest'),
  },
  {
    path: '/sync_pre',
    component: () => import('@/pages_pre/05_sync/SyncTest'),
  },
  {
    path: '/attrs-listeners_pre',
    component: () => import('@/pages_pre/06_attrs-listeners/AttrsListenersTest'),
  },
  {
    path: '/ref-children-parent_pre',
    component: () => import('@/pages_pre/07_ref-children-parent/RefChildrenParentTest'),
  },
  {
    path: '/provide-inject_pre',
    component: () => import('@/pages_pre/08_provide-inject/ProvideInjectTest'),
  },
  {
    path: '/vuex_pre',
    component: () => import('@/pages_pre/09_vuex/VuexTest'),
  },
  {
    path: '/slot_pre',
    component: () => import('@/pages_pre/10_slot/SlotTest'),
  },
]
