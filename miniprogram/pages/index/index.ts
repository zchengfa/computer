// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    rankMenu:<rankMenu[]> [
        {
            iconPath:'../../images/CPU.png',
            text:'桌面CPU天梯图',
            detailPath:'../indexDetail/ladderDiagramRank',
            type:'desktop_cpu'
        },
        {
            iconPath:'../../images/GPU.png',
            text:'桌面GPU天梯图',
            detailPath:'../indexDetail/ladderDiagramRank',
            type:'desktop_Gpu'
        },
        {
            iconPath:'../../images/notebook.png',
            text:'笔记本CPU天梯图',
            detailPath:'../indexDetail/ladderDiagramRank',
            type:'notebook_cpu'
        },
        {
            iconPath:'../../images/phone_CPU.png',
            text:'手机CPU天梯图',
            detailPath:'../indexDetail/ladderDiagramRank',
            type:'phone_cpu'
        },
        {
            iconPath:'../../images/phone_GPU.png',
            text:'手机GPU天梯图',
            detailPath:'../indexDetail/ladderDiagramRank',
            type:'phone_Gpu'
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
        url:e.currentTarget.dataset.path + '?type=' + e.currentTarget.dataset.type
    })
  },
 
})
