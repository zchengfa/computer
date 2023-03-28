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
      scrollTop:<number>0,
      queryArr:<any[]>[],
      queryIndex:<number>0,
      touchDirection:<number>1,
      touchBeginY:<number>0,
      lastShow:<boolean>false,
      firstShow:<boolean>true,
      paddingTop:<number>0,
      distance:<number>0,
      isLongTouch:<boolean>false,
      timer:<number>0
    },
    /**
     * 组件的方法列表
     */
    methods: {
      
        backTop(){
            if(this.data.queryIndex !== 0){
                this.setData({
                    canScroll:true,
                    
                })  
               if(this.data.canScroll){
                   this.setData({
                       scrollTop:0
                   })
               }
               let arr = this.data.queryArr.slice(0,this.data.queryIndex)
               
               arr.map((item:any,index)=>{
                   this.animate('.'+item.dataset.el,[
                      { width: 0, opacity:0 },
                      { width: this.data.queryArr[index].dataset.width + '%', opacity:1 }   
                   ],300)
                   
               })
               let timer = setTimeout(()=>{
                   this.setData({
                       canScroll:false,
                       queryIndex:0
                   })
                   
                   clearTimeout(timer)
               },0)
            }
        },
       dragStart(e:any){
           
           this.setData({
               touchBeginY:e.changedTouches[0].pageY,
           })

           this.data.timer = setTimeout(() => {
               this.setData({
                   isLongTouch:true,
                   canScroll:true
               })
              
           }, 500);
          
       },
       dragEnd(e:any){
           clearTimeout(this.data.timer)
           this.setData({
               isLongTouch:false
           })
            if(this.data.touchBeginY < e.changedTouches[0].pageY){
                this.setData({
                    touchDirection:0,
                    canScroll:true
                })
            }
            else if(this.data.touchBeginY === e.changedTouches[0].pageY){
                return
            }
            else{
                this.setData({
                    touchDirection:1,
                    canScroll:true
                })
            }
            
          
            if(this.data.canScroll){
               
                if(Boolean(this.data.touchDirection)){
                   
                    if(!this.data.lastShow){
                        this.animate('.'+ this.data.queryArr[this.data.queryIndex].dataset.el,[
                            { width: this.data.queryArr[this.data.queryIndex].dataset.width + '%', opacity:1 },
                            { width: 0, opacity:0 }
                        ],300,function (this:any) {
                            this.setData({
                                scrollTop:(this.data.queryIndex + 1) * this.data.distance,
                                canScroll:false,
                                queryIndex: this.data.queryIndex + 1,
                                firstShow:false
                            })  
                            this.triggerEvent('changeScoreRatio',{'index':this.data.queryIndex,'direction':1}) 
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
                       if(this.data.queryIndex > 0){
                            this.setData({
                                scrollTop:(this.data.queryIndex - 1) * this.data.distance,
                                queryIndex:this.data.queryIndex - 1
                            })
                       }
                       this.triggerEvent('changeScoreRatio',{'index':this.data.queryIndex,'direction':0})
                       
                        this.animate('.'+ this.data.queryArr[this.data.queryIndex].dataset.el,[
                            { width: 0, opacity:0 },
                            { width: this.data.queryArr[this.data.queryIndex].dataset.width + '%', opacity:1 }
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
       scroll(e:any){
       
            if(this.data.isLongTouch){
            
                if(e.detail.deltaY < 0){
                    const query = wx.createSelectorQuery().in(this).select('.'+this.data.queryArr[this.data.queryIndex].dataset.el)
                    query.boundingClientRect((res:any)=>{
                        if(res.top <= 68){
                            if(this.properties.CPUData[this.data.queryIndex].canAnimate){
                            
                                this.animate('.'+ this.data.queryArr[this.data.queryIndex].dataset.el,[
                                    { width: this.data.queryArr[this.data.queryIndex].dataset.width + '%', opacity:1 },
                                    { width: 0, opacity:0 }
                                ],300,function (this:any) {
                                    this.setData({
                                        scrollTop:(this.data.queryIndex + 1) * this.data.distance,
                                        firstShow:false,
                                        queryIndex: this.data.queryIndex + 1
                                    }) 
                                    
                                }.bind(this))
                               
                                this.triggerEvent('changeAniStatus',{
                                    index:this.data.queryIndex,
                                    status:false
                                })  
                            } 
                           
                        }
                      
                    
                    }).exec()
                }
                else{
                   if(this.data.queryIndex > 0){
                        const query = wx.createSelectorQuery().in(this).select('.'+this.data.queryArr[this.data.queryIndex -1].dataset.el)
                        query.boundingClientRect((res:any)=>{
                            
                            if(res.bottom > 68){
                               
                                if(!this.properties.CPUData[this.data.queryIndex - 1].canAnimate){
                                
                                    this.animate('.'+ this.data.queryArr[this.data.queryIndex - 1].dataset.el,[
                                        { width: 0, opacity:0 },
                                        { width: this.data.queryArr[this.data.queryIndex].dataset.width + '%', opacity:1 }                                   
                                    ],300,function (this:any) {
                                        this.setData({
                                            scrollTop:(this.data.queryIndex - 1) * this.data.distance,
                                            lastShow:false,
                                            queryIndex:this.data.queryIndex - 1
                                        }) 
                                        
                                    }.bind(this))
                                
                                    this.triggerEvent('changeAniStatus',{
                                        index:this.data.queryIndex - 1,
                                        status:true
                                    })  
                                } 
                            }
                        }).exec()
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

