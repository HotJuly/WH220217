// {
//     "records": [
//       {
//         "id": 1,
//         "tmName": "小米",
//         "logoUrl": "/static/default.jpg"
//       },
//       {
//         "id": 2,
//         "tmName": "苹果",
//         "logoUrl": "/static/default.jpg"
//       },
//       {
//         "id": 3,
//         "tmName": "华为",
//         "logoUrl": "/static/default.jpg"
//       }
//     ],
//     "total": 43,
//     "size": 3,
//     "current": 1,
//     "searchCount": true,
//     "pages": 15
//   }

// 只要你想说明一个对象中具有哪些属性,就是用接口

// 声明品牌对象具有哪些属性
export interface TrademarkModel {
  id?: number;
  tmName: string;
  logoUrl: string;
}

// 声明品牌列表中存储的内容,是多个品牌对象
export type TrademarkListModel = TrademarkModel[];

// 声明请求品牌分页列表得到的数据的内容,具有两个属性,total,records
export interface TrademarkPageListModel {
  total: number;
  records:TrademarkListModel;
  // num66666:number
}
