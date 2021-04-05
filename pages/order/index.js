import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const orderList = await request({
      url: 'order',
    })
    this.setData({
      orderList
    })
  },
  enterOrderDetail(){
    wx.navigateTo({
      url: '../orderDetail/index',
    })
  }
})