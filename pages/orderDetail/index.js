import {
  request
} from "../../request/index.js";
Page({
  data: {
    order: [],
    // 记得修改成false
    isPayToOrderDetail: true,
  },
  async onLoad(options) {
    const {
      orderId,
      isPayToOrderDetail
    } = options
    const order = await request({
      url: `order/orderDetail?orderId=${orderId}`,
    })
    if (isPayToOrderDetail === 'true') {
      this.setData({
        isPayToOrderDetail: !!isPayToOrderDetail
      })
    }
    this.setData({
      order,
      markers: [{
        latitude: order.latitude,
        longitude: order.longitude,
        iconPath: order.imagePath,
        width: 30,
        height: 30,
        callout: {
          content: '商家正在备货',
          color: '#424242',
          fontSize: 16,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#f4f2eb',
          padding: 13,
          display: 'ALWAYS'
        }
      }]
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