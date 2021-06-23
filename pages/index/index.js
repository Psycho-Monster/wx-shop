// index.js
// 获取应用实例
import {
  request
} from "../../request/index.js";
const app = getApp()

Page({
  data: {
    shopList: [],
    foodText: '下午茶',
    foodImagePath: 'https://i.loli.net/2021/04/01/ajAx5LGOKmrhbR1.png',
    pageNo: 2,
    pageSize: 5,
    location: '宝安区创业一路(深圳市宝安区政府)',
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 500,
    isLogin: false,
    shopFilterArr: [{
        text: '津贴优惠',
        isActive: false
      },
      {
        text: '满减优惠',
        isActive: false
      },
      {
        text: '下单返红包',
        isActive: false
      },
      {
        text: '进店领红包',
        isActive: false
      },
    ]
  },
  // 事件处理函数
  search() {
    wx.navigateTo({
      url: '../search/index'
    })
  },
  enterDeliciousFood() {
    wx.navigateTo({
      url: '../deliciousFood/index'
    })
  },
  enterDessert() {
    wx.navigateTo({
      url: '../dessert/index'
    })
  },
  enterAfternoonTea() {
    wx.navigateTo({
      url: '../afternoonTea/index'
    })
  },
  enterHamburgerPizza() {
    wx.navigateTo({
      url: '../hamburgerPizza/index'
    })
  },
  enterFried() {
    wx.navigateTo({
      url: '../fried/index'
    })
  },
  enterForeign() {
    wx.navigateTo({
      url: '../foreignFood/index'
    })
  },
  enterLocal() {
    wx.navigateTo({
      url: '../local/index'
    })
  },
  enterFastFood() {
    wx.navigateTo({
      url: '../fastFood/index'
    })
  },
  enterShop(e) {
    const {
      shopid
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `../shop/index?shopId=${shopid}`
    })
  },
  async getShopList() {
    const {
      docs
    } = await request({
      url: 'shops',
    })
    const filterShops = docs.filter(item => item.shopStatus)
    const shopList = await request({
      url: 'shops/allShops',
    })
    app.globalData.shopList = shopList
    this.setData({
      shopList: filterShops
    })
  },
  onLoad() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        isLogin: true
      })
    }
    this.timeToFood()
    this.getShopList()
  },
  // 早上显示早餐，中午显示午餐，下午显示下午茶，晚上显示晚餐，半夜显示夜宵
  timeToFood() {
    const d = new Date();
    const h = d.getHours()
    if (h >= 11 && h < 14) {
      this.setData({
        foodText: '午餐',
        foodImagePath: 'https://i.loli.net/2021/04/01/rXUE7kbjtcpgvTM.png'
      })
    } else if (h >= 14 && h < 17) {
      this.setData({
        foodText: '下午茶',
        foodImagePath: 'https://i.loli.net/2021/04/01/ajAx5LGOKmrhbR1.png'
      })
    } else if (h >= 17 && h < 21) {
      this.setData({
        foodText: '晚餐',
        foodImagePath: 'https://i.loli.net/2021/04/01/W9NeUVMGIagqJLF.png'
      })
    } else if (h >= 21 || h < 7) {
      this.setData({
        foodText: '夜宵',
        foodImagePath: 'https://i.loli.net/2021/04/01/TXes9gjcmL8pMtn.png'
      })
    } else if (h >= 7 && h < 11) {
      this.setData({
        foodText: '早餐',
        foodImagePath: 'https://i.loli.net/2021/04/01/TXes9gjcmL8pMtn.png'
      })
    }
  },
  async onReachBottom() {
    let {
      pageNo,
      pageSize,
      shopList
    } = this.data
    const {
      docs
    } = await request({
      url: `shops?pageNo=${pageNo}&pageSize=${pageSize}`,
    })
    const filterShops = docs.filter(item => item.shopStatus)
    this.setData({
      shopList: shopList.concat(filterShops),
      pageNo: ++pageNo
    })
  },
  async chooseLocation() {
    const {
      latitude,
      longitude
    } = await wx.getLocation({
      isHighAccuracy: true,
      type: 'gcj02',
    })
    const {
      name
    } = await wx.chooseLocation({
      latitude,
      longitude
    })
    this.setData({
      location: name
    })
  },
  async login() {
    const {
      userInfo
    } = await wx.getUserProfile({
      desc: '展示用户信息'
    })
    wx.setStorageSync('userInfo', userInfo)
    this.setData({
      isLogin: true
    })
  },
  ignoreShop(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      shopList,
    } = this.data
    shopList[index].isShopDislike = true
    this.setData({
      shopList
    })
  },
  cancelOverlay(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      shopList
    } = this.data
    shopList[index].isShopDislike = false
    this.setData({
      shopList
    })
  },
  dislikeShop(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      shopList
    } = this.data
    shopList.splice(index, 1)
    this.setData({
      shopList
    })
    wx.showToast({
      title: '将会减少该店铺在你首页显示的概率',
      icon: 'none'
    })
  },
  filterShop(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      shopFilterArr
    } = this.data
    shopFilterArr[index].isActive = !shopFilterArr[index].isActive
    wx.showLoading({
      title: '筛选中',
    })
    setTimeout(() => {
      wx.hideLoading()
      this.setData({
        shopFilterArr
      })
    }, 1000);
  }
})