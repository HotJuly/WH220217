import { defineStore } from 'pinia';
import { getCategory1ListApi,getCategory2ListApi,getCategory3ListApi } from '@/api/product/category';

export const useCategoryStore = defineStore("category",{
    state:()=>{
        return {
            // 以下三个属性用于收集用户真正选择的分类id
            category1Id:undefined,
            category2Id:undefined,
            category3Id:undefined,

            // 以下三个属性用于收集服务器返回的分类列表信息
            category1List:[],
            category2List:[],
            category3List:[]
        }
    },
    actions:{
        async getCategory1List(){
            const result = await getCategory1ListApi();
            // console.log('onMounted',result)

            this.category1List = result;
        },
        async getCategory2List(id:number){
            this.category1Id = id;
            this.category2Id = undefined;
            this.category3Id = undefined;

            const result = await getCategory2ListApi(id);
            // console.log(result)

            this.category2List = result;
            this.category3List = [];
        },
        async getCategory3List(id:number){
            this.category2Id = id;
            this.category3Id = undefined;

            const result = await getCategory3ListApi(id);
            // console.log(result)

            this.category3List = result;
        },
        setCategory3Id(id:number){
            this.category3Id = id;
        }
    },
    getters:{}
})