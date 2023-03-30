// pages/indexDetail/desktopCPU.ts
import { desktop_cpu , desktop_Gpu , notebook_cpu , phone_cpu} from '../../common/json/rankData'
type btn ={
    name:string,
    btnColor:string
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        rankData:<cpuArr[]>[],
        leftBgColor:<string>'',
        rightBgColor:<string>'',
        showLabel:<boolean>true,
        btnArray:<btn[]>[{"name":"intel","btnColor":"#6685dc"},{"name":"AMD","btnColor":"#e44c33"}]
    },
    alterData:function(index:number = 0,direction:number = 1) {
        console.log(this.data.rankData)
        let _cpuData:cpuArr[] = JSON.parse(JSON.stringify(this.data.rankData))
        let maxScore:number = 0
        
        if(direction){
            maxScore = _cpuData[index]['score']
        }
        else{
           if(index > 0){
                maxScore = _cpuData[index - 1]['score']
           }
           else{
                maxScore = _cpuData[index]['score']
           } 
           
        }
        _cpuData.map((item:any,itemIndex:number)=>{
            itemIndex >= index ? item.progress = Math.floor((item.score/maxScore)*96) : item.progress = 0
            item.canAnimate = true 
        })

        this.setData({
            rankData:_cpuData
        })  
    },
    changeAniStatus(e:any){
       
        let _cpuData = this.data.rankData
        _cpuData[e.detail.index].canAnimate = e.detail.status
        this.setData({
            rankData:_cpuData
        })
       
    },
    changeScoreRatio(e:any){
        this.alterData(e.detail.index,e.detail.direction)
       
    },
    backStatus(){
        this.alterData()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      
       switch (options.type) {
           case 'desktop_cpu':
               this.setData({
                   rankData:desktop_cpu,
                   leftBgColor:'linear-gradient(to right, #446fe4 , #0e54a5)',
                   rightBgColor:'linear-gradient(to right, #b62b15 , #ca6b5c)'
               })
               break;
           case 'desktop_Gpu':
               this.setData({
                   rankData:desktop_Gpu,
                   leftBgColor: 'linear-gradient(to right, #96d99b , #29a632 , #13821a)',  
                   btnArray:[{"name":"NVIDIA","btnColor":"#29a632"},{"name":"AMD","btnColor":"#ca6b5c"}]
               })
               break;
           case 'notebook_cpu':
               this.setData({
                   rankData:notebook_cpu,
               })
               break;  
           case 'phone_cpu':
               this.setData({
                   rankData:phone_cpu,
                   showLabel:false
               })
               break;
           case 'phone_Gpu':
               this.setData({
                   rankData:notebook_cpu,
                   showLabel:false
               })
               break;             
           default:
               return        
       }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        this.alterData()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
       
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})