import wx from "weixin-js-sdk";

/**
 * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
 */
export const updateAppMessageShareData = (data: any) => {
  wx.updateAppMessageShareData({ 
    title: data.title, // 分享标题
    desc: data.desc, // 分享描述
    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: data.imgUrl, // 分享图标
    success: function () {
      // 设置成功
    }
  })
}

/**
 * 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
 */
export const updateTimelineShareData = (data: any) => {
  wx.updateTimelineShareData({ 
    title: data.title, // 分享标题
    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: data.imgUrl, // 分享图标
    success: function () {
      // 设置成功
    }
  })
}

/**
 * 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
 */
export const onMenuShareTimeline = (data: any) => {
  wx.onMenuShareTimeline({
    title: data.title, // 分享标题
    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: data.imgUrl, // 分享图标
    success: function () {
      // 用户点击了分享后执行的回调函数
    }
  })
}

/**
 * 获取“分享给朋友”按钮点击状态及自定义分享内容接口
 */
export const onMenuShareAppMessage = (data: any) => {
  wx.onMenuShareAppMessage({
    title: data.title, // 分享标题
    desc: data.desc, // 分享描述
    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: data.imgUrl, // 分享图标
    type: data.type, // 分享类型,music、video或link，不填默认为link
    dataUrl: data.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
    // 用户点击了分享后执行的回调函数
    }
  })
}
