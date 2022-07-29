import request from '@/utils/request';
import type { CategoryListModel, CategoryModel } from './model/categoryModel'

enum Api{
    getCategory1List = "/admin/product/getCategory1",
    getCategory2List = "/admin/product/getCategory2",
    getCategory3List = "/admin/product/getCategory3",
    SaveCategory1Api = "/admin/product/saveCategory1",
    SaveCategory2Api = "/admin/product/saveCategory2",
    SaveCategory3Api = "/admin/product/saveCategory3"
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

// 用于添加一级分类
export const saveCategory1Api = (category1Info:CategoryModel)=>{
    return request.post<any,null>(Api.SaveCategory1Api,category1Info)
}

// 用于添加一级分类
export const saveCategory2Api = (category2Info:CategoryModel)=>{
    return request.post<any,null>(Api.SaveCategory2Api,category2Info)
}

// 用于添加一级分类
export const saveCategory3Api = (category3Info:CategoryModel)=>{
    return request.post<any,null>(Api.SaveCategory3Api,category3Info)
}