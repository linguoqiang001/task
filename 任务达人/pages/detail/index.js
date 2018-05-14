// pages/detail/index.js
var network = require("../../utils/network.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    introduce:'',
    money:'',
    endDate:'',
    endTime:'',
    taskId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.title,
      introduce:options.introduce,
      money:options.money,
      endDate:options.endDate,
      endTime:options.endTime,
      taskId:options.id
    })
  },
  confirmOn:function(){
    var that=this;
    wx.showModal({
      title:"确认",
      content:"确认接下任务",
      success:function(res){
        if (res.confirm) {
          network.GET({
            url:'addAcceptTask',
            params:{taskId:that.data.taskId,userId:getApp().globalData.userId},
            success:function(){
              wx.showModal({
                title:"提示",
                content:"已接受任务",
                confirmText:"查看任务",
                cancelText:"返回首页",
                success:function(res){
                   if(res.confirm){
                     wx.redirectTo({
                        url: '/pages/my-accept/index'
                    })
                   }else if(res.cancel){
                    wx.switchTab({
                      url:'/pages/index/index',
                      success: function (e) {  
                        var page = getCurrentPages().pop();  
                        if (page == undefined || page == null) return;  
                        page.onLoad();  
                      }  
                    })
                  } 
                }
              })
            }
          })          
        }
      }
    })
  }
})