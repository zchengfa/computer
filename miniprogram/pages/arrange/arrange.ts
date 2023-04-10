// pages/arrange/arrange.ts
import { computerData } from "../../common/json/staticData";

interface computerArr {
    brand:string,
    text:string,
    desc:string,
    price:number,
    imagePath:string,
    count?:number
}

Page({
    /**
     * 页面的初始数据
     */
    data: {
        arrangeMenu:<any[]>[{"name":"CPU"},{"name":"主板"},{"name":"显卡"},{"name":"内存"},{"name":"固态"},{"name":"显示器"},{"name":"散热器"},{"name":"电源"},{"name":"机箱"},{"name":"风扇"}],
        tip:<string>'总价为实际价格，无（装机或利润）价格，请放心选择。',
        isShowSettle:<boolean>false,
        showDrawer:<boolean>false,
        drawerTitle:<string>'',
        computerData:<computerArr[]>[],
        floatPrice:<string>'00',
        intPrice:<number>0
    },
    showDrawer(e:any){
        
        let item:string = e.currentTarget.dataset.item , data:computerArr[] = [];
        //@ts-ignore
        Array.isArray(computerData[item]) ? data = computerData[item] : data = []
        data.map((item:any)=>{
            item.count = 1
        })
      
        this.setData({
            showDrawer:true,
            drawerTitle:item,
            computerData:data
        })
        
    },
    closeDrawer(){
        this.setData({
            showDrawer:false
        })
    },
    chooseProduct(e:any){
        let data = e.detail.product , item = e.detail.item , arr = this.data.arrangeMenu;

        arr.map((i:any)=>{
            if(i.name === item){
                i.hadChooseData = data
            }
        })

        //计算总价
        let price = 0
        arr.map((i:any)=>{
            if(i.hadChooseData){
                price += i.hadChooseData.price * i.hadChooseData.count
            }
        })
        
        //@ts-ignore
        price.toString().indexOf('.') === -1 ? price = price.toFixed(2) : null;

        let intP = price.toString().substring(0,price.toString().indexOf('.')) , floatP = price.toString().substring(price.toString().indexOf('.') + 1 ,price.toString().length)

        this.setData({
            arrangeMenu:arr,
            intPrice:Number(intP),
            floatPrice:floatP,
            isShowSettle:true,
            showDrawer:false
        })
    },
    //清空配置单
    clearConfigList(){
        let data = this.data.arrangeMenu
        data.map((item:any)=>{
            item.hadChooseData = null
        })
        this.setData({
            arrangeMenu:data,
            isShowSettle:false
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