// componets/brand.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        updateTime:{
            type:String,
            value:"YYYY-MM-dd"
        },
        btnArray:{
            type:Array,
            value:[
                {
                    name:"标题一",
                    btnColor:"#6685dc"
                },
                {
                    name:"标题二",
                    btnColor:"#e44c33"
                }
            ]
        },
        showLabel:{
            type:Boolean,
            value:true
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

    }
})
