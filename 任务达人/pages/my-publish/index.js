// pages/my-publish/index.js
var network = require("../../utils/network.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFinish:false,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.getList();
  },
  getList:function(){
    var that=this;
    network.GET({
      url:'publishTask',
      params:{userId:getApp().globalData.userId},
      success:function(res){
        that.setData({
          list:res.data
        })
      }
    })
  },
  cancelTask:function(e){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确认取消',
      success: function(res) {
        if (res.confirm) {
          console.log()
          network.GET({
            url:'cancelTask',
            params:{id:e.target.dataset.id},
            success:function(){
              that.getList();
            }
          })
        } else if (res.cancel) {
         
        }
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