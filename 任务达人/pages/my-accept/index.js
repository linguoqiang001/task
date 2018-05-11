// pages/my-accept/index.js
var network = require("../../utils/network.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
    network.GET({
      url:'getAcceptTask',
      params:{userId:getApp().globalData.userId},
      success:function(res){
        that.setData({
          list:res.data
        })
      }
    })
  },
  taskDetail:function(e){
    var o=e.currentTarget.dataset.info;
    wx.navigateTo({
      url:'/pages/edit-task/index?'+"title="+o.title+"&introduce="+o.introduce+
      "&endDate="+o.endDate+"&endTime="+o.endTime+"&id="+o.id+"&money="+o.money
    })
  }
})