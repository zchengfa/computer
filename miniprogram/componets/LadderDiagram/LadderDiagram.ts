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
                }
            ]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        _animate(){
            wx.createSelectorQuery().select('#scroller').fields({
                scrollOffset: true,
                size: true,
              }, (res) => {
                  console.log(res)
                  this.animate('.AMD-text', [{
                    width:"80%",
                    offset: 0,
                  }, {
                    width:"70%",
                    offset: .5,
                  }, {
                    width:"46%",
                    offset: 1
                  }], 2000, {
                    scrollSource: '#scroller',
                    timeRange: 2000,
                    startScrollOffset: 0,
                    endScrollOffset: 85,
                  })

                  this.animate('.intel-text', [{
                    width:"80%",
                    offset: 0,
                  }, {
                    width:"70%",
                    offset: .5,
                  }, {
                    width:"46%",
                    offset: 1
                  }], 2000, {
                    scrollSource: '#scroller',
                    timeRange: 2000,
                    startScrollOffset: 0,
                    endScrollOffset: 85,
                  })
              }).exec()
        }
    },
    ready(){
       this._animate()     
    },
    pageLifetimes:{
        show(){
    
        },
       
    }
})
