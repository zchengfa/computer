/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

interface rankMenu {
  readonly  iconPath:String,
  readonly  text:String,
            detailPath?:String,
            type:String
}

interface rankArr {
    brand:String,
    text:String,
    rank:number,
    score:number,
    progress?:number,
    canAnimate?:boolean,
    detail?:Detail | undefined
}

interface Detail {
    frequency:String,
    core_thread:String,
    technology:String,
    Core_graphics:String,
    power:String,
    slot:String,
    cache:String,
    rank?:Number,
    text?:String
}