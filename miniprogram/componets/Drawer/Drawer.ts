// componets/Drawer/Drawer.ts
const computedBehavior = require('miniprogram-computed').behavior;
Component({
    behaviors:[computedBehavior],
    /**
     * 组件的属性列表
     */
    properties: {
        drawerData:{
            type:Object,
            value:{}
        },
        isDetail:{
            type:Boolean,
            value:true
        },
        drawerTitle:{
            type:String,
            value:'title'
        }
    },
    
    /**
     * 组件的初始数据
     */
    data: {
        transition:<boolean>false,
        productTypeSelected:<boolean>false,
        priceSelected:<boolean>false,
        productType:<any[]>[
            {
                "name":"全部商品",
                "isSelected":true
            }
        ],
        price:<any[]>[
            {
                "name":"默认排序",
                "isSelected":true
            },
            {
                "name":"价格由低到高",
                "isSelected":false
            },
            {
                "name":"价格由高到低",
                "isSelected":false
            }
        ]
    },
    computed: {
        productName(data){
            let obj = {}
            data.productType.map((item:any)=>{
                if(item.isSelected){
                    obj = item
                }
            })
            return obj
        },
        priceName(data){
            let obj = {}
            data.price.map((item:any)=>{
                if(item.isSelected){
                    obj = item
                }
            })
            
            return obj
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        close(){
           this.setData({
               transition:false
           })
           let timer = setTimeout(() => {
                this.triggerEvent('closeDrawer')
                clearTimeout(timer)
           }, 500);
        },
        showFilter(e:any){
            switch (e.currentTarget.dataset.type) {
                case 'productType':
                    if(!this.data.productTypeSelected){
                        this.setData({
                            productTypeSelected:true,
                            priceSelected:false
                        })
                    }
                    else{
                        this.setData({
                            productTypeSelected:false,
                            priceSelected:false
                        })
                    }
                    break;
                 case 'price':
                    if(!this.data.priceSelected){
                        this.setData({
                            priceSelected:true,
                            productTypeSelected:false
                        })
                    }
                    else{
                        this.setData({
                            priceSelected:false,
                            productTypeSelected:false
                        }) 
                    }
                    break;    
            }
        },
        selected(e:any){
            let name:string = e.currentTarget.dataset.name , type:string = e.currentTarget.dataset.type, data:any[] = [];
            name === 'productType'? data = this.data.productType : data = this.data.price
            data.map((item:any)=>{
                item.name === type ? item.isSelected = true : item.isSelected = false
            })

            if(name === 'productType'){
                this.setData({
                    productType:data,
                    productTypeSelected:false
                })
            }
            else{
                this.setData({
                    price:data,
                    priceSelected:false
                })
            }
           
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
