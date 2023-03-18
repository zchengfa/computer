// pages/indexDetail/desktopCPU.ts
import { desktop_cpu } from '../../common/json/rankData'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        desktop_cpu:<cpuArr[]>desktop_cpu
    },
    alterData:function() {
        let _cpuData:cpuArr[] = this.data.desktop_cpu
        let maxScore:number = _cpuData[0]['score']
        _cpuData.map((item:any)=>{
            item.progress = Math.floor((item.score/maxScore)*96)
        })

        this.setData({
            desktop_cpu:_cpuData
        })
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