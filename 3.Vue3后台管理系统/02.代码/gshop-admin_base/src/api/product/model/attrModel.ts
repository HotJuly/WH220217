// [
//   {
//     id: 106,
//     attrName: "手机一级",
//     categoryId: 2,
//     categoryLevel: 1,
//     attrValueList: [
//       {
//         id: 176,
//         valueName: "安卓手机",
//         attrId: 106,
//       },
//       {
//         id: 175,
//         valueName: "苹果手机",
//         attrId: 106,
//       },
//     ],
//   },
// ];


export interface AttrValueModel {
    id?: number;
    valueName: string;
    attrId?: number;

    // 用于控制编辑模式的切换
    isEdit?:boolean;
}

export type AttrValueListModel = AttrValueModel[];

export interface AttrModel {
  // ?的使用场景就是新增没有,修改有
  id?: number;
  attrName: string;

  // 该属性必须要有,只是刚开始的时候不知道值是多少,最后用的时候会有值的
  categoryId: number | undefined;
  categoryLevel: number;
  attrValueList: AttrValueListModel;
}

export type AttrListModel = AttrModel[];
