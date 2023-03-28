// pages/indexDetail/desktopCPU.ts
import { desktop_cpu } from '../../common/json/rankData'
type btn ={
    name:string,
    btnColor:string
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        desktop_cpu:<cpuArr[]>desktop_cpu,
        btnArray:<btn[]>[
            {
                "name":"intel",
                "btnColor":"#6685dc"
            },
            {
                "name":"AMD",
                "btnColor":"#e44c33"
            }
        ]
    },
    alterData:function(index:number = 0,direction:number = 1) {
        
        let _cpuData:cpuArr[] = this.data.desktop_cpu
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
            desktop_cpu:_cpuData
        })  
    },
    changeAniStatus(e:any){
       
        let _cpuData = this.data.desktop_cpu
        _cpuData[e.detail.index].canAnimate = e.detail.status
        this.setData({
            desktop_cpu:_cpuData
        })
       
    },
    changeScoreRatio(e:any){
        this.alterData(e.detail.index,e.detail.direction)
       
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        
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