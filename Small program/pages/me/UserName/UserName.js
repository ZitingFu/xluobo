var amapFile = require('../../../utils/amap-wx.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    time1:""
  },
  UserNameTop:function(){
    wx.navigateTo({
      url:'../modify/UserNameTop/UserNameTop'
    })
  },
  UserName:function(){
    wx.navigateTo({
      url:'../modify/UserName/UserName'
    })
  },
  sax:function(){
    wx.navigateTo({
      url:'../modify/sax/sax'
    })
  },
  bindDateChange: function(e) {
      console.log(e.detail.value)
      this.setData({
          time1: e.detail.value
      })
  },
  phone:function(){
    wx.navigateTo({
      url:'../modify/phone/phone'
    })
  },
  onLoad: function (options) {
    var that = this
    var city = that.setData.city
     // 引入高德地图
    wx.showLoading({
      title: '正在加载...',
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        var markersData = {
          latitude: latitude,//纬度
          longitude: longitude,//经度
          key: that.data.MapKey
        };
        var addArr = [];
        var myAmapFun = new amapFile.AMapWX({ key: that.data.MapKey});
        myAmapFun.getRegeo({
          success: function (data) {
            var city = data[0].regeocodeData.addressComponent.city
            that.setData({
              city:city
            })
            wx.hideLoading()
          }
        });
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
