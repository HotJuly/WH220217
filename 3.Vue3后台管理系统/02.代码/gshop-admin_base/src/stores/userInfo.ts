import { defineStore } from 'pinia';
import { getToken, removeToken, setToken } from '../utils/token-utils';
import type { UserInfoState } from './interface';
import {ElMessage} from 'element-plus'
import {staticRoutes, allAsyncRoutes, anyRoutes} from '@/router/routes'
import router from '@/router'
import type { RouteRecordRaw } from 'vue-router';
import {cloneDeep} from 'lodash';

import {loginApi,getUserInfoApi} from '@/api/acl/login';

/*
  该函数的用处:
    1.为了配合router.addRoute语法,实现动态注入异步路由的效果
    2.返回值的用处:返回所有满足条件的异步路由对象
    3.返回值数据类型:数组
        数组中存放的数据类型是啥?->路由对象

    filter方法可以将原数组中满足条件的元素保留下来
      回调函数的返回值如果为true,就代表保留当前这项
                    如果为false,就代表不保留当前这项

      问题:什么叫做符合条件?
      回答:只要当前这个路由对象的别名name,出现在routeNames数组中,就说明用户有权限访问这个路由
*/
function filterAsyncRoutes(asyncRoutes: RouteRecordRaw[],routeNames:string[]){
    const newAsyncRoutes = asyncRoutes.filter((routeObj)=>{
      const name = routeObj.name;

      // 1.先判断最外层的对象能不能留,再看内部,节省性能
      // 如果当前路由对象的名称不存在与routeNames数组中,该对象就不留
      if(!routeNames.includes(name as string)){
        return false;
      }

      // if(routeObj.children&&routeObj.children.length>0){
      if(routeObj.children?.length){

        // 需要将children数组进行过滤,将过滤的结果放回children属性中
        routeObj.children = filterAsyncRoutes(routeObj.children,routeNames);
      }

      return true;
    })

    return newAsyncRoutes;
}

function addRoutes(asyncRoutes:RouteRecordRaw[]){
  asyncRoutes.forEach((routeObj)=>{
    router.addRoute(routeObj)
  })
  // console.log(router.getRoutes())
}

function  resetRoutes(){
  // router.getRoutes()可以获取到当前一共注册了哪些路由
  const routes = router.getRoutes();
  // 将所有的带名字的路由全部删除
  routes.forEach((routeObj)=>{
    if(routeObj.name){
      router.removeRoute(routeObj.name);
    }
  });

  // 重新把常量路由进行一波注册
  staticRoutes.forEach((routeObj)=>{
    router.addRoute(routeObj)
  });
}

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfoStore = defineStore('userInfo', {

	state: (): UserInfoState => ({
    // 项目启动的时候,会立即读取localStorage中存储的上一次的token数据
    // 七天免登陆功能
    token: getToken() as string,
    name: '',
    avatar: '',

    // 用于告知当前账号的角色信息
    roles:[],

    // 用于告知当前账号的按钮权限信息
    buttons:[],

    // 用于存储服务器返回的routes数组,告知当前帐号所能访问的路由的名字
    routeNames:[],

    // 用于控制左侧导航栏的动态显示效果
    menuRoutes: []
  }),

	actions: {
    async login (username: string, password: string) {
      // return new Promise((resolve, reject) => {
        // setTimeout(() => {
        //   if (username==='admin' && password==='111111') {
        //     const token = 'token-atguigu'
        //     setToken(token)
        //     this.token = token
        //     resolve(token)
        //   } else {
        //     reject(new Error('用户名或密码错误!'))
        //     ElMessage.error('用户名或密码错误!')
        //   }
        // }, 1000)
      // })

      try{
        // 通过登录接口,将用户的帐号密码兑换为用户的唯一标识字符串token
        const {token} = await loginApi(username, password);

        // 将token存入到硬盘中了,就是为了方便下次开启使用
        setToken(token)

        // 将token存入到内存中,就是为了方便本次使用
        this.token = token;
          
      }catch(e){
            ElMessage.error('用户名或密码错误!')
      }
    },

    async getInfo () {
      // return new Promise((resolve, reject) => {
        // setTimeout(() => {
        //   this.name = 'admin'
        //   this.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        //   this.menuRoutes = staticRoutes
        //   resolve({name: this.name, avatar: this.avatar, token: this.token})
        // }, 1000)
      // })

      const result = await getUserInfoApi();
      this.name = result.name;
      this.avatar = result.avatar;
      this.roles = result.roles;
      this.buttons = result.buttons;
      this.routeNames = result.routes;
      this.setRoutes(result.routes);
      // this.menuRoutes = staticRoutes;
    },

    reset () {

      resetRoutes();
      // 删除local中保存的token
      removeToken()
      // 提交重置用户信息的mutation
      this.token = ''
      this.name = ''
      this.avatar = ''
      this.menuRoutes = []
    },

    setRoutes(routeNames:string[]){
      // 根据服务器返回的routeNames数组以及项目中切割出来的异步路由数组,实现异步过滤效果
      // 只留下用户能访问的异步路由信息

      const asyncRoutes = filterAsyncRoutes(cloneDeep(allAsyncRoutes),routeNames);
      // console.log(asyncRoutes)
      // 根据过滤完的异步路由数组,来遍历动态注入
      addRoutes(asyncRoutes);
      addRoutes(anyRoutes);

      this.menuRoutes = [...staticRoutes,...asyncRoutes,...anyRoutes];
    }
	},
});
