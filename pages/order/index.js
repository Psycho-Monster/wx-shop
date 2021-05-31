import {
  request
} from "../../request/index.js";
Page({
  data: {
    orderList: []
  },
  async onLoad() {
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
      foodId
    } = orderList[index]
    console.log(foodId, 'foodId')
    const data = {
      name,
      foodList: orderList[index].orderList,
      foodId
    }
    const orderInfo = JSON.stringify(data)
    wx.navigateTo({
      url: `../evaluate/index?orderInfo=${orderInfo}`,
    })
  }
})