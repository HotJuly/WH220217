import { defineStore } from 'pinia';
import { getToken, removeToken, setToken } from '../utils/token-utils';
import type { UserInfoState } from './interface';
import {ElMessage} from 'element-plus'
import {staticRoutes} from '@/router/routes'

import {loginApi,getUserInfoApi} from '@/api/acl/login';


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

    roles:[],
    buttons:[],
    routeNames:[],
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
    },

    reset () {
      // 删除local中保存的token
      removeToken()
      // 提交重置用户信息的mutation
      this.token = ''
      this.name = ''
      this.avatar = ''
    },
	},
});
