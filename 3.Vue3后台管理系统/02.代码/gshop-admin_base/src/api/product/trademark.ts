import request from '@/utils/request';

export const getTrademarkPageListApi = (page:number,limit:number)=>{
    return request.get(`/admin/product/baseTrademark/${page}/${limit}`)
}