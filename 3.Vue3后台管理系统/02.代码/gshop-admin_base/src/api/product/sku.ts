import request from '@/utils/request';
import type { SkuModel } from './model/skuModel';

enum Api{
    SaveSkuInfoApi = "/admin/product/saveSkuInfo",

}

// 用于添加SKU
export const SaveSkuInfoApi = (skuForm:SkuModel)=>{
    return request.post<any,null>(Api.SaveSkuInfoApi,skuForm)
}
