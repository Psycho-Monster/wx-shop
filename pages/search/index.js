// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
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
    },{
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
          image: 'https://i.loli.net/2021/05/05/APGQ6ZtgTJX9Ezr.png',
          name: '菠萝',
          popularValue: 163057
        },
      ],
      partHotSearchList: [],
      showHotSearchList: [],
    }],
    isShowMoreContent: false,
    contentText: '更多'
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
  }
})