// 类名常量
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    score: {
      type: Number
    },
    size: {
      type: Number
    },
  },
  data: {
    starClasses: []
  },
  ready() {
    const {
      score
    } = this.data
    const scs = []
    // 向scs中添加n个CLASS_ON
    const scoreInteger = Math.floor(score)
    for (let i = 0; i < scoreInteger; i++) {
      scs.push(CLASS_ON)
    }
    // 向scs中添加0/1个CLASS_HALF
    if (score * 10 - scoreInteger * 10 >= 5) {
      scs.push(CLASS_HALF)
    }
    // 向scs中添加n个CLASS_OFF
    while (scs.length < 5) {
      scs.push(CLASS_OFF)
    }
    this.setData({
      starClasses: scs
    })
  }
})