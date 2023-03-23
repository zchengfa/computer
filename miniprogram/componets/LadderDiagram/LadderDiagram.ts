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
      canScroll:<boolean>false,
      begintimestamp:<number>0,
      endtimestamp:<number>0,
      scrollTop:<number>0,
      queryArr:<any[]>[],
      queryIndex:<number>0,
      touchDirection:<number>1,
      touchBeginY:<number>0,
      lastShow:<boolean>false,
      firstShow:<boolean>true,
      paddingTop:<number>0,
      distance:<number>0
    },
    /**
     * 组件的方法列表
     */
    methods: {
       dragStart(e:any){
           //console.log(e)
          
           this.setData({
               touchBeginY:e.changedTouches[0].pageY,
               begintimestamp:this.getTimestamp()
           })
          
       },
       dragEnd(e:any){
           //console.log(e)
            if(this.data.touchBeginY < e.changedTouches[0].pageY){
                this.setData({
                    touchDirection:0
                })
            }
            else{
                this.setData({
                    touchDirection:1
                })
            }
            this.setData({
                endtimestamp:this.getTimestamp(),
               
            })
            this.setData({
                canScroll:true
            })
            if(this.data.canScroll){
               
                if(Boolean(this.data.touchDirection)){
                   
                    if(!this.data.lastShow){
                        this.animate('.'+ this.data.queryArr[this.data.queryIndex].dataset.el,[
                            { width: this.data.queryArr[this.data.queryIndex] + '%', opacity:1 },
                            { width: 0, opacity:0 }
                        ],300,function (this:any) {
                            this.setData({
                                scrollTop:(this.data.queryIndex + 1) * this.data.distance,
                                canScroll:false,
                                queryIndex: this.data.queryIndex + 1,
                                firstShow:false
                            })   
                        }.bind(this))
                       
                    }
                    else{
                        this.setData({
                            scrollTop:(this.data.queryIndex * this.data.distance) + this.data.paddingTop,
                            canScroll:false,
                            firstShow:false
                        })   
                    }
                    //监听可视区域的元素，看最后一个是否出现在可视区
                    const observer = wx.createIntersectionObserver(this,{
                        thresholds:[.8],
                        observeAll:true
                    })

                    observer.relativeTo('.scroll').observe('.brand-box',(res:any)=>{
                        if(res.dataset.el === this.data.queryArr[this.data.queryArr.length - 1].dataset.el){
                            this.setData({
                                lastShow:true
                            })
                        }
                    })
                   
                }
                else{
                    if(!this.data.firstShow){
                        this.setData({
                            scrollTop:(this.data.queryIndex - 1) * this.data.distance,
                            queryIndex:this.data.queryIndex - 1
                        })
                        this.animate('.'+ this.data.queryArr[this.data.queryIndex].dataset.el,[
                            { width: 0, opacity:0 },
                            { width: this.data.queryArr[this.data.queryIndex] + '%', opacity:1 }
                        ],300,function (this:any) {
                            this.setData({
                                lastShow:false,
                                canScroll:false
                            })   
                        }.bind(this))
                       
                    }
                    else{
                        this.setData({
                            canScroll:false,
                            queryIndex:0,
                            lastShow:false
                        })
                    }
                    if(this.data.queryIndex === 0){
                        this.setData({
                            firstShow:true
                        })
                    }
                }
               
            }
            
       },
       getTimestamp(){
           return new Date().getTime()
       }
        
    },
    pageLifetimes:{
        show(){
            //获取scroll-view中子盒子的信息
            const query = wx.createSelectorQuery().in(this).selectAll('.brand-box')
            query.boundingClientRect((res:any)=>{
               
                this.setData({
                    queryArr:Array.from(res)
                })
                this.setData({
                    distance:this.data.queryArr[1].top - this.data.queryArr[0].top,
                    paddingTop:this.data.queryArr[1].top - this.data.queryArr[0].top - this.data.queryArr[0].height
                })
            
            }).exec()

           
        }
    }
})

