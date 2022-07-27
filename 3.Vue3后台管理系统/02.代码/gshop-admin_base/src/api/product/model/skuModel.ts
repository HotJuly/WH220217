export interface SkuModel{
    // 以下三者数据都是SPU自带的，不需要我们收集
    category3Id: number|undefined,
    spuId: number|undefined,
    tmId: number|undefined,

    // 以下四个数据收集非常简单,通过Input组件配合v-model就能实现
    skuName: string,
    price: number,
    weight: string,
    skuDesc: string,

    // 以下四个数据需要我们手动收集,相对比较麻烦
    skuAttrValueList: skuAttrValueModel[];
    skuImageList: skuImageModel[];
    skuSaleAttrValueList: skuSaleAttrValueModel[];
    skuDefaultImg: string;
}

export interface skuAttrValueModel{
        attrId: number;
        valueId: number;
}

export interface skuImageModel{
    //     "id": 0, 不需要
        imgName: string;
        imgUrl: string;
        isDefault: string;
    //     "skuId": 0,  不需要
        spuImgId: number;
}

export interface skuSaleAttrValueModel{
    //     "id": 0,     不需要
        saleAttrId: number;
    //     "saleAttrName": "string",    不需要
        saleAttrValueId: number;
    //     "saleAttrValueName": "string",   不需要
    //     "skuId": 0,不需要
    //     "spuId": 0不需要
}
