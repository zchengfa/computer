// pages/arrange/arrange.ts

Page({

    /**
     * 页面的初始数据
     */
    data: {
        arrangeMenu:<string[]>['CPU','主板','显卡','内存','固态','显示器','散热','电源','机箱','风扇'],
        tip:<string>'总价为实际价格，无（装机或利润）价格，请放心选择。',
        isShowSettle:<boolean>true
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

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow(){
        if(typeof this.getTabBar === 'function' && this.getTabBar()){
            this.getTabBar().setData({
                selected:1
            })
        }
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