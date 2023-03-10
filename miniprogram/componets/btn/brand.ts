// componets/brand.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        updateTime:{
            type:String,
            value:"2023-03-10"
        },
        btnArray:{
            type:Array,
            value:[
                {
                    name:"intel",
                    btnColor:"#6685dc"
                },
                {
                    name:"AMD",
                    btnColor:"#e44c33"
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

    }
})
