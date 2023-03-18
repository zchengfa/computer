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
            detailPath?:String
}

interface cpuArr {
    brand:String,
    text:String,
    rank:number,
    score:number,
    progress?:number
}