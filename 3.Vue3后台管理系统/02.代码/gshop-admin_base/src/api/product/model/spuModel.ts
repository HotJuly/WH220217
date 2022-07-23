// {
//     "records": [
//       {
//         "id": 16180,
//         "spuName": "test",
//         "description": "123",
//         "category3Id": 61,
//         "tmId": 392704,
//         "spuSaleAttrList": null,
//         "spuImageList": null
//       },
//       {
//         "id": 16179,
//         "spuName": "华为",
//         "description": "华为",
//         "category3Id": 61,
//         "tmId": 3,
//         "spuSaleAttrList": null,
//         "spuImageList": null
//       },
//       {
//         "id": 16148,
//         "spuName": "你阿红",
//         "description": "16516",
//         "category3Id": 61,
//         "tmId": 392650,
//         "spuSaleAttrList": null,
//         "spuImageList": null
//       }
//     ],
//     "total": 11,
//     "size": 3,
//     "current": 1,
//     "searchCount": true,
//     "pages": 4
//   }

export interface SpuPageListModel {
  total: number;
  records: SpuListModel;
}

export type SpuListModel = SpuModel[]

export interface SpuModel {
  id?: number;
  spuName: string;
  description: string;
  category3Id: number;
//   所属品牌id,必有
  tmId: number|undefined;
  spuSaleAttrList: null;
  spuImageList: null;
}
