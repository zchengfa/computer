// componets/Drawer/Drawer.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        descriptionData:{
            type:Object,
            value:{}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        transition:<boolean>false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        close(){
            this.triggerEvent('closeDrawer')
        }
    },
    lifetimes:{
        ready(){
            this.setData({
                transition:true
            })
        }
    },
    
})
