(function () {
  /*
  需求:现在有一个函数,该函数接收两个参数
    第一个参数是需要填充的数据内容
    第二个参数是填充的个数
    返回值是一个数组,数组内部每一项都是填充的内容


    泛型感觉像是新式的形参
    泛型名称随便写
    在函数被调用的时候,可以传递一个类型给泛型变量
*/

  function createArray<T>(data:T, count:number): T[]{
    const arr: T[] = [];
    for (let index = 0; index < count; index++) {
      arr.push(data);
    }
    return arr;
  }

  // console.log(createArray(1,20))
  // console.log(createArray("abc",20))

  const arr1 = createArray<number>(1,20);
  const arr2 = createArray<string>("abc",20);
  // arr1[0]
  // arr2[0].
})();
