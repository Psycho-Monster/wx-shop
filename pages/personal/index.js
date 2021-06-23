// index.js
// 获取应用实例
Page({
  data: {
    userInfo:{},
    logoutPopUpShow:false
  },
  onShow() {
    const userInfo=wx.getStorageSync('userInfo')?wx.getStorageSync('userInfo'):{}
    this.setData({
      userInfo
    })
  },
  async getUserProfile() {
    const {userInfo}=await wx.getUserProfile({
      desc: '展示用户信息'
    })
    wx.setStorageSync('userInfo', userInfo)
    this.setData({
      userInfo
    })
  },
  goRules(){
    wx.navigateTo({
      url: '../rules/index',
    })
  },
  goLikeShopList(){
    wx.navigateTo({
      url: '../like/index',
    })
  },
  showLogoutPopup(){
    this.setData({
      logoutPopUpShow:true
    })
  },
  logout(){
    wx.clearStorageSync('userInfo')
    wx.switchTab({
      url: '../index/index',
    })
    this.setData({
      logoutPopUpShow:false
    })
  },
  cancelLogout(){
    this.setData({
      logoutPopUpShow:false
    })
  }
})
