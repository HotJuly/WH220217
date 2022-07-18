import mitt from 'mitt';
// ES6模块化特点:无论这个模块被引入多少次,他只会执行该代码一次

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