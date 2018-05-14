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
  },
  changeAcceptStatus:function(o,status){
    var that=this;
    wx.request({
      url:'https://www.zilii.top/task/changeAcceptStatus',
      data:{taskId:o.id,userId:o.userId,acceptTime:o.publishTime,status:status},
      success:function(){
        that.onLoad();
      }
    })
  },
  changeTaskStatus:function(o,status){
    var that=this;
    wx.request({
      url:'https://www.zilii.top/task/changeTaskStatus',
      data:{taskId:o.id,status:status},
    })  
  },
  cancelTask:function(e){
    var o=e.currentTarget.dataset.info;
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确认取消',
      success: function(res) {
        if (res.confirm) {
          that.changeAcceptStatus(o,1);
          that.changeTaskStatus(o,0);
        } 
      }
    })
  },
  deleteTask:function(e){
    var o=e.currentTarget.dataset.info;   
    var that=this; 
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success: function(res) {
        if (res.confirm) {
          that.changeAcceptStatus(o,3);
        } 
      }
    })  
  },
  onPullDownRefresh:function(){
    this.onLoad();
    wx.stopPullDownRefresh(); 
  }
}) 