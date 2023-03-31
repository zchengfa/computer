// componets/Settle/Settle.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tip:{
            type:String,
            value:''
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
            console.log('清空配置单')
        }
    }
})
