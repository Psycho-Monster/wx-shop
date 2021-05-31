import {
  request
} from "../../request/index.js";
Page({
  data: {
    rankingList: [{
      title: '热搜榜',
      hotSearchList: [{
          image: 'https://i.loli.net/2021/05/05/2dwyvOWNQLnYbVB.png',
          name: '食力推荐沙县',
          popularValue: 87898
        },
        {
          image: 'https://i.loli.net/2021/05/05/O3HLs7eykr5uCa2.png',
          name: '炒饭非常赞',
          popularValue: 156837
        },
        {
          image: 'https://i.loli.net/2021/05/05/LT1DKjrAwqvtBEm.png',
          name: '奶茶卖疯啦',
          popularValue: 177961
        },
        {
          image: 'https://i.loli.net/2021/05/05/d9I3nNA4BEYVChp.png',
          name: '星巴克专星送',
          popularValue: 162045
        },
        {
          image: 'https://i.loli.net/2021/05/05/u7HgPRhGskMlYzc.png',
          name: '卤肉饭满分',
          popularValue: 88047
        },
        {
          image: 'https://i.loli.net/2021/05/05/ANeHhqW8s3U2okb.png',
          name: '必买的烧烤',
          popularValue: 88047
        },
        {
          image: 'https://i.loli.net/2021/05/05/GnHry5hNoBtszA1.png',
          name: '大家都爱小龙虾',
          popularValue: 171093
        },
        {
          image: 'https://i.loli.net/2021/05/05/QPlohdgbOGm9I5W.png',
          name: '炒粉，超满足',
          popularValue: 85151
        },
        {
          image: 'https://i.loli.net/2021/05/05/3hsrXQMtBoHRxSI.png',
          name: '馄饨敲好次',
          popularValue: 152828
        },
        {
          image: 'https://i.loli.net/2021/05/05/RLYX7t256iGEkJM.png',
          name: '尝鲜肠粉',
          popularValue: 93423
        },
      ],
      partHotSearchList: [],
      showHotSearchList: [],
    }, {
      title: '好货榜',
      hotSearchList: [{
          image: 'https://i.loli.net/2021/05/05/n5UbrK4qsoiWeMh.png',
          name: '西瓜',
          popularValue: 178368
        },
        {
          image: 'https://i.loli.net/2021/05/05/NZGe54Uaw382QoC.png',
          name: '杨梅',
          popularValue: 172668
        },
        {
          image: 'https://i.loli.net/2021/05/05/lvXET7PhpNx1YRz.png',
          name: '鸡爪',
          popularValue: 179613
        },
        {
          image: 'https://i.loli.net/2021/05/05/nLA8G3TR92BtPVC.png',
          name: '羊肉串',
          popularValue: 171383
        },
        {
          image: 'https://i.loli.net/2021/05/05/m7X53pAanJQTdWH.png',
          name: '水果',
          popularValue: 184995
        },
        {
          image: 'https://i.loli.net/2021/05/05/gWxUmQCwS2F4JaV.png',
          name: '葡萄',
          popularValue: 158742
        },
        {
          image: 'https://i.loli.net/2021/05/05/V2OjL4dlQC5rTkp.png',
          name: '草莓',
          popularValue: 164349
        },
        {
          image: 'https://i.loli.net/2021/05/05/oU4L5GZCjkBScsQ.png',
          name: '柠檬茶',
          popularValue: 157079
        },
        {
          image: 'https://i.loli.net/2021/05/05/iKaDGujZkx5NLp1.png',
          name: '火龙果',
          popularValue: 83167
        },
        {
          image: 'https://i.loli.net/2021/05/05/APGQ6ZtgTJX9Ezr.png',
          name: '菠萝',
          popularValue: 163057
        },
      ],
      partHotSearchList: [],
      showHotSearchList: [],
    }, {
      title: '大牌榜',
      hotSearchList: [{
          image: 'https://i.loli.net/2021/05/05/mcg1QyLZ9SeBHJz.png',
          name: '堕落小龙虾',
          popularValue: 70914
        },
        {
          image: 'https://i.loli.net/2021/05/05/pCkvIfza9BHKAGT.png',
          name: '绝味鸭脖',
          popularValue: 172668
        },
        {
          image: 'https://i.loli.net/2021/05/05/6lkxbJdFDvSCW7a.png',
          name: '首尔韩式炸鸡',
          popularValue: 179613
        },
        {
          image: 'https://i.loli.net/2021/05/05/RY5Tp1XZtKN9EwQ.png',
          name: '贡茶',
          popularValue: 171383
        },
        {
          image: 'https://i.loli.net/2021/05/05/76Lohu59AG8UyCs.png',
          name: '华莱士',
          popularValue: 184995
        },
        {
          image: 'https://i.loli.net/2021/05/05/8wj67Zen4RlOYfJ.png',
          name: '正新鸡排',
          popularValue: 158742
        },
        {
          image: 'https://i.loli.net/2021/05/05/PbknwZClpouxR4y.png',
          name: '周黑鸭',
          popularValue: 164349
        },
        {
          image: 'https://i.loli.net/2021/05/05/xTS4ab7j1BMh8sY.png',
          name: '麦当劳',
          popularValue: 157079
        },
        {
          image: 'https://i.loli.net/2021/05/05/laTkH46x3bSPdnU.png',
          name: '尊宝',
          popularValue: 83167
        },
        {
          image: 'https://i.loli.net/2021/05/06/7PNztHvb1xTiqw2.png',
          name: '叫了个炸鸡',
          popularValue: 211728
        },
      ],
      partHotSearchList: [],
      showHotSearchList: [],
    }, {
      title: '常逛榜',
      hotSearchList: [{
          image: 'https://i.loli.net/2021/05/06/I4PfkypE81M5XQT.png',
          name: '常德湘菜馆',
          recommendText: '根据你的浏览推荐'
        },
        {
          image: 'https://i.loli.net/2021/05/06/DsjRYh6Fbo14pgE.png',
          name: '柳州螺蛳粉.老友粉',
          recommendText: '根据你的下单推荐'
        },
        {
          image: 'https://i.loli.net/2021/05/06/nqxapPM72TSXJ6s.png',
          name: '有家便利店',
          recommendText: '根据你的浏览推荐'
        },
        {
          image: 'https://i.loli.net/2021/05/06/I12YkuLWSCQPl7B.png',
          name: '甜蜜时光·创意生日',
          recommendText: '根据你的浏览推荐'
        },
        {
          image: 'https://i.loli.net/2021/05/06/riWAmBDlMpubCIG.png',
          name: '苏姐牛奶甜品世家',
          recommendText: '根据你的浏览推荐'
        },
        {
          image: 'https://i.loli.net/2021/05/06/ocrEQk3l8UOPMhq.png',
          name: '冯记丰顺捆粄',
          recommendText: '根据你的浏览推荐'
        },
        {
          image: 'https://i.loli.net/2021/05/06/WiqKhlxnVtf46Zk.png',
          name: '壹品轩·炒饭·扒饭',
          recommendText: '根据你的浏览推荐'
        },
        {
          image: 'https://i.loli.net/2021/05/06/9ozPpCEWnsdFV7i.png',
          name: '麻辣小龙虾·窑鸡·烧烤',
          recommendText: '根据你的浏览推荐'
        },
        {
          image: 'https://i.loli.net/2021/05/06/ZawsNAoIMtl8jdE.png',
          name: '擂君·擂椒拌饭',
          recommendText: '根据你的浏览推荐'
        },
        {
          image: 'https://i.loli.net/2021/05/06/MOC8oeR42trq3gG.png',
          name: '五谷渔粉',
          recommendText: '根据你的浏览推荐'
        },
      ],
      partHotSearchList: [],
      showHotSearchList: [],
    }],
    isShowMoreContent: false,
    contentText: '更多',
    goodExclusiveStore: [{
      imagePath: 'https://i.loli.net/2021/05/06/r97p52uiVAnyKlE.png',
      name: '一抖勺木桶饭',
      description: '"超级推荐土豆回锅肉!"',
      discountInfo: [{
          text: '20减5'
        },
        {
          text: '45减10'
        }
      ]
    }, {
      imagePath: 'https://i.loli.net/2021/05/06/emLqIwPnrzoj8ki.png',
      name: '肯德基宅急送',
      description: '附近好店',
      discountInfo: []
    }, {
      imagePath: 'https://i.loli.net/2021/05/06/f32IGEXenzMQSyb.png',
      name: '杨国福麻辣烫',
      description: '味道不错，下次还会再来',
      discountInfo: [{
          text: '28减12'
        },
        {
          text: '40减16'
        }
      ]
    }, {
      imagePath: 'https://i.loli.net/2021/05/06/cJSVOU4Tm8PiQbo.png',
      name: '美宜佳',
      description: '附近好店',
      discountInfo: []
    }, {
      imagePath: 'https://i.loli.net/2021/05/06/wnt6FdzhYxGSkEr.png',
      name: '泓泰牛肉店',
      description: '"湿炒牛河-中份,新奇士"',
      discountInfo: [{
          text: '30减3'
        },
        {
          text: '60减6'
        }
      ]
    }, {
      imagePath: 'https://i.loli.net/2021/05/06/1FLOSlTgZeawx8m.png',
      name: '茶百道',
      description: '"豆乳米麻薯棒棒哒"',
      discountInfo: [{
          text: '25减1'
        },
        {
          text: '36减2'
        }
      ]
    }, {
      imagePath: 'https://i.loli.net/2021/05/06/csMK7eDdtyan8Ck.png',
      name: '乐凯撒披萨',
      description: '"很美味,榴莲超多"',
      discountInfo: [{
          text: '80减33'
        },
        {
          text: '130减40'
        }
      ]
    }, {
      imagePath: 'https://i.loli.net/2021/05/06/komcir1UwPvnWNe.png',
      name: '一味烟火烧烤·海鲜',
      description: '我对象对炭烤大鸭腿着迷',
      discountInfo: [{
          text: '38减25'
        },
        {
          text: '68减38'
        }
      ]
    }, {
      imagePath: 'https://i.loli.net/2021/05/07/k3AvGXTaJnVwDN8.png',
      name: '嘉和一品粥',
      description: '"粥非常好喝,下次再点"',
      discountInfo: []
    }, {
      imagePath: 'https://i.loli.net/2021/05/07/5ZXqxywoGkK6YVn.png',
      name: '韩屋村·韩式炸鸡',
      description: '"可乐配上炸鸡,味道非常好"',
      discountInfo: []
    }],
    shopName: '星巴克',
    isSearchShop: false,
    searchShopList:[]
  },
  onLoad: function () {
    const {
      rankingList
    } = this.data
    rankingList.forEach(item => {
      item.partHotSearchList = item.hotSearchList.slice(0, 4)
      item.showHotSearchList = item.hotSearchList.slice(0, 4)
    })
    this.setData({
      rankingList
    })
  },
  showMoreContent(e) {
    const {
      rankingList,
      isShowMoreContent,
    } = this.data
    if (isShowMoreContent) {
      rankingList.forEach(rankingItem => {
        rankingItem.showHotSearchList = rankingItem.partHotSearchList
        this.setData({
          isShowMoreContent: false,
          contentText: '更多'
        })
      })
    } else {
      rankingList.forEach(rankingItem => {
        rankingItem.showHotSearchList = rankingItem.hotSearchList
        this.setData({
          isShowMoreContent: true,
          contentText: '收起更多'
        })
      })
    }
    this.setData({
      rankingList
    })
  },
  handleInput(e) {
    const shopName = e.detail.value
    const {
      isSearchShop
    } = this.data
    this.setData({
      shopName
    })
    if (shopName === '' && isSearchShop) {
      this.setData({
        isSearchShop: false
      })
    }
  },
  async searchShop() {
    const {
      shopName
    } = this.data
    const {
      docs
    } = await request({
      url: `shops?shopName=${shopName}`
    })
    this.setData({
      isSearchShop: true,
      searchShopList: docs
    })
  }
})