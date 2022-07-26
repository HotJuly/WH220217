import request from '@/utils/request';
import type { SpuModel, SpuPageListModel, BaseSaleAttrListModel, SpuImageListModel, SpuSaleAttrListModel } from './model/spuModel';
import type { TrademarkListModel } from './model/TrademarkModel';

enum Api{
    GetSpuPageListApi = "/admin/product",

    // 1.用于获取当前平台所有的销售属性(在SPU接口中找),新增和修改都要用
    GetBaseSaleAttrListApi = "/admin/product/baseSaleAttrList",

    // 2.用于获取当前平台所有的品牌信息(在品牌接口中找),新增和修改都要用
    GetTrademarkListApi = "/admin/product/baseTrademark/getTrademarkList",

    // 3.用于请求当前spu的图片列表信息(在SKU接口中找),只有修改要用
    GetSpuImageListApi = "/admin/product/spuImageList",

    // 4.用于请求当前spu的销售属性列表信息(在SKU接口中找),只有修改要用
    GetSpuSaleAttrListApi = "/admin/product/spuSaleAttrList",

    // 5.用于新增SPU的信息
    SaveSpuInfoApi = "/admin/product/saveSpuInfo",

    // 6.用于修改SPU的信息
    UpdateSpuInfoApi = "/admin/product/updateSpuInfo",

    // 7.用于删除指定的spu
    deleteSpuApi = "/admin/product/deleteSpu"

}

export const getSpuPageListApi = (page:number,limit:number,category3Id:number)=>{
    return request.get<any,SpuPageListModel>(`${Api.GetSpuPageListApi}/${page}/${limit}?category3Id=${category3Id}`)
}

// 1.用于返回平台所有的销售属性
export const getBaseSaleAttrListApi = ()=>{
    return request.get<any,BaseSaleAttrListModel>(Api.GetBaseSaleAttrListApi)
}

// 2.用于返回平台所有的品牌信息
export const getTrademarkListApi = ()=>{
    return request.get<any,TrademarkListModel>(Api.GetTrademarkListApi)
}

// 3.用于返回当前spu所有的图片信息
export const getSpuImageListApi = (spuId:number)=>{
    return request.get<any,SpuImageListModel>(`${Api.GetSpuImageListApi}/${spuId}`)
}

// 4.用于返回当前spu所有的销售属性信息
export const getSpuSaleAttrListApi = (spuId:number)=>{
    return request.get<any,SpuSaleAttrListModel>(`${Api.GetSpuSaleAttrListApi}/${spuId}`)
}

export const SaveSpuInfoApi = (spuForm:SpuModel)=>{
    return request.post<any,null>(Api.SaveSpuInfoApi,spuForm)
}

export const UpdateSpuInfoApi = (spuForm:SpuModel)=>{
    return request.post<any,null>(Api.UpdateSpuInfoApi,spuForm)
}

export const deleteSpuApi = (id:number)=>{
    return request.delete<any,null>(`${Api.deleteSpuApi}/${id}`)
}