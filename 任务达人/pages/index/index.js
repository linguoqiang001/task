//index.js
var network = require("../../utils/network.js")

const app = getApp()

Page({
  data: {
    userInfo:{},
    taskList:[],
    keyword:'publishTime DESC',
    classfiyList:[
      {id:0,name:'时间最近'},
      {id:1,name:'距离最短'},
      {id:2,name:'佣金最高'}
    ],
    activedId:0,
    tempList:[]
  },
  onLoad: function () {
    var that=this;    
    if(!getApp().globalData.userId){
      wx.login({
        success: res => {
          //发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url:'https://www.zilii.top/task/getOpenId',
            data:{code:res.code},
            method:'GET',
            success:function(res1){
              app.globalData.userId=res1.data.openid;
              that.getList();
            }
         })
        }
      })
    }else{
      this.getList();
    } 
  },
    //计算距离  
  getDistance:function(lat1, lng1, lat2, lng2){
      lat1 = lat1 || 0;
      lng1 = lng1 || 0;
      lat2 = lat2 || 0;
      lng2 = lng2 || 0;
      var rad1 = lat1 * Math.PI / 180.0;
      var rad2 = lat2 * Math.PI / 180.0;
      var a = rad1 - rad2;
      var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
      var r = 6378137;
      var dis=r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));
      var dis1=dis;
      if(dis>1000){
        dis=(dis/1000).toFixed(1)+'km';
      }else{
        dis=parseInt(dis)+'m';
      }
      return {
        dis:dis,
        dis1:dis1
      };
  },
  getList:function(){
      var that=this;
      network.GET({
      url:'list',
      params:{userId:getApp().globalData.userId,keyword:that.data.keyword},
      success:function(res1){
        var lat2,lng2;
        wx.getLocation({
          success:function(res2){        
            lat2=res2.latitude;
            lng2=res2.longitude;
            for(let i=0;i<res1.data.length;i++){
              res1.data[i].dis=that.getDistance(res1.data[i].latitude,res1.data[i].longitude,lat2,lng2).dis;
              res1.data[i].dis1=that.getDistance(res1.data[i].latitude,res1.data[i].longitude,lat2,lng2).dis1;
            }
            that.setData({
              tempList:res1.data
            })
            //显示刷新时对应的分类
            that.tabSwitch(that.data.activedId);
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
  },
  onPullDownRefresh:function(){
    this.onLoad();
    wx.stopPullDownRefresh(); 
  },
  tabSwitch:function(id){
    function disSort(a,b){
      return a.dis1-b.dis1;    
    }
    function moneySort(a,b){
      return b.money-a.money;
    }
    var t=this.data.taskList;    
    if(id==1){
      t.sort(disSort);
    }else if(id==2){
      t.sort(moneySort);
    }else{
      t=this.data.tempList
    }
    this.setData({
      activedId:id
    })
    this.setData({
      taskList:t
    })
  },
  tabClick:function(e){
    this.tabSwitch(e.target.id);
  },
  onShow:function(){
    this.onLoad(); 
  }
})
