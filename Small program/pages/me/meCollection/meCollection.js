// var amapFile = require('../../../utils/amap-wx.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    _t:"",
    jing:"https://img.qa.xluob.com/Small%20program/1.png",
    xinxi:"https://img.qa.xluob.com/Small%20program/x.png",
    items: [],
    startX: 0, //开始坐标
    startY: 0
  },
  onLoad: function (e) {
      var that = this;
      
  },
   // 上拉
  onReachBottom: function(){
    var that = this;
    var city = that.data.city
    var page = Number(that.data.page)+ 1
    // 显示加载图标
    // wx.showLoading({
    //   title: '正在加载中'
    // })
    setTimeout(function(){
        
    },1500)
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
