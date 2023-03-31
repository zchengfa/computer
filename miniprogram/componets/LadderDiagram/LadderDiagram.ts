// componets/LadderDiagram/LadderDiagram.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        rankData:{
            type:Array,
            value:[]   
        },
        leftBgColor:{
            type:String,
            value:''
        },
        rightBgColor:{
            type:String,
            value:''
        },
        multiColor:{
            type:Object,
            value:{}
        },
        backTopThreshold:{
            type:Number,
            value:200
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
      timer:<number>0,
      brandNumber:<number>2,
      multiBrandBgColor:<any>{},
      animationThreshold:<number>0
    },
    /**
     * 组件的方法列表
     */
    methods: {
        textDescription(){
            this.triggerEvent('description')
        },
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
                   this.triggerEvent('backStatus')
                  
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
            //只触摸不移动，或者移动不超过40就不做任何操作
            else if(this.data.touchBeginY === e.changedTouches[0].pageY || Math.abs(e.changedTouches[0].pageY - this.data.touchBeginY) < 40){
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
                        if(res.top <= this.data.animationThreshold){
                            if(this.properties.rankData[this.data.queryIndex].canAnimate){
                            
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
                            
                            if(res.bottom > this.data.animationThreshold){
                               
                                if(!this.properties.rankData[this.data.queryIndex - 1].canAnimate){
                                
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
       getBoxInfo(){
           //scroll元素距离顶部的距离，用作动画触发的阈值
           const scrollQ = wx.createSelectorQuery().in(this).select('.scroll')
           scrollQ.boundingClientRect((res:any)=>{
               this.setData({
                   animationThreshold:res.top + 1
               })
           }).exec()

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

           //获取数据中的品牌数
           let brandArr:String[] = []
           this.data.rankData.map((item:any)=>{
               brandArr.indexOf(item.brand) === -1 ? brandArr.push(item.brand) : null
           })
           this.setData({
               brandNumber:brandArr.length
           })

           //为盒子设置多种默认背景色
           let defaultColor:string[] = [
               'linear-gradient(to right, #191718, #201d1f, #262327, #2c2a2f, #313138, #34363d, #363b42, #394046, #3b4348, #3e474a, #414a4b, #454d4d)',
               'linear-gradient(to right, #920e36, #8e1034, #8b1231, #87142f, #84152d, #87182f, #8a1a30, #8d1d32, #982238, #a2273e, #ad2c45, #b8314b)',
               'linear-gradient(to right, #a84b16, #ac5217, #b05a17, #b36119, #b7681a, #b86d1c, #b8711e, #b97620, #b77922, #b57d25, #b48028, #b2832b)',
               'linear-gradient(to right, #0a2b77, #042c84, #022d91, #042d9e, #0d2cab, #0837b5, #0342be, #004dc7, #0061c9, #0072c5, #007fbc, #2b8bb2)',
               'linear-gradient(to right, #55085d, #5f0a6a, #690d77, #731085, #7d1393, #83189c, #891ca6, #8f21af, #9227b5, #962dba, #9933c0, #9c38c6)'
            ]
            , brandColor:any = {}
           if(this.data.brandNumber > 2 && Object.keys(this.properties.multiColor).length !== brandArr.length){
                brandArr.map((item:any,index:number)=>{
                    //默认颜色不够，则会生成随机颜色
                    defaultColor[index] ? brandColor[item] = defaultColor[index] : brandColor[item] = 'rgba(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 1 + ')'
                })
           }
           this.setData({
               multiBrandBgColor:brandColor
           })
           
           
       }
        
    },
    pageLifetimes:{
        show(){
            this.getBoxInfo()

           
        }
    }
})

