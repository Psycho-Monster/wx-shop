// pages/shop/index.js
import {
  request
} from "../../request/index.js";
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    shopInfo: {},
    leftList: [],
    // app.globalData.foodList
    foodList: [],
    scrollHeightArr: [],
    scrollTop: 0,
    isOnlyShowContent: true,
    cartList: [],
    totalPrice: 0,
    totalLength: 0,
    isChooseNecessity: false,
    shopStory: {},
    evaluationInfo: {},
    shopList: app.globalData.shopList,
    isLike: false,
    isShopHasNecessity: false
  },
  likeShop() {
    const {
      shopId
    } = this.data.shopInfo
    const {
      isLike
    } = this.data
    const likeShop = this.data.shopList.find(item => item._id == shopId)
    const likeShopList = wx.getStorageSync('likeShopList') || []
    if (isLike) {
      // 代表该店铺已经收藏过了，现在要取消收藏
      let searchIndex
      likeShopList.forEach((item, index) => {
        if (item._id == shopId) {
          searchIndex = index
        }
      })
      likeShopList.splice(searchIndex, 1)
      wx.setStorageSync('likeShopList', likeShopList)
      this.setData({
        isLike: false
      })
    } else {
      likeShopList.push(likeShop)
      this.setData({
        isLike: true
      })
      wx.setStorageSync('likeShopList', likeShopList)
    }
  },
  async getFoodList(shopId) {
    const shopInfo = await request({
      url: `foods?shopId=${shopId}`,
    })
    const {
      leftList,
      foodList,
      shopStory,
      evaluationInfo
    } = shopInfo
    app.globalData.foodList = foodList
    let isShopHasNecessityFlag = false
    for (let i = 0; i < foodList.length; i++) {
      const item = foodList[i];
      for (let j = 0; j < item.foods.length; j++) {
        const food = item.foods[j];
        if (food.necessary) {
          isShopHasNecessityFlag = true
          break
        }
      }
      if (isShopHasNecessityFlag) {
        break
      }
    }
    if (isShopHasNecessityFlag) {
      // 说明里面的食物没一个是必需品
      this.setData({
        isShopHasNecessity: true
      })
    }
    this.setData({
      shopInfo,
      leftList,
      foodList,
      shopStory,
      evaluationInfo
    })
  },
  async onLoad(options) {
    const shopList = app.globalData.shopList
    const {
      shopId
    } = options
    // 数据是异步的，此时.food-container类的列表还没显示出来，得阻塞
    await this.getFoodList(shopId)
    const scrollHeightArr = [0]
    wx.createSelectorQuery().selectAll('.food-container').boundingClientRect(function (rects) {
      rects.forEach((item, index) => {
        const prevScrollHeight = scrollHeightArr[index]
        // 这个15是为了在点击左边导航栏跳转到对应的商品时不会看到前面的商品
        scrollHeightArr.push(item.height + prevScrollHeight + 15)
      })
    }).exec()
    // 查看该店铺是否被收藏
    const likeShopList = wx.getStorageSync('likeShopList') || []
    const likeShop = likeShopList.find(item => item._id === shopId)
    if (likeShop) {
      this.setData({
        isLike: true
      })
    }
    this.setData({
      scrollHeightArr,
      shopList
    })
  },
  showOnlyContent() {
    const isOnlyShowContent = this.data.isOnlyShowContent ? false : true
    this.setData({
      isOnlyShowContent
    })
  },
  chooseCategory(e) {
    const {
      index
    } = e.currentTarget.dataset
    const scrollTop = this.data.scrollHeightArr[index]
    this.data.leftList.forEach(item => {
      item.isActive = false
    })
    this.data.leftList[index].isActive = true
    this.setData({
      leftList: this.data.leftList,
      scrollTop,
    })
  },
  addCart(e) {
    const {
      cartList,
      isChooseNecessity,
      isShopHasNecessity
    } = this.data
    const {
      food
    } = e.currentTarget.dataset
    const {
      foodList
    } = app.globalData
    // 首先得循环cartList数组里是否含有该food对象，如果没有的话，直接push，并且count+1
    // 如果本身就有的话，就找到该对象位置，并且count+1
    let isSame = false
    let searchIndex = -1
    for (let i = 0; i < foodList.length; i++) {
      const foodItem = foodList[i];
      for (let i = 0; i < foodItem.foods.length; i++) {
        const element = foodItem.foods[i];
        if (element.name === food.name) {
          element.count++
          break
        }
      }
    }
    cartList.forEach((item, index) => {
      if (item.name === food.name) {
        isSame = true
        searchIndex = index
      }
    })
    if (!isSame) {
      food.count++
      cartList.push(food)
    } else {
      cartList[searchIndex].count++
    }
    const totalPrice = cartList.reduce((prev, item) => prev + item.price * item.count, 0)
    const totalLength = cartList.reduce((prev, item) => prev + item.count, 0)
    // 如果该店铺本身就不需要必选品，就不用判断
    if (!isShopHasNecessity) {
      this.setData({
        isChooseNecessity: true
      })
    } else if (!isChooseNecessity) {
      // 如果没选必需品，那么每次添加食物的时候都得判断当前食物是否为必需品
      if (food.necessary) {
        this.setData({
          isChooseNecessity: true
        })
      }
    }
    this.setData({
      foodList,
      cartList,
      totalPrice,
      totalLength
    })
  },
  decreaseCart(e) {
    const {
      cartList,
      isChooseNecessity,
    } = this.data
    const {
      food
    } = e.currentTarget.dataset
    const {
      foodList
    } = app.globalData
    let isDelete = false
    let searchIndex = -1
    for (let i = 0; i < foodList.length; i++) {
      const foodItem = foodList[i];
      for (let i = 0; i < foodItem.foods.length; i++) {
        const element = foodItem.foods[i];
        if (element.name === food.name) {
          element.count--
          break
        }
      }
    }
    cartList.forEach((item, index) => {
      if (item.name === food.name) {
        searchIndex = index
        item.count--
        if (item.count === 0) {
          isDelete = true
        }
      }
    })
    if (isDelete) {
      cartList.splice(searchIndex, 1)
    }
    const totalPrice = cartList.reduce((prev, item) => prev + item.price * item.count, 0)
    const totalLength = cartList.reduce((prev, item) => prev + item.count, 0)
    let flag = true
    for (let i = 0; i < cartList.length; i++) {
      const item = cartList[i];
      if (item.necessary) {
        flag = false
        this.setData({
          isChooseNecessity: true
        })
        break
      }
    }
    if (flag) {
      this.setData({
        isChooseNecessity: false
      })
    }

    this.setData({
      foodList,
      cartList,
      totalPrice,
      totalLength
    })
  },
  settleAccounts() {
    const {
      isChooseNecessity,
      totalPrice
    } = this.data
    const cartList = JSON.stringify(this.data.cartList)
    if (totalPrice >= 20 && isChooseNecessity) {
      wx.navigateTo({
        url: `../pay/index?cartList=${cartList}`
      })
    }
  },
  goBack() {
    wx.navigateBack()
  }
})