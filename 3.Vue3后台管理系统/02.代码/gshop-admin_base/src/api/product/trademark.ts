import request from '@/utils/request';
import type { TrademarkPageListModel, TrademarkModel } from './model/TrademarkModel'

enum Api{
    getTrademarkPageListApi = "/admin/product/baseTrademark",
    saveTrademarkApi = "/admin/product/baseTrademark/save"
}

/**
 * 用于请求品牌管理模块的品牌分页列表数据
 * @param page 数据类型为number,代表当前请求的页数
 * @param limit 数据类型为number,代表当前请求页数的品牌条数
 * @returns 数据类型为Promise对象,返回的数据类型是TrademarkPageListModel
 */
export const getTrademarkPageListApi = (page:number,limit:number)=>{

    // get方法可以接收两个泛型,第一个写any即可,第二个是用于告知axios当前请求的返回数据格式的
    return request.get<any,TrademarkPageListModel>(`${Api.getTrademarkPageListApi}/${page}/${limit}`)
}

// 用于新增品牌数据
export const saveTrademarkApi = (trademark:TrademarkModel)=>{

    // post方法第一个参数是请求路径,第二个参数是请求体数据
    return request.post<any,null>(Api.saveTrademarkApi,trademark)
}