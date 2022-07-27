import request from '@/utils/request';
import type { SkuModel, SkuListModel, SkuPageListModel } from './model/skuModel';

enum Api{
    SaveSkuInfoApi = "/admin/product/saveSkuInfo",
    GetSkuListApi = "/admin/product/findBySpuId",
    GetSkuPageListApi = "/admin/product/list",
    OnSaleApi = "/admin/product/onSale",
    CancelSaleApi = "/admin/product/cancelSale",
    GetSkuInfoApi = "/admin/product/getSkuById"
}

// 用于添加SKU
export const SaveSkuInfoApi = (skuForm:SkuModel)=>{
    return request.post<any,null>(Api.SaveSkuInfoApi,skuForm)
}

// 根据传入的spuId,获取当前spu下,所有的SKU信息
export const getSkuListApi = (spuId:number)=>{
    return request.get<any,SkuListModel>(`${Api.GetSkuListApi}/${spuId}`)
}

// 根据传入的页数和每页显示条数,请求列表数据进行展示
export const getSkuPageListApi = (page:number,limit:number)=>{
    return request.get<any,SkuPageListModel>(`${Api.GetSkuPageListApi}/${page}/${limit}`)
}

// 将sku进行上架处理
export const onSaleApi = (skuId:number)=>{
    return request.get<any,null>(`${Api.OnSaleApi}/${skuId}`)
}

// 将sku进行下架处理
export const cancelSaleApi = (skuId:number)=>{
    return request.get<any,null>(`${Api.CancelSaleApi}/${skuId}`)
}

// 将sku进行下架处理
export const getSkuInfoApi = (skuId:number)=>{
    return request.get<any,SkuModel>(`${Api.GetSkuInfoApi}/${skuId}`)
}



