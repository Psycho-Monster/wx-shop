import {
  request
} from "../../request/index.js";
Page({
  data: {
    order: [],
    // 记得修改成false
    isPayToOrderDetail:true,
  },
  async onLoad(options) {
    const {
      orderId,
      isPayToOrderDetail
    } = options
    console.log(options,'options')
    const order = await request({
      url: `order/orderDetail?orderId=${orderId}`,
    })
    if(isPayToOrderDetail==='true'){
      this.setData({
        isPayToOrderDetail:!!isPayToOrderDetail
      })
    }
    const {longitude,latitude}=await wx.getLocation({
      type: 'gcj02',
      isHighAccuracy:true
    })
    this.setData({
      order,
      longitude,
      latitude
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