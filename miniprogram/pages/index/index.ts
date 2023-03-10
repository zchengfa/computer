// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
   rankMenu:<rankMenu[]> [
    {
        iconPath:'../../images/CPU.png',
        text:'桌面CPU天梯图',
        detailPath:'../indexDetail/desktopCPU'
    },
    {
        iconPath:'../../images/GPU.png',
        text:'桌面GPU天梯图',
        detailPath:''
    },
    {
        iconPath:'../../images/notebook.png',
        text:'笔记本CPU天梯图',
        detailPath:''
    },
    {
        iconPath:'../../images/phone_CPU.png',
        text:'手机CPU天梯图',
        detailPath:''
    },
    {
        iconPath:'../../images/phone_GPU.png',
        text:'手机GPU天梯图'
    },
   ]
   
  },
  
  onLoad() {
    
   
  },
  onShow(){
    if(typeof this.getTabBar === 'function' && this.getTabBar()){
        this.getTabBar().setData({
             selected:0
        })
    }
  },
  toPageDetail: function(e:any){
    wx.navigateTo({
        url:e.currentTarget.dataset.path
    })
  },
 
})
