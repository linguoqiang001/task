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
  changeTaskStatus:function(e,status){
    var that=this;
    wx.request({
      url:'https://www.zilii.top/task/changeTaskStatus',
      data:{taskId:e.target.dataset.id,status:status},
      success:function(){
        that.getList();
      }
    })  
  },
  cancelTask:function(e,status){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确认取消',
      success: function(res) {
        if (res.confirm) {
          that.changeTaskStatus(e,3)
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
  },
  deleteTask:function(e){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success: function(res) {
        if (res.confirm) {
          that.changeTaskStatus(e,4)
        } 
      }
    })  
  },
  confirmTask:function(e){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确认完成',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url:'https://www.zilii.top/task/confirmTask',
            data:{taskId:e.target.dataset.id,setStatus:2,nowStatus:0},
            success:function(){
              that.changeTaskStatus(e,1);
            }
          })
        } 
      }
    })     
  },
  onPullDownRefresh:function(){
    this.onLoad();
    wx.stopPullDownRefresh(); 
  }
})