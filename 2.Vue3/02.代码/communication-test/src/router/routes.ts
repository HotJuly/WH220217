/*
所有路由配置的数组
*/

export default [
  {
    path: '/props',
    component: () => import('@/views/01_props/PropsTest.vue'),
  },
  {
    path: '/event',
    component: () => import('@/views/02_custom-event/EventTest.vue'),
  },
  {
    path: '/bus',
    component: () => import('@/views/03_event-bus/EventBusTest.vue'),
  },
  {
    path: '/model',
    component: () => import('@/views/04_v-model/ModelTest.vue'),
  },
  {
    path: '/attrs',
    component: () => import('@/views/05_attrs/AttrsTest.vue'),
  },
  {
    path: '/ref-parent',
    component: () => import('@/views/06_ref-parent/RefParentTest.vue'),
  },
  {
    path: '/provide-inject',
    component: () => import('@/views/07_provide-inject/ProvideInjectTest.vue'),
  },
   {
    path: '/slot',
    component: () => import('@/views/08_slot/SlotTest.vue'),
  },
  

  /* --------------------------------------- */
  {
    path: '/props_pre',
    component: () => import('@/views_pre/01_props/PropsTest.vue'),
  },
  {
    path: '/event_pre',
    component: () => import('@/views_pre/02_custom-event/EventTest.vue'),
  },
  {
    path: '/bus_pre',
    component: () => import('@/views_pre/03_event-bus/EventBusTest.vue'),
  },
  {
    path: '/model_pre',
    component: () => import('@/views_pre/04_v-model/ModelTest.vue'),
  },
  {
    path: '/attrs_pre',
    component: () => import('@/views_pre/05_attrs/AttrsTest.vue'),
  },
  {
    path: '/ref-parent_pre',
    component: () => import('@/views_pre/06_ref-parent/RefParentTest.vue'),
  },
  {
    path: '/provide-inject_pre',
    component: () => import('@/views_pre/07_provide-inject/ProvideInjectTest.vue'),
  },
   {
    path: '/slot_pre',
    component: () => import('@/views_pre/08_slot/SlotTest.vue'),
  },
]
