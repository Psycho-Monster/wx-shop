// index.js
// 获取应用实例
import {
  request
} from "../../request/index.js";
const app = getApp()

Page({
  data: {
    shopList: [],
    foodText: '下午茶',
    foodImagePath: 'https://i.loli.net/2021/04/01/ajAx5LGOKmrhbR1.png'
  },
  // 事件处理函数
  search() {
    wx.navigateTo({
      url: '../search/index'
    })
  },
  enterDeliciousFood() {
    wx.navigateTo({
      url: '../deliciousFood/index'
    })
  },
  enterDessert() {
    wx.navigateTo({
      url: '../dessert/index'
    })
  },
  enterAfternoonTea() {
    wx.navigateTo({
      url: '../afternoonTea/index'
    })
  },
  enterHamburgerPizza() {
    wx.navigateTo({
      url: '../hamburgerPizza/index'
    })
  },
  enterFried() {
    wx.navigateTo({
      url: '../fried/index'
    })
  },
  enterForeign() {
    wx.navigateTo({
      url: '../foreignFood/index'
    })
  },
  enterLocal() {
    wx.navigateTo({
      url: '../local/index'
    })
  },
  enterFastFood() {
    wx.navigateTo({
      url: '../fastFood/index'
    })
  },
  enterShop(e) {
    const {
      shopid
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `../shop/index?shopId=${shopid}`
    })
  },

  async onLoad() {
    const shopList = await request({
      url: 'shops',
    })
    const d = new Date();
    const h = d.getHours()
    if (h >= 11 && h < 14) {
      this.setData({
        foodText: '午餐',
        foodImagePath: 'https://i.loli.net/2021/04/01/rXUE7kbjtcpgvTM.png'
      })
    } else if (h >= 14 && h < 17) {
      this.setData({
        foodText: '下午茶',
        foodImagePath: 'https://i.loli.net/2021/04/01/ajAx5LGOKmrhbR1.png'
      })
    } else if (h >= 17 && h < 21) {
      this.setData({
        foodText: '晚餐',
        foodImagePath: 'https://i.loli.net/2021/04/01/W9NeUVMGIagqJLF.png'
      })
    } else if (h >= 21 || h < 7) {
      this.setData({
        foodText: '夜宵',
        foodImagePath: 'https://i.loli.net/2021/04/01/TXes9gjcmL8pMtn.png'
      })
    } else if (h >= 7 && h < 11) {
      this.setData({
        foodText: '早餐',
        foodImagePath: 'https://i.loli.net/2021/04/01/TXes9gjcmL8pMtn.png'
      })
    }
    app.globalData.shopList = shopList
    this.setData({
      shopList
    })
  },
})