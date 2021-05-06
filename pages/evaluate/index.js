import {
  request
} from "../../request/index.js";
Page({
  data: {
    orderInfo: {},
    evaluateImageList: [{
        imagePath: '/static/images/worst.jpg',
        description: '非常差'
      },
      {
        imagePath: '/static/images/ordinary.jpg',
        description: '一般'
      },
      {
        imagePath: '/static/images/satisfied.jpg',
        description: '超赞'
      },
    ],
    buttonText: '请对骑士服务做出评价',
    variabledeliverEvaluateImageList: [],
    // 星星列表开始
    shopEvaluateImageList: ['/static/images/star.jpg', '/static/images/star.jpg', '/static/images/star.jpg', '/static/images/star.jpg', '/static/images/star.jpg'],
    variableShopEvaluateImageList: [],
    variablePackageEvaluateImageList: [],
    variableTasteEvaluateImageList: [],
    // 星星列表结束
    apologyText: '',
    shopApologyText: '',
    showEvaluateTextList: [],
    isEvaluateDeliver: false,
    customEvaluateImage: '/static/images/pencil.png',
    isCustomEvaluate: false,
    placeholderText: '',
    currentCoin: 0,
    customEvaluateText: '',
    shopActiveIndex: -1,
    packageActiveIndex: -1,
    tasteActiveIndex: -1,
    shopPlaceholderText: '',
    foodEvaluateImageList: [],
    // 给服务器需要传输的数据
    deliverEvaluationText: '', // 配送评价
    shopEvaluationText: '', // 服务评价
    packageEvaluationText: '', // 包装评价
    tasteEvaluationText: '', // 味道评价
    content: '', // 评论
    isAnonymous: false, // 是否是匿名评价
  },
  onLoad: function (options) {
    const orderInfo = JSON.parse(options.orderInfo)
    const {
      evaluateImageList,
      shopEvaluateImageList,
      foodEvaluateImageList
    } = this.data
    for (let i = 0; i < orderInfo.foodList.length; i++) {
      foodEvaluateImageList.push({
        prosImage: '/static/images/pros.jpg',
        consImage: '/static/images/cons.jpg'
      })
    }
    this.setData({
      orderInfo,
      variabledeliverEvaluateImageList: JSON.parse(JSON.stringify(evaluateImageList)),
      variableShopEvaluateImageList: JSON.parse(JSON.stringify(shopEvaluateImageList)),
      variablePackageEvaluateImageList: JSON.parse(JSON.stringify(shopEvaluateImageList)),
      variableTasteEvaluateImageList: JSON.parse(JSON.stringify(shopEvaluateImageList)),
      foodEvaluateImageList
    })
  },
  changeAnonymousStatus() {
    const isAnonymous = this.data.isAnonymous ? false : true
    this.setData({
      isAnonymous
    })
  },
  evaluateDeliver(e) {
    const {
      evaluateImageList
    } = this.data
    const {
      index
    } = e.currentTarget.dataset
    // 先将variableImageList变成初始化的evaluateImageList
    const variabledeliverEvaluateImageList = JSON.parse(JSON.stringify(evaluateImageList))
    const worseEvaluateTextList = [{
        text: '提前点送达',
        isActive: false
      },
      {
        text: '服务态度差',
        isActive: false
      },
      {
        text: '额外索取费用',
        isActive: false
      },
      {
        text: '餐品翻洒',
        isActive: false
      },
      {
        text: '配送慢',
        isActive: false
      },
      {
        text: '未穿制服',
        isActive: false
      },
      {
        text: '食品凉了',
        isActive: false
      },
      {
        text: '未带保温箱',
        isActive: false
      },
      {
        text: '着装脏乱',
        isActive: false
      },
      {
        text: '不送上楼',
        isActive: false
      },
    ]
    const niceEvaluateTextList = [{
        text: '餐品完好',
        isActive: false
      },
      {
        text: '服务态度好',
        isActive: false
      },
      {
        text: '准时到达',
        isActive: false
      },
      {
        text: '穿着专业',
        isActive: false
      },
      {
        text: '衣着整洁',
        isActive: false
      },
    ]
    if (index === 0) {
      variabledeliverEvaluateImageList[index].imagePath = '/static/images/worst_active.jpg'
      this.setData({
        apologyText: '抱歉影响您的体验，平台将对骑士进行管束',
        showEvaluateTextList: worseEvaluateTextList,
        placeholderText: '您的建议会督促我做的更好',
        deliverText: '吐槽',
        buttonText: '请选择配送差评理由'
      })
    } else if (index === 1) {
      variabledeliverEvaluateImageList[index].imagePath = '/static/images/ordinary_active.jpg'
      this.setData({
        apologyText: '',
        showEvaluateTextList: niceEvaluateTextList,
        placeholderText: '说说哪里好，其他顾客想知道~',
        deliverText: '一般',
        buttonText: '请评价用餐满意度'
      })
    } else {
      variabledeliverEvaluateImageList[index].imagePath = '/static/images/satisfied_active.jpg'
      this.setData({
        apologyText: '',
        showEvaluateTextList: niceEvaluateTextList,
        placeholderText: '说说哪里好，其他顾客想知道~',
        deliverText: '超赞',
        buttonText: '请评价用餐满意度'
      })
    }
    this.setData({
      variabledeliverEvaluateImageList,
      isEvaluateDeliver: true,
      currentCoin: 1
    })
  },
  customEvaluate() {
    const {
      isCustomEvaluate
    } = this.data
    if (!isCustomEvaluate) {
      this.setData({
        customEvaluateImage: '/static/images/cancel.png'
      })
    } else {
      this.setData({
        customEvaluateImage: '/static/images/pencil.png'
      })
    }
    this.setData({
      isCustomEvaluate: !isCustomEvaluate
    })
  },
  handleInput(e) {
    const {
      value
    } = e.detail
    const {
      shopEvaluationText,
      packageEvaluationText,
      tasteEvaluationText
    } = this.data
    if (value === '') {
      this.setData({
        buttonText: '请选择配送差评理由'
      })
    } else {
      if (shopEvaluationText && packageEvaluationText && tasteEvaluationText) {
        this.setData({
          buttonText: '提交评价'
        })
      } else {
        this.setData({
          buttonText: '请评价用餐满意度'
        })
      }
    }
    this.setData({
      customEvaluateText: value
    })
  },
  evaluateShop(e) {
    const {
      shopEvaluateImageList,
      shopEvaluationText,
      packageEvaluationText,
      tasteEvaluationText,
      content
    } = this.data
    const {
      index,
      type
    } = e.currentTarget.dataset
    if (type === 'package') {
      // 说明是在进行包装评价
      const variablePackageEvaluateImageList = JSON.parse(JSON.stringify(shopEvaluateImageList))
      switch (index) {
        case 0:
          this.setData({
            packageEvaluationText: '非常差',
          })
          break;
        case 1:
          this.setData({
            packageEvaluationText: '差',
          })
          break;
        case 2:
          this.setData({
            packageEvaluationText: '一般',
          })
          break;
        case 3:
          this.setData({
            packageEvaluationText: '满意',
          })
          break;
        case 4:
          this.setData({
            packageEvaluationText: '超赞',
          })
          break;
        default:
          break;
      }
      if (tasteEvaluationText) {
        this.setData({
          buttonText: '提交评价'
        })
      } else {
        this.setData({
          buttonText: '请评价包装/味道满意度'
        })
      }
      if (index < 2) {
        for (let i = 0; i < index + 1; i++) {
          variablePackageEvaluateImageList[i] = '/static/images/worse_star.jpg'
        }
      } else if (index < 4) {
        for (let i = 0; i < index + 1; i++) {
          variablePackageEvaluateImageList[i] = '/static/images/satisfied_star.jpg'
        }
      } else {
        for (let i = 0; i < index + 1; i++) {
          variablePackageEvaluateImageList[i] = '/static/images/perfect_star.jpg'
        }
      }
      this.setData({
        variablePackageEvaluateImageList,
        packageActiveIndex: index
      })
    } else if (type === 'shop') {
      const variableShopEvaluateImageList = JSON.parse(JSON.stringify(shopEvaluateImageList))
      switch (index) {
        case 0:
          if (content && packageEvaluationText && tasteEvaluationText) {
            this.setData({
              buttonText: '提交评价'
            })
          } else {
            this.setData({
              buttonText: '请说明用餐差评的理由'
            })
          }
          this.setData({
            shopEvaluationText: '非常差',
          })
          break;
        case 1:
          if (content && packageEvaluationText && tasteEvaluationText) {
            this.setData({
              buttonText: '提交评价'
            })
          } else {
            this.setData({
              buttonText: '请说明用餐差评的理由'
            })
          }
          this.setData({
            shopEvaluationText: '差',
          })
          break;
        case 2:
          if (packageEvaluationText && tasteEvaluationText) {
            this.setData({
              buttonText: '提交评价'
            })
          } else {
            this.setData({
              buttonText: '请评价包装/味道满意度'
            })
          }
          this.setData({
            shopEvaluationText: '一般',
          })
          break;
        case 3:
          if (packageEvaluationText && tasteEvaluationText) {
            this.setData({
              buttonText: '提交评价'
            })
          } else {
            this.setData({
              buttonText: '请评价包装/味道满意度'
            })
          }
          this.setData({
            shopEvaluationText: '满意',
          })
          break;
        case 4:
          if (packageEvaluationText && tasteEvaluationText) {
            this.setData({
              buttonText: '提交评价'
            })
          } else {
            this.setData({
              buttonText: '请评价包装/味道满意度'
            })
          }
          this.setData({
            shopEvaluationText: '超赞',
          })
          break;
        default:
          break;
      }
      if (index < 2) {
        for (let i = 0; i < index + 1; i++) {
          variableShopEvaluateImageList[i] = '/static/images/worse_star.jpg'
        }
        this.setData({
          shopApologyText: '抱歉影响您的体验，平台将对商家进行管束',
          shopPlaceholderText: '食材不新鲜，味道太咸，不推荐这家'
        })
      } else if (index < 4) {
        for (let i = 0; i < index + 1; i++) {
          variableShopEvaluateImageList[i] = '/static/images/satisfied_star.jpg'
        }
        this.setData({
          shopApologyText: '',
          shopPlaceholderText: '餐点味道好，包装也仔细，下次还会点'
        })
      } else {
        for (let i = 0; i < index + 1; i++) {
          variableShopEvaluateImageList[i] = '/static/images/perfect_star.jpg'
        }
        this.setData({
          shopApologyText: '',
          shopPlaceholderText: '餐点味道好，包装也仔细，下次还会点'
        })
      }
      this.setData({
        variableShopEvaluateImageList,
        shopActiveIndex: index
      })
    } else {
      const variableTasteEvaluateImageList = JSON.parse(JSON.stringify(shopEvaluateImageList))
      switch (index) {
        case 0:
          this.setData({
            tasteEvaluationText: '非常差',
          })
          break;
        case 1:
          this.setData({
            tasteEvaluationText: '差',
          })
          break;
        case 2:
          this.setData({
            tasteEvaluationText: '一般',
          })
          break;
        case 3:
          this.setData({
            tasteEvaluationText: '满意',
          })
          break;
        case 4:
          this.setData({
            tasteEvaluationText: '超赞',
          })
          break;
        default:
          break;
      }
      this.setData({
        buttonText: '提交评价'
      })
      if (index < 2) {
        for (let i = 0; i < index + 1; i++) {
          variableTasteEvaluateImageList[i] = '/static/images/worse_star.jpg'
        }
      } else if (index < 4) {
        for (let i = 0; i < index + 1; i++) {
          variableTasteEvaluateImageList[i] = '/static/images/satisfied_star.jpg'
        }
      } else {
        for (let i = 0; i < index + 1; i++) {
          variableTasteEvaluateImageList[i] = '/static/images/perfect_star.jpg'
        }
      }
      this.setData({
        variableTasteEvaluateImageList,
        tasteActiveIndex: index
      })
    }
  },
  shopInputTextArea(e) {
    const {
      value
    } = e.detail
    if (value === '') {
      this.setData({
        buttonText: '请说明用餐差评的理由'
      })
    } else {
      this.setData({
        buttonText: '提交评价'
      })
    }
    this.setData({
      content: value
    })
  },
  evaluateFood(e) {
    const {
      type,
      index
    } = e.currentTarget.dataset
    const {
      foodEvaluateImageList
    } = this.data
    if (type === 'pros') {
      foodEvaluateImageList[index].prosImage = '/static/images/pros_active.jpg'
      foodEvaluateImageList[index].consImage = '/static/images/cons.jpg'
    } else {
      foodEvaluateImageList[index].prosImage = '/static/images/pros.jpg'
      foodEvaluateImageList[index].consImage = '/static/images/cons_active.jpg'
    }
    this.setData({
      foodEvaluateImageList
    })
  },
  async submitEvaluation() {
    const {
      buttonText,
      foodEvaluateImageList,
      orderInfo,
      isAnonymous,
      deliverText,
      shopEvaluationText,
      packageEvaluationText,
      tasteEvaluationText,
      content 
    } = this.data
    const recommendList = []
    const foodList = orderInfo.foodList
    if (buttonText === '请对骑士服务做出评价') {
      wx.showToast({
        title: '请对骑士服务做出评价',
        icon: 'none',
        mask: true,
      })
    } else if (buttonText === '请选择配送差评理由') {
      wx.showToast({
        title: '请选择配送差评理由',
        icon: 'none',
        mask: true,
      })
    } else if (buttonText === '请说明用餐差评的理由') {
      wx.showToast({
        title: '请说明用餐差评的理由',
        icon: 'none',
        mask: true,
      })
    } else {
      // recommendList
      foodEvaluateImageList.forEach((item, index) => {
        if (item.prosImage === '/static/images/pros_active.jpg') {
          recommendList.push({
            text: foodList[index].name
          })
        }
      })
      // 发请求应该写在这里
    }
    let isSatisfied = true
    if (deliverText === '吐槽' || shopEvaluationText === '非常差' || shopEvaluationText === '差' || packageEvaluationText === '非常差' || packageEvaluationText === '差' || tasteEvaluationText === '非常差' || tasteEvaluationText === '差') {
      isSatisfied = false
    }
    const data = {
      avatar: '',
      consumerName: 'xiaofieji',
      isAnonymous,
      isSatisfied,
      userExperienceList: [{
        text: "服务",
        level: shopEvaluationText
      }, {
        text: "味道",
        level: tasteEvaluationText
      }, {
        text: "包装",
        level: packageEvaluationText
      }, {
        text: "配送",
        level: deliverText
      }],
      content,
      recommendList,
      foodId:orderInfo.foodId
    }
    const res = await request({
      url: 'order/evaluateOrder',
      method: 'post',
      data
    })
    console.log(res, 'res')
  },
  defaultEvaluateDeliver(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      deliverText,
      showEvaluateTextList
    } = this.data
    showEvaluateTextList[index].isActive = showEvaluateTextList[index].isActive ? false : true
    console.log(index, 'index')
    console.log(showEvaluateTextList, 'showEvaluateTextList')
    this.setData({
      showEvaluateTextList
    })
  }
})