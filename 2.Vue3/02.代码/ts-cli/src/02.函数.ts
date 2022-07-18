(function(){
  function add(x:string, y:string):string {
    return x + y
  }
  
  // 匿名函数
  let myAdd = function(x:string = "1", y?:string, ...arg : number[]):string { 
    return x + y;
  }

  
  // let myAdd1:(a:string,b:string)=>string 
  // = 
  // function(x:string, y:string):string { 
  //   return x + y;
  // }

  myAdd("1","2",3,4,5,6,7)
  myAdd()
})();

// const obj = 1;

(function(){
  // 需求:现在有一个函数,该函数接收两个实参,数据类型可以使字符串或者数字
  //  如果两个都是数字,就返回相乘的结果
  //  如果两个都是字符串,就返回相加的结果

  function getType(a :number,b :number) :number
  function getType(a :string,b :string) :string
  function getType(a :number|string,b :number|string) :string|number{
    if(typeof a==="number"&&typeof b==="number"){
      return a*b;
    }

    if(typeof a==="string"&&typeof b==="string"){
      return a+b;
    }
  }

  console.log(getType(1,2));
  console.log(getType("1","2"));
  console.log(getType(1,"2"));

})();