Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#d81e06",
    list: [
        {
          "pagePath": "/pages/index/index",
          "iconPath": "/images/tabbar/icon_rank.png",
          "selectedIconPath": "/images/tabbar/icon_rank_sel.png",
          "text": "天梯"
        },
        {
          "pagePath": "/pages/arrange/arrange",
          "iconPath": "/images/tabbar/icon_arrange.png",
          "selectedIconPath": "/images/tabbar/icon_arrange_sel.png",
          "text": "搭配"
        }
      ]
  },
  attached() {
  },
  methods: {
      //@ts-ignore
    switchTab(e) {
      
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(url)
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})