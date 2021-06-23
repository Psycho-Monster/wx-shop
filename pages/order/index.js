import {
  request
} from "../../request/index.js";
Page({
  data: {
    orderList: []
  },
  async onShow() {
    const orderList = await request({
      url: 'order/allOrders',
    })
    orderList.reverse()
    this.setData({
      orderList
    })
  },
  enterOrderDetail(e) {
    const {
      orderid
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `../orderDetail/index?orderId=${orderid}`,
    })
  },
  evaluate(e) {
    const {
      orderList
    } = this.data
    const {
      index
    } = e.currentTarget.dataset
    const {
      name,
      foodId,
      _id
    } = orderList[index]
    const data = {
      name,
      foodList: orderList[index].orderList,
      foodId,
      orderId: _id
    }
    const orderInfo = JSON.stringify(data)
    wx.navigateTo({
      url: `../evaluate/index?orderInfo=${orderInfo}`,
    })
  }
})