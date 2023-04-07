// pages/indexDetail/desktopCPU.ts
import { desktop_cpu , desktop_Gpu , notebook_cpu , phone_cpu} from '../../common/json/staticData'
type btn ={
    name:string,
    btnColor:string
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        rankData:<rankArr[]>[],
        allData:<rankArr[]>[],
        leftBgColor:<string>'linear-gradient(to right, #446fe4 , #0e54a5)',
        rightBgColor:<string>'linear-gradient(to right, #b62b15 , #ca6b5c)',
        showLabel:<boolean>true,
        btnArray:<btn[]>[{"name":"intel","btnColor":"#6685dc"},{"name":"AMD","btnColor":"#e44c33"}],
        showDrawer:<boolean>false,
        dataNumber:<number>20,
        loadCount:<number>0,
        hadMore:<boolean>true
    },
    alterData:function(index:number = 0) {
       
        let _cpuData:rankArr[] = JSON.parse(JSON.stringify(this.data.rankData))
        let maxScore:number = 0
        maxScore = _cpuData[index]['score']

        _cpuData.map((item:any,itemIndex:number)=>{
            
            itemIndex >= index ? item.progress = Math.floor((item.score/maxScore)*96) : null
            item.canAnimate = true 
            item.rank = itemIndex + 1
           
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
        this.alterData(e.detail.index)
       
    },
    backStatus(e:any){
        this.alterData()
        
        let arr:any[] = [...e.detail.queryArr] 
        arr.map((item:any,itemIndex:number)=>{
            let child = this.selectComponent('#ladder-diagram')
           
            child.animate('.'+item.dataset.el,[
                { width: 0, opacity:0 },
                { width: this.data.rankData[itemIndex].progress + '%', opacity:1 }  
            ],300,function(){
                child.clearAnimation('.'+ arr[itemIndex].dataset.el)
            })
           
        })
    },
    description(){
        this.setData({
            showDrawer:true
        })
    },
    closeDrawer(){
        this.setData({
            showDrawer:false
        })
    },
    loadMore(e:any){
        
        if(this.data.rankData.length !== this.data.allData.length){
            this.data.loadCount ++ 
        
            let arr:any[] = this.data.rankData , allArr:any[] = JSON.parse(JSON.stringify(this.data.allData))
            arr.push(...allArr.splice(e.detail.lastIndex , this.data.dataNumber))
           
            this.setData({
                rankData:arr,
                hadMore:true
            })
            this.alterData(this.data.dataNumber * this.data.loadCount)
        }
        else{
            this.setData({
                hadMore:false
            })
        }
       let timer = setTimeout(()=>{
            wx.hideLoading()
            clearTimeout(timer)
       },500)
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      
       switch (options.type) {
           case 'desktop_cpu':
               this.setData({
                   allData:desktop_cpu,
               })
               break;
           case 'desktop_Gpu':
               this.setData({
                   allData:desktop_Gpu,
                   leftBgColor: 'linear-gradient(to right, #09884d, #198444, #22803b, #297b31, #2f7728, #307724, #307720, #31771c, #2d7b1d, #287f1e, #22841f, #198820)',  
                   btnArray:[{"name":"NVIDIA","btnColor":"#29a632"},{"name":"AMD","btnColor":"#ca6b5c"}]
               })
               break;
           case 'notebook_cpu':
               this.setData({
                   allData:notebook_cpu,
               })
               break;  
           case 'phone_cpu':
               this.setData({
                   allData:phone_cpu,
                   showLabel:false
               })
               break;
           case 'phone_Gpu':
               this.setData({
                   allData:phone_cpu,
                   showLabel:false
               })
               break;             
           default:
               return   
       }

       //首次只显示15条数据
       this.setData({
            rankData:this.data.allData.slice(0,this.data.dataNumber)
       }) 
    
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