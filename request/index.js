// 同时发送异步代码的次数
let ajaxTimes = 0;
export const request = (params) => {
  ajaxTimes++;
  // 显示加载中 效果
  wx.showLoading({
    title: "加载中",
    mask: true
  });
  // 定义公共的url
   const baseUrl = "http://172.20.10.6:3000/";  //热点
  // const baseUrl = "http://10.8.225.135:3000/";  // 宿舍WIFI
  
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      // header,
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          //  关闭正在等待的图标
          wx.hideLoading({fail(){console.log('hideErr')}});
        }
      }
    });
  }).catch(err=>{
    console.log(err,'err')
  })
}