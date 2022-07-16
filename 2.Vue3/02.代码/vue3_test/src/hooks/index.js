import {ref,onMounted} from 'vue';
export default function(){
    const pageX = ref(0);
    const pageY = ref(0);

    onMounted(()=>{
      document.addEventListener('mousemove',(event)=>{
        const { pageX:x,pageY:y } = event;

        // const { pageX,pageY } = event;
        // const { pageX:pageX,pageY:pageY } = event;
        // 相当于
        // const pageX = event.pageX;
        // const pageY = event.pageY;

        // pageX.value = event.pageX
        pageX.value = x;
        pageY.value = y;
      })
    })

    return {
        pageX,
        pageY
    }
}