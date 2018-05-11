Page({
  data: {
    userInfo: {},
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.getUserInfo({
      success: res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  },
  acceptTask:function(){
    wx.navigateTo({
      url:'/pages/my-accept/index'
    })
  },
  publishTask:function(){
    wx.navigateTo({
      url:'/pages/my-publish/index'
    })
  }
})
