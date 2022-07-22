import request from '@/utils/request';
import type { CategoryListModel } from './model/categoryModel'

enum Api{
    getCategory1List = "/admin/product/getCategory1",
    getCategory2List = "/admin/product/getCategory2",
    getCategory3List = "/admin/product/getCategory3"
}

// 用于请求一级分类列表数据
export const getCategory1ListApi = ()=>{
    return request.get<any,CategoryListModel>(Api.getCategory1List)
}

// 用于请求二级分类列表数据
export const getCategory2ListApi = (category1Id:number)=>{
    return request.get<any,CategoryListModel>(`${Api.getCategory2List}/${category1Id}`)
}

// 用于请求三级分类列表数据
export const getCategory3ListApi = (category2Id:number)=>{
    return request.get<any,CategoryListModel>(`${Api.getCategory3List}/${category2Id}`)
}