export default {
  data(){
    return{
      pageX:0,
      pageY:0
    }
  },
  mounted(){
    console.log(2)
    // 做Vue项目,尽量使用数据驱动,不要直接操作真实DOM
    // 如果现在需要保证一个动画的流畅度,建议操作真实DOM
    // 如果现在只是显示一些页面数据,更新频率不高,建议使用数据驱动
    document.addEventListener('mousemove',(event)=>{
      // console.log(event)
      const {pageX,pageY} = event;
      this.pageX = pageX;
      this.pageY = pageY;
      // console.log(this.pageX)
      // debugger
      // 注意点:Vue更新数据是同步更新,更新视图是异步更新
    })
  },
}