// componets/LadderDiagram/LadderDiagram.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        CPUData:{
            type:Array,
            value:[]
           
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
       index:<number>0,
       isAni:<boolean>false
    },
    /**
     * 组件的方法列表
     */
    methods: {
        _animate(e:any){
        //    if(e.detail.scrollTop % 42 <= 2){
        //        this.data.index++
        //        let query = wx.createSelectorQuery().in(this).selectAll('.brand-box')
        //        query.boundingClientRect((res:any)=>{
        //            let arr = Array.from(res)
        //            //console.log(arr)
        //        }).exec()
        //     console.log(this.data.index)
        //    }
          
                
           
        }
    },
    ready(){
        let time:number = setTimeout(()=>{
           
            this.setData({
                isAni:true
            })
            clearTimeout(time)
            
        },0)
        
    },
    pageLifetimes:{
        show(){
           
        }
    }
})
