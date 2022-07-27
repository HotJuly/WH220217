import request from '@/utils/request';
import type { SkuModel, SkuListModel } from './model/skuModel';

enum Api{
    SaveSkuInfoApi = "/admin/product/saveSkuInfo",
    GetSkuListApi = "/admin/product/findBySpuId"
}

// 用于添加SKU
export const SaveSkuInfoApi = (skuForm:SkuModel)=>{
    return request.post<any,null>(Api.SaveSkuInfoApi,skuForm)
}

// 根据传入的spuId,获取当前spu下,所有的SKU信息
export const getSkuListApi = (spuId:number)=>{
    return request.get<any,SkuListModel>(`${Api.GetSkuListApi}/${spuId}`)
}

