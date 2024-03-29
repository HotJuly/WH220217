import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/stores'
import { useUserInfoStore } from '@/stores/userInfo'
import { ElMessage } from 'element-plus'
import getPageTitle from './utils/get-page-title'

NProgress.configure({ showSpinner: false });
const userInfoStore = useUserInfoStore(pinia)


// 不用进行token检查的白名单路径数组
const whiteList = ['/login']

// 路由加载前
// 全局前置守卫
// 当路由跳转触发,即将跳转之前会执行该导航守卫
// 回调函数会接受三个参数,
// 第一个to:是你想跳转的路由信息
// 第二个from:是你准备离开的路由信息
// 第三个next:是一个回调函数,调用该函数可以控制路由的跳转
router.beforeEach(async (to, from, next) => {
   // 在显示进度条
   NProgress.start()

   // 设置整个页面的标题
   document.title = getPageTitle(to.meta.title as string)

  const token = userInfoStore.token
  // 如果token存在(已经登陆或前面登陆过)
  if (token) {
    // 如果请求的是登陆路由
    if (to.path === '/login') {
      // 直接跳转到根路由, 并完成进度条
      next({ path: '/' })
      NProgress.done()
    } else { // 请求的不是登陆路由
      // 是否已经登陆
      // const hasLogin = !(!userInfoStore.name)
      // const hasLogin = Boolean(userInfoStore.name)
      const hasLogin = !!userInfoStore.name
      // 如果已经登陆直接放行
      if (hasLogin) {
        next()
      } else { // 如果还没有登陆
        try {
          // 异步请求获取用户信息(包含权限数据) ==> 动态注册用户的权限路由 => 当次跳转不可见
          await userInfoStore.getInfo()
          // Vue-Router的缺点:刚使用addRoute方法注入的路由,无法立即跳转,只有在下一次跳转的时候才会有效
          // next() // 重新跳转去目标路由, 能看到动态添加的异步路由, 且不会丢失参数
          next(to) // 重新跳转去目标路由, 能看到动态添加的异步路由, 且不会丢失参数
          NProgress.done() // 结束进度条

        } catch (error: any) { // 如果请求处理过程中出错
          // 重置用户信息
          await userInfoStore.reset()
          // 提示错误信息
          // ElMessage.error(error.message || 'Has Error') // axios拦截器中已经有提示了
          // 跳转到登陆页面, 并携带原本要跳转的路由路径, 用于登陆成功后跳转
          next(`/login?redirect=${to.path}`)
          // 完成进度条
          NProgress.done()
        }
      }
    }
  } else { // 没有token
    // 如果目标路径在白名单中(是不需要token的路径)
    // indexof如果返回值为-1代表不存在,不等于-1就是找到了
    if (whiteList.indexOf(to.path) !== -1) {
      // 放行
      next()
    } else {
      // 如果没在白名单中, 跳转到登陆路由携带原目标路径
      next(`/login?redirect=${to.path}`)
      // 完成进度条  当次跳转中断了, 要进行一个新的跳转了
      NProgress.done()
    }
  }
})

// 路由加载后
// 全局后置守卫
// 当路由跳转结束之后,到达了目的地之后才会执行该导航守卫
router.afterEach(() => {
	NProgress.done();
})
