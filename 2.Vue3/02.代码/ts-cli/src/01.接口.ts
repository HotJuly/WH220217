(function(){

  // 接口就是用来限制一个对象必须拥有的属性和方法的工具
  interface IObj{
    name:string,
    age:number,
    sex?:string,
    readonly phone:number
  }

  let obj:IObj = {
    name:"xiaoming",
    age:23,
    phone:13700000000
  }

  obj.sex="男"

  // obj.phone = 888888;

  console.log(obj)

})();

(function(){
  interface IFn{
    (a:string,b:string):string
  }

  let fn:IFn = (x:string,y:string) => {
    return x+y;
  }

})();

(function(){
  interface Alarm {
    alert(): any;
  }
  
  interface Light {
    lightOn(): void;
    lightOff(): void;
  }
  
  // class Car implements Alarm,Light{
  class Car implements Alarm{
    alert() {
        console.log('Car alert');
    }
  }
})();

(function(){
  
  
  interface Light {
    lightOn(): void;
    lightOff(): void;
  }

  interface Alarm extends Light{
    alert(): any;
  }
  
  // class Car implements Alarm,Light{
  class Car implements Alarm{
    alert() {
        console.log('Car alert');
    }
  }
})();

// const obj =1;
(function(){
  /* 需求:服务器返回一个对象,该对象具有两个属性
    属性1:total总数
    属性2:list列表

  */
//  type叫做类型别名,相当于是给某种类型去了一个外号
  type List = object[];
  type Numberable = number|null;

  interface ListModel{
    total:Numberable,
    // list:object[]
    list:List
  }
  

})();