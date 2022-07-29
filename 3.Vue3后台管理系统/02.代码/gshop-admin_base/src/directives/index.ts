import type {App} from 'vue';
import { useUserInfoStore } from '@/stores/userInfo';

const userInfoStore = useUserInfoStore();

function install(app:App){
    // console.log(1)
    // 此处就是在向整个项目注册一个全局指令
    // 任何模块不需要做任何事情,就可以直接使用
    // 指令全称:v-has-permission
    app.directive("has-permission",{
        mounted(el,{value}){
            // el是使用了这个指令的标签生成的真实DOM
            // value是当前指令的属性值,我们传入了当前按钮所需要的权限信息,例如:`btn.Trademark.add`
            // console.log(el,value)
            const buttons = userInfoStore.buttons;

            // 在buttons数组中查找用户是否具有该按钮的权限
            const result = buttons.includes(value);

            // 如果有就不用删除了
            if(result)return;

            // 没有就删除该节点
            el.parentNode.removeChild(el);
        }
    })
}

export default install;