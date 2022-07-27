export interface SkuPageListModel {
  total: number;
  records: SkuListModel;
}

export type SkuListModel = SkuModel[];

export interface SkuModel {
  // 以下三者数据都是SPU自带的，不需要我们收集
  category3Id: number | undefined;
  spuId: number | undefined;
  tmId: number | undefined;

  // 以下四个数据收集非常简单,通过Input组件配合v-model就能实现
  skuName: string;
  price: number;
  weight: string;
  skuDesc: string;

  // 以下四个数据需要我们手动收集,相对比较麻烦
  skuAttrValueList: skuAttrValueListModel;
  skuImageList: skuImageListModel;
  skuSaleAttrValueList: skuSaleAttrValueListModel;
  skuDefaultImg: string;

  id?: number;
}

export type skuAttrValueListModel = skuAttrValueModel[];

export interface skuAttrValueModel {
  id?: number;
  skuId?: number;
  attrName?: string;
  valueName?: string;
  attrId: number;
  valueId: number;
}
export type skuImageListModel = skuImageModel[];

export interface skuImageModel {
  //     "id": 0, 不需要
  imgName: string;
  imgUrl: string;
  isDefault: string;
  //     "skuId": 0,  不需要
  spuImgId: number;
}
export type skuSaleAttrValueListModel = skuSaleAttrValueModel[];

export interface skuSaleAttrValueModel {
  id?: number;
  saleAttrId: number;
  saleAttrName?: string;
  saleAttrValueId: number;
  saleAttrValueName?: string;
  //     "skuId": 0,不需要
  //     "spuId": 0不需要
}
