import mitt from 'mitt';
// ES6模块化特点:无论这个模块被引入多少次,他只会执行该代码一次

// 该类型别名中,属性名是用来声明当前项目中一共有哪些自定义事件
// 属性值是用来声明对应自定义事件回调函数的形参的数据类型
type Events = {
    sendMsg:string
}

// mitt不接收接口,只要type,如果给接口就报错
// interface Events{
//     sendMsg:string
// }

// mitt函数调用完的返回值是一个事件总线对象
// 相当于是以前的Vue.prototpe.$bus = new Vue();

const myBus = mitt<Events>();
export default myBus;