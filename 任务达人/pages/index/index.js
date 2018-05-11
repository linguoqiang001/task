//index.js
var network = require("../../utils/network.js")

const app = getApp()

Page({
  data: {
    userInfo: {},
    taskList:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(getApp().globalData.userInfo)
    var that=this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
    //计算距离
    function getDistance(lat1, lng1, lat2, lng2) {
      lat1 = lat1 || 0;
      lng1 = lng1 || 0;
      lat2 = lat2 || 0;
      lng2 = lng2 || 0;
     
      var rad1 = lat1 * Math.PI / 180.0;
      var rad2 = lat2 * Math.PI / 180.0;
      var a = rad1 - rad2;
      var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
     
      var r = 6378137;
      return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
    }     
    //获取任务列表
    network.GET({
      url:'list',
      success:function(res1){
        var lat2,lng2;
        wx.getLocation({
          success:function(res2){           
            lat2=res2.latitude;
            lng2=res2.longitude;
            for(let i=0;i<res1.data.length;i++){
              res1.data[i].dis=getDistance(res1.data[i].latitude,res1.data[i].longitude,lat2,lng2);
            }
            that.setData({
              taskList:res1.data
            })
          }
        })
      }
    })
  },
  taskDetail:function(e){
    var o=e.currentTarget.dataset.info;
    wx.navigateTo({
      url: "/pages/detail/index?"+"title="+o.title+"&introduce="+o.introduce+
      "&endDate="+o.endDate+"&endTime="+o.endTime+"&id="+o.id+"&money="+o.money
    })
  }
})
