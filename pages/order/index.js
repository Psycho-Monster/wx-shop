import {
  request
} from "../../request/index.js";
Page({
  data: {
    orderList:[]
  },
  async onLoad() {
    let orderList = await request({
      url: 'order',
    })
    orderList.reverse()
    this.setData({
      orderList
    })
  },
  enterOrderDetail(e){
    const {orderid}=e.currentTarget.dataset
    wx.navigateTo({
      url: `../orderDetail/index?orderId=${orderid}`,
    })
  },
  evaluate(e){
    const {orderList}=this.data
    const {index}=e.currentTarget.dataset
    const {name}=orderList[index]
    const data={
      name,
      foodList:orderList[index].orderList
    }
    const orderInfo=JSON.stringify(data)
    wx.navigateTo({
      url: `../evaluate/index?orderInfo=${orderInfo}`,
    })
  }
})