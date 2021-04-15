// pages/evaluate/index.js
Page({
  data: {
    orderInfo:{},
    isAnonymous:false
  },
  onLoad: function (options) {
    const orderInfo=JSON.parse(options.orderInfo)
    this.setData({
      orderInfo
    })
  },
  changeAnonymousStatus() {
    const isAnonymous = this.data.isAnonymous ? false : true
    this.setData({
      isAnonymous
    })
  },
})