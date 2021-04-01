// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
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
    deliverTime:0
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
  onLoad: function (options) {
    const cartList = JSON.parse(options.cartList)
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
          deliverTime:`大约${nextH}:${finalM}送到`
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
      foodPrice
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
    console.log(detail,'detail')
    const {text,id}=detail
    const d = new Date();
    const week = this.getMyDay(d)
    let deliverStr
    if(id===1){
      deliverStr=`大约${text.substring(7,12)}送到`
    }else{
      deliverStr=`今日（${week}）${text.substring(0,5)}`
    }
    this.setData({
      activeId,
      deliverTime:deliverStr,
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