import {
  request
} from "../../request/index.js";
Page({
  data: {
    brandStory: {},
    shopId:''
  },
  onLoad: function (options) {
    const {shopId}=options
    this.setData({
      shopId
    })
    this.getBrandStory()
  },
  async getBrandStory() {
    const brandStory = await request({
      url: `shopStory?shopId=${this.data.shopId}`,
    })
    this.setData({
      brandStory
    })
  }
})