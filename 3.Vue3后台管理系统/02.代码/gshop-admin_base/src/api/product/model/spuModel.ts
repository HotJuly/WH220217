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

export type SpuListModel = SpuModel[];

export interface SpuModel {
  id?: number;
  spuName: string;
  description: string;
  category3Id: number | undefined;
  //   所属品牌id,必有
  tmId: number | undefined;
  spuSaleAttrList: SpuSaleAttrListModel;
  spuImageList: SpuImageListModel;
}

export type BaseSaleAttrListModel = BaseSaleAttrModel[];

export interface BaseSaleAttrModel {
  id: number;
  name: string;
}

export type SpuImageListModel = SpuImageModel[];

export interface SpuImageModel {
  id: number;
  spuId: number;
  imgName: string;
  imgUrl: string;

  // 以下两个属性用于显示图片墙功能
  name?:string;
  url?:string;
}

// {
// "id": 2,
// "spuId": 1,
// "baseSaleAttrId": 2,
// "saleAttrName": "版本",
// "spuSaleAttrValueList": [
//     {
//       "id": 3,
//       "spuId": 1,
//       "baseSaleAttrId": 2,
//       "saleAttrValueName": "8G+128G",
//       "saleAttrName": "版本",
//       "isChecked": null
//     }
//   ]
// }

export type SpuSaleAttrListModel = SpuSaleAttrModel[];

export interface SpuSaleAttrModel {
  id?: number;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: SpuSaleAttrValueListModel;
}

export type SpuSaleAttrValueListModel = SpuSaleAttrValueModel[];

export interface SpuSaleAttrValueModel {
  id: number;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName: string;
  isChecked: null;
}
