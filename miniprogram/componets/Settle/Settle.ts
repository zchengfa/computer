// componets/Settle/Settle.ts

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tip:{
            type:String,
            value:''
        },
        intPrice:{
            type:Number,
            value:0
        },
        floatPrice:{
            type:String,
            value:'00'
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
        clear(){
            this.triggerEvent('clearConfigList')
        }
    },
})
