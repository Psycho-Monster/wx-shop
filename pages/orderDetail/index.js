import {
  request
} from "../../request/index.js";
Page({
  data: {
    order: []
  },
  async onLoad(options) {
    const {
      orderId
    } = options
    const order = await request({
      url: `order/orderDetail?orderId=${orderId}`,
    })
    this.setData({
      order
    })
  },
  copy(e) {
    const {
      copytext
    } = e.currentTarget.dataset
    wx.setClipboardData({
      data: copytext
    })
  }
})