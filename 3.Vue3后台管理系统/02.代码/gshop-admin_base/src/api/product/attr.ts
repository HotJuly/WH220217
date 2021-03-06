import request from "@/utils/request";
// import type { TrademarkPageListModel, TrademarkModel } from './model/TrademarkModel'
import type { CategoryIdsModel } from "./model/categoryModel";
import type { AttrListModel, AttrModel } from "./model/attrModel"

enum Api {
  getAttrInfoListApi = "/admin/product/attrInfoList",
  saveAttrInfoApi = "/admin/product/saveAttrInfo",
  deleteAttrInfoApi = "/admin/product/deleteAttr",
}

// 用于请求当前分类下的所有属性组成的列表
export const getAttrInfoListApi = ({
  category1Id,
  category2Id,
  category3Id,
}: CategoryIdsModel) => {

  return request.get<any, AttrListModel>(
    `${Api.getAttrInfoListApi}/${category1Id}/${category2Id}/${category3Id}`
  );
};

// 用于新增或修改平台属性数据
export const saveAttrInfoApi = (attrInfo: AttrModel) => {
  // post方法第一个参数是请求路径,第二个参数是请求体数据
  return request.post<any, null>(Api.saveAttrInfoApi, attrInfo);
};

// 用于删除平台属性数据
export const deleteAttrInfoApi = (attrId: number) => {
  return request.delete<any, null>(`${Api.deleteAttrInfoApi}/${attrId}`);
};
