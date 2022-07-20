import request from '@/utils/request';
import type { TrademarkPageListModel } from './model/TrademarkModel'

export const getTrademarkPageListApi = (page:number,limit:number)=>{

    // get方法可以接收两个泛型,第一个写any即可,第二个是用于告知axios当前请求的返回数据格式的
    return request.get<any,TrademarkPageListModel>(`/admin/product/baseTrademark/${page}/${limit}`)
}