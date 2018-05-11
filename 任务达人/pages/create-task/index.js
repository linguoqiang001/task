// pages/create-task/index.js
var network = require("../../utils/network.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat:0,
    lng:0,
    form:{
      title:'',
      introduce:'',
      money:'',
      endDate:'',
      endTime:'',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var o=this.getDate();
    var endDate="form.endDate"
    var endTime="form.endTime";
    this.setData({
      [endDate]:o.date,
      [endTime]:o.time
    })
  },

  publish:function(){
    var that=this;
    network.GET({
      url:'createTask',
      params:that.data.form,
      success:function(res){
        wx.showModal({
          title: '提示',
          content: '发布成功',
          cancelText: '查看任务',
          confirmText: '继续发布',
          success: function(res) {
            if (res.confirm) {
              that.setData({
                form:{
                  endDate:that.getDate().date,
                  endTime:that.getDate().time,
                }
              })
            } else if (res.cancel) {
              wx.navigateTo({
                url: '/pages/my-publish/index'
              })
            }
          }
        })
      }
    })
  },
  getDate:function(){
    var date=new Date();
    var month=date.getMonth()+1;
    if(month<10){
      month="0"+month;
    }
    var day=date.getDate()>=10?date.getDate():"0"+date.getDate();
    var hour=date.getHours()>=10?date.getHours():"0"+date.getHours();
    var minute=date.getMinutes()>=10?date.getMinutes():"0"+date.getMinutes(); 
    return {
      date:date.getFullYear()+"-"+month+"-"+day,
      time:hour+" : "+minute
    }    
  },
  getLocation:function(){
    wx.getLocation({
      success:function(res){
        this.setDate({
          lat:res.latitude,
          lng:res.longitude
        })
      }
    })

  },
  timeChange:function(e){
    var endTime="form.endTime";
    this.setData({
      [endTime]:e.detail.value
    })
  },
  dateChange:function(e){
    var endDate="form.endDate";
    this.setData({
      [endDate]:e.detail.value
    })
  },
  titleInput:function(e){
    var title="form.title";
    this.setData({
      [title]:e.detail.value
    })
  },
  submit:function(e){
    var that=this;
    wx.getLocation({
      success:function(res){
        e.detail.value.userId=getApp().globalData.userId;
        e.detail.value.latitude=res.latitude;
        e.detail.value.longitude=res.longitude;
        e.detail.value.publishTime=that.getDate().date+" "+that.getDate().time;
        that.setData({
          form:e.detail.value
        })
        that.publish();
      }
    })
  }
})