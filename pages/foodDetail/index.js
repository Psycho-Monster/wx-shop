Page({
  data: {
    food:{}
  },
  onLoad: function (options) {
    this.setData({
      food:JSON.parse(options.food)
    })
  },
  goBack(){
    wx.navigateBack()
  }
})