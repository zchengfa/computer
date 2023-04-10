import { computerData } from "../../common/json/staticData";

// componets/Drawer/Drawer.ts
const computedBehavior = require('miniprogram-computed').behavior;
type filter = {
    name:String,
    isSelected:Boolean
}
type comData = typeof computerData
function getObj (arr:any[]){
    let obj = {}
    arr.map((item:any)=>{
        if(item.isSelected){
            obj = item
        }
    })
    return obj
}
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
        },
        data:{
            type:Array,
            value:[]
        },
        currentItem:{
            type:String,
            value:''
        }
    },
    
    /**
     * 组件的初始数据
     */
    data: {
        showData:<comData[]>[],
        transition:<boolean>false,
        productTypeSelected:<boolean>false,
        priceSelected:<boolean>false,
        firstFilter:<string>'全部商品',
        secondFilter:<string>'默认排序',
        productType:<filter[]>[],
        price:<filter[]>[{"name":"默认排序","isSelected":true},{"name":"价格由低到高","isSelected":false},{"name":"价格由高到低","isSelected":false}
        ]
    },
    //@ts-ignore
    computed: {
        productName(data:any){
            return getObj(data.productType)
        },
        priceName(data:any){
            return getObj(data.price)
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
                default:
                    return      
            }
        },
        selected(e:any){
            let name:string = e.currentTarget.dataset.name , type:string = e.currentTarget.dataset.type, data:filter[] = [] , firstF:string = this.data.firstFilter , secondF:string = this.data.secondFilter;
            name === 'productType'? data = this.data.productType : data = this.data.price
            data.map((item:any)=>{
                item.name === type ? item.isSelected = true : item.isSelected = false
            })
            //关闭筛选盒子
            this.setData({
                productTypeSelected:false,
                priceSelected:false,
            })
            //品牌筛选，并且选择的筛选条件跟之前不一样
            if(name === 'productType' && firstF !== type){
                this.setData({
                    productType:data,
                    firstFilter:type
                }) 
            }
            //价格筛选，并且选择的筛选条件跟之前不一样
            else if(name === 'price' && secondF !== type){
                this.setData({
                    price:data,
                    secondFilter:type
                })
            } 
            //执行数据筛选程序 
            ((name === 'productType' && firstF !== type) || (name === 'price' && secondF !== type) ) ? this.setData({showData:this.filter(this.properties.data,this.data.firstFilter,this.data.secondFilter)}) : null 
            
        },
        filter(data:comData[] ,confidentFirst:string = '全部商品',confidentLast:string = '默认排序'){
            //先通过第一个条件筛选一遍数据，再用第二个条件筛选得到最终筛选结果
            let arr:comData[] = []  , copyData = JSON.parse(JSON.stringify(data)) , condition = (confidentFirst === '全部商品' && confidentLast === '默认排序') , conditionTwo = (confidentFirst === '全部商品' && confidentLast !== '默认排序');

            condition ? arr = data : arr = data.filter((item:any)=> item.brand === confidentFirst);
            condition ? arr = copyData : sortArray(confidentLast);
            
            if(conditionTwo){
                arr = copyData
                sortArray(confidentLast)
            }

            function sortArray(confident:string){
                let copyArr:any[] = JSON.parse(JSON.stringify(arr))
                confident === '价格由低到高' ? copyArr.sort((a,b)=> a.price - b.price) : copyArr.sort((a,b)=> b.price - a.price)
                arr = copyArr
            }
            return arr
        },
        //数量操作 
        operateCount(e:any){
            this.setData({
                showData:this.alterCount(e.currentTarget.dataset.index,e.currentTarget.dataset.operation,this.data.showData)
            })
        },
        alterCount(index:number,type:number,data:comData[]){
            let arr:comData[] = data
            arr.map((item:any,i:number)=>{
                if(Number(type) && index === i){
                    item.count ++
                }
                else if(!Number(type) && index === i){
                    item.count --
                }
            })

            return arr
        },
        //选择产品
        choose(e:any){
            let item:string = e.currentTarget.dataset.item , index:number = e.currentTarget.dataset.index
            this.data.showData.map((dataItem:any,dataIndex:number)=>{
                if(dataIndex === index){
                    //向父组件发送事件，父组件保存用户选择的产品
                    this.triggerEvent("chooseProduct",{
                        product:{
                            "brand":dataItem.brand,
                            "count":dataItem.count,
                            "price":dataItem.price,
                            "text":dataItem.desc,
                            "title":dataItem.text
                        },
                        item
                    })
                }
            })
            //console.log(item,index)
        }
    },
    lifetimes:{
        ready(){
            /**
             * @param data 父组件传过来的所有对应的那一类产品数据
             * @param filterData 修饰后的品牌数据
             * @param brandArr 品牌数据
             */
            let data:comData[] = this.properties.data , filterData:filter[] = this.data.productType , brandArr:string[] = ['全部商品']
            data.map((item:any)=>{
                if(brandArr.indexOf(item.brand) === -1){
                    brandArr.push(item.brand)
                }
            })

            brandArr.map((item:any,index)=>{
               if(index === 0){
                    filterData.push({
                        "name":item,
                        "isSelected":true
                    })
               }
               else{
                    filterData.push({
                        "name":item,
                        "isSelected":false
                    })
               }
            })
            this.setData({
                transition:true,
                showData:data,
                productType:filterData
            })
            
        }
    },
    
})
