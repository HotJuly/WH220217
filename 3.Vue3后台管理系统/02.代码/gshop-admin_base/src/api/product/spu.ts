import request from '@/utils/request';
import type { SpuPageListModel } from './model/spuModel';

enum Api{
    GetSpuPageListApi = "/admin/product"
}

export const getSpuPageListApi = (page:number,limit:number,category3Id:number)=>{
    return request.get<any,SpuPageListModel>(`${Api.GetSpuPageListApi}/${page}/${limit}?category3Id=${category3Id}`)
}