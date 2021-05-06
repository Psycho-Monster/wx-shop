import {
  request
} from "../../request/index.js";
Page({
  data: {
    isShowPayType: false,
    payType: 'wxPay',
    cartList: [],
    callType: 'safeCall',
    isShowTableware: false,
    tableWareCount: '无需餐具',
    isShowDeliverTime: false,
    mainActiveIndex: 0,
    activeId: 1,
    deliverList: [],
    deliverFee: 4,
    prevDeliverFee: 9,
    discountFee: 2,
    totalPrice: 0,
    foodPrice: 0,
    deliverTime: 0,
    shopInfo: {}
  },
  getMyDay(date) {
    let week;
    if (date.getDay() == 0) week = "周日"
    if (date.getDay() == 1) week = "周一"
    if (date.getDay() == 2) week = "周二"
    if (date.getDay() == 3) week = "周三"
    if (date.getDay() == 4) week = "周四"
    if (date.getDay() == 5) week = "周五"
    if (date.getDay() == 6) week = "周六"
    return week;
  },
  async submitOrder() {
    const {
      cartList,
      discountFee,
      totalPrice,
      activeId,
      tableWareCount,
      shopInfo
    } = this.data
    const orderList = []
    cartList.forEach(item => {
      orderList.push({
        name: item.name,
        price: item.price,
        count: item.count,
        image: item.image
      })
    })
    let deliverTime
    if (activeId === 1) {
      deliverTime = '尽快送达'
    } else {
      deliverTime = this.data.deliverTime
    }
    const deliverInfo = {
      deliverTime,
      deliverAddress: '元径村十二巷4栋302左飞杰(先生)15915450653',
      deliverService: '商家配送'
    }
    const orderInfo = {
      note: tableWareCount
    }
    const order = {
      imagePath: shopInfo.imagePath,
      name: shopInfo.name,
      orderList,
      discountPrice:discountFee,
      orderPrice:totalPrice,
      deliverInfo,
      orderInfo,
      longitude: shopInfo.longitude,
      latitude: shopInfo.latitude
    }
    // 添加订单
    await request({
      url: 'order/createOrder',
      data: order,
      method:'post',
    })
    // 查询所有订单，找到最新添加的订单id，通过该id去跳转到订单详情
    const {docs} = await request({
      url: 'order',
    })
    const allOrderList=docs
    const orderid=allOrderList[allOrderList.length-1]._id
    wx.navigateTo({
      url: `../orderDetail/index?orderId=${orderid}&isPayToOrderDetail=true`,
    })
  },
  onLoad: function (options) {
    const cartList = JSON.parse(options.cartList)
    const shopInfo = JSON.parse(options.shopInfo)
    const {
      deliverFee,
    } = this.data
    let {
      discountFee
    } = this.data
    const foodPrice = cartList.reduce((prev, item) => prev + item.price * item.count, 0)
    if (foodPrice < 70) {
      discountFee = 0
    }
    const totalPrice = foodPrice + deliverFee - discountFee
    const deliverList = []
    const deliverObj = {
      text: '',
      children: []
    }
    const d = new Date();
    const m = d.getMinutes()
    const h = d.getHours()
    const week = this.getMyDay(d)
    deliverObj.text = `今日（${week}）`
    let nextM = m + 40
    let nextH = h
    if (nextM >= 60) {
      nextM = nextM - 60
      nextH = nextH + 1
    }
    for (let i = 1; i < 8; i++) {
      let text
      if (i === 1) {
        let finalM = nextM < 10 ? `0${nextM}` : nextM
        text = `尽快送达 | ${nextH}:${finalM}（9元配送费）`
        this.setData({
          deliverTime: `大约${nextH}:${finalM}送到`
        })
      } else {
        let flag = false
        nextM = nextM + 20
        if (nextM > 60) {
          flag = true
          nextM = nextM - 60
        }
        if (flag) {
          nextH += 1
        }
        let finalM = nextM < 10 ? `0${nextM}` : nextM
        text = `${nextH}:${finalM}（9元配送费）`
      }
      deliverObj.children.push({
        text,
        id: i
      })
    }
    deliverList.push(deliverObj)
    this.setData({
      cartList,
      totalPrice,
      deliverList,
      foodPrice,
      shopInfo
    })
  },
  closePayType() {
    this.setData({
      isShowPayType: false
    });
  },
  showPayType() {
    this.setData({
      isShowPayType: true
    })
  },
  onChange(event) {
    this.setData({
      callType: event.detail,
    });
  },
  closeTableware() {
    this.setData({
      isShowTableware: false
    });
  },
  changeTablewareCount(event) {
    this.setData({
      tableWareCount: event.detail,
    });
  },
  showTableware() {
    this.setData({
      isShowTableware: true
    })
  },
  onClickItem({
    detail = {}
  }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;
    const {
      text,
      id
    } = detail
    const d = new Date();
    const week = this.getMyDay(d)
    let deliverStr
    if (id === 1) {
      deliverStr = `大约${text.substring(7,12)}送到`
    } else {
      deliverStr = `今日（${week}）${text.substring(0,5)}`
    }
    this.setData({
      activeId,
      deliverTime: deliverStr,
      isShowDeliverTime: false
    });
  },
  closeDeliverTime() {
    this.setData({
      isShowDeliverTime: false
    })
  },
  showDeliverTime() {
    this.setData({
      isShowDeliverTime: true
    })
  }
})