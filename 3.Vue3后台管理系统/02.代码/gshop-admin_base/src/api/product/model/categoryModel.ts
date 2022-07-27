// 非严格模式下,undefined和null是所有类型的子类型
// 但是严格模式下,不是
export type Numberable = number | undefined;

export interface CategoryModel {
  id: number;
  name: string;

  // 用于分类模块实现树形结构效果
  hasChildren?:boolean;
  level?:number;
}

export type CategoryListModel = CategoryModel[];

export interface CategoryIdsModel{
  category1Id: Numberable;
  category2Id: Numberable;
  category3Id: Numberable;
}

export interface CategoryStateModel extends CategoryIdsModel {
  category1List: CategoryListModel;
  category2List: CategoryListModel;
  category3List: CategoryListModel;
}

// 分类列表接口返回数据格式
// [
//   {
//     id: 1,
//     name: "图书、音像、电子书刊",
//   },
// ];
