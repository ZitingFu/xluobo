var amapFile = require('../../../utils/amap-wx.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    bannerImages:"",
    genreImages:"",
    listItem:"",
    fromItem:"",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    xinxi:"https://img.qa.xluob.com/Small%20program/x.png",
    fexi:"https://img.qa.xluob.com/Small%20program/xxxq-icon_fenxiang%402x.png",
    jing:"https://img.qa.xluob.com/Small%20program/1.png",
    zhfa:"",
    inputShowed: false,
    inputVal:"",
    indicatorColor:"#fda249",
    indicator:"#fff",
    page:1,
    none:false,
    block:true
  },
  //事件处理函数
  bindViewTap: function(options){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //图片放大
  imgtop:function(e){
    var imgList = e.currentTarget.dataset.list;//获取data-list
    var index = e.currentTarget.dataset.index
    var arry = []
    for(var a=0;a<imgList.length;a++){
      var imgList2 = imgList[a].s
      arry.push(imgList2)
    }
      wx.previewImage({
        current:arry[index].s,
        urls:arry
       })
  },
  onLoad: function (options) {
    var that = this
    var city = that.setData.city
    var page = Number(that.data.page)
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
    //附近机构数据
    wx.request({
      url: 'https://qb.xluob.com/mini/organization/nearbyorg',
      method:"post",
      data: {
         "city":city
      },
      success: function(res) {
        console.log(res.data.data.list.avatar)
       var list = res.data.data.list
         that.setData({ 
            listItem:list
          })
          wx.hideLoading()
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
