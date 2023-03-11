// componets/LadderDiagram/LadderDiagram.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        CPUData:{
            type:Array,
            value:[
                {
                    brand:"AMD",
                    text:"锐龙线程撕裂者PRO 5995WX",
                    rank:1
                },
                {
                    brand:"intel",
                    text:"至强W9-3495X",
                    rank:2
                },
                {
                    brand:"intel",
                    text:"至强W9-3475X",
                    rank:3
                },{
                    brand:"AMD",
                    text:"锐龙线程撕裂者PRO 5975WX",
                    rank:4
                },
                {
                    brand:"intel",
                    text:"至强W7-3475X",
                    rank:5
                },
                {
                    brand:"AMD",
                    text:"锐龙线程撕裂者PRO 5965WX",
                    rank:6
                },
                {
                    brand:"intel",
                    text:"至强W7-3465",
                    rank:7
                },
                {
                    brand:"AMD",
                    text:"锐龙9 7950X3D （游戏）",
                    rank:8
                },
                {
                    brand:"intel",
                    text:"i9 13900KS",
                    rank:9
                },
                {
                    brand:"AMD",
                    text:"线程撕裂者 3990X",
                    rank:10
                },
                {
                    brand:"intel",
                    text:"i9 13900K/KF",
                    rank:11
                },
                {
                    brand:"AMD",
                    text:"锐龙9 7950X",
                    rank:12
                },
                {
                    brand:"AMD",
                    text:"锐龙9 7900X3D （游戏）",
                    rank:13
                },
                {
                    brand:"AMD",
                    text:"锐龙线程撕裂者PRO 5955WX",
                    rank:14
                },
                {
                    brand:"AMD",
                    text:"锐龙9 7900X",
                    rank:15
                },
                {
                    brand:"intel",
                    text:"i7 13700K/KF",
                    rank:16
                },
                {
                    brand:"AMD",
                    text:"锐龙9 7900",
                    rank:17
                },
                {
                    brand:"AMD",
                    text:"锐龙线程撕裂者PRO 5945WX",
                    rank:18
                },
                {
                    brand:"AMD",
                    text:"锐龙线程撕裂者PRO 5995WX",
                    rank:1
                },
                {
                    brand:"intel",
                    text:"至强W9-3495X",
                    rank:2
                },
                {
                    brand:"intel",
                    text:"至强W9-3475X",
                    rank:3
                },{
                    brand:"AMD",
                    text:"锐龙线程撕裂者PRO 5975WX",
                    rank:4
                },
                {
                    brand:"intel",
                    text:"至强W7-3475X",
                    rank:5
                },
                {
                    brand:"AMD",
                    text:"锐龙线程撕裂者PRO 5965WX",
                    rank:6
                },
                {
                    brand:"intel",
                    text:"至强W7-3465",
                    rank:7
                },
                {
                    brand:"AMD",
                    text:"锐龙9 7950X3D （游戏）",
                    rank:8
                },
                {
                    brand:"intel",
                    text:"i9 13900KS",
                    rank:9
                },
                {
                    brand:"AMD",
                    text:"线程撕裂者 3990X",
                    rank:10
                },
                {
                    brand:"intel",
                    text:"i9 13900K/KF",
                    rank:11
                },
                {
                    brand:"AMD",
                    text:"锐龙9 7950X",
                    rank:12
                },
                {
                    brand:"AMD",
                    text:"锐龙9 7900X3D （游戏）",
                    rank:13
                },
                {
                    brand:"AMD",
                    text:"锐龙线程撕裂者PRO 5955WX",
                    rank:14
                },
                {
                    brand:"AMD",
                    text:"锐龙9 7900X",
                    rank:15
                },
                {
                    brand:"intel",
                    text:"i7 13700K/KF",
                    rank:16
                },
                {
                    brand:"AMD",
                    text:"锐龙9 7900",
                    rank:17
                },
                {
                    brand:"AMD",
                    text:"锐龙线程撕裂者PRO 5945WX",
                    rank:18
                }
            ],
           
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
       index:<number>0
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
        let query = wx.createSelectorQuery().in(this).selectAll('.brand-box')
               query.boundingClientRect((res:any)=>{
                   let arr = Array.from(res)
                   //console.log(arr)
                   arr.map((item,index)=>{
                       //console.log(item.dataset.el,index)
                        this._observer = wx.createIntersectionObserver(this,{observeAll:true})
                        this._observer.relativeTo('.scroll').observe('.brand-box-'+index, (res) => {

                            //console.log(res);
                            if(res.intersectionRatio <= 0){
                                console.log(res.dataset.el);
                                // this.animate('.'+res.dataset.el, [{
                                   
                                //     width: '80%',
                                //   }, {
                                   
                                //     width: '0',
                                //   }], 1000, {
                                //     scrollSource: '.scroll',
                                //     timeRange: 2000,
                                //     startScrollOffset: 120,
                                //     endScrollOffset: 252
                                //   })
                            }
                        })
                   })
               }).exec()
        // this._observer = wx.createIntersectionObserver(this,{observeAll:true})
        // this._observer
        //   .relativeTo('.scroll')
        //   .observe('.AMD-text-0', (res) => {

        //     //console.log(res);
        //    if(res.intersectionRatio <= 0){
        //     console.log(res);
        //    }
        //   })
        
    },
    pageLifetimes:{
        show(){
           
        }
    }
})
