import { defineStore } from 'pinia';

export const useCategoryStore = defineStore("category",{
    state:()=>{
        return {
            category1Id:1,
            category2Id:undefined,
            category3Id:undefined,
        }
    },
    actions:{
        setCategory1Id(id:number){
            this.category1Id = id;
        }
    },
    getters:{}
})