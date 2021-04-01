const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deliciousShopList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const deliciousShopList=app.globalData.shopList.filter(shop=>shop.isDessert)
    this.setData({
      deliciousShopList
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
})