import { defineStore } from 'pinia';

export const useCounterStore = defineStore("counter",{
    state:()=>{
        return {
            count:2
        }
    },
    actions:{
        addCount(value){
            // console.log('addCount',value)
            this.count+=value;
        }
    },
    getters:{
        evenOrOdd(){
            return this.count%2===1?'奇数':'偶数'
        }
    }
});