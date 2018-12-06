var amapFile = require('../../utils/amap-wx.js');
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
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    one1:"https://img.qa.xluob.com/Small%20program/recognize_publi%402x.png",
    one2:"https://img.qa.xluob.com/Small%20program/renwu_public.png",
    one3:"https://img.qa.xluob.com/Small%20program/find_public%402x.png",
    one4:"https://img.qa.xluob.com/Small%20program/lookfor_public%402x.png",
    one5:"https://img.qa.xluob.com/Small%20program/goodperson_publicwelfare%402x.png",
    // genreImagesIMG:[
    //   {
    //     id:"1",
    //     img:"https://qa-xluob.oss-cn-beijing.aliyuncs.com/Small%20program/recognize_publi%402x.png"
    //   },
    //   {
    //     id:"2",
    //     img:"https://qa-xluob.oss-cn-beijing.aliyuncs.com/Small%20program/renwu_public.png"
    //   },
    //   {
    //     id:"3",
    //     img:"https://qa-xluob.oss-cn-beijing.aliyuncs.com/Small%20program/find_public%402x.png"
    //   },
    //   {
    //     id:"4",
    //     img:"https://qa-xluob.oss-cn-beijing.aliyuncs.com/Small%20program/lookfor_public%402x.png"
    //   },
    //   {
    //     id:"5",
    //     img:"https://qa-xluob.oss-cn-beijing.aliyuncs.com/Small%20program/goodperson_publicwelfare%402x.png"
    //   }
    // ],
    inputShowed: false,
    inputVal: "",
    indicatorColor:"#fda249",
    indicator:"#fff"


  },
  //事件处理函数
  bindViewTap: function(options){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function (options) {
    var that = this
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
    var city = that.setData.city
    //请求轮播图数据
    wx.request({
      url: 'https://qb.xluob.com/mini/index/home',
      method:"post",
      data: {
         "city":city
      },
      success: function(res) {
       var banner = res.data.data.banner
         that.setData({ 
            bannerImages:banner
          })
      }
    })
    //请求一级分类数据
    wx.request({
      url: "https://qb.xluob.com/mini/genre/list",
      method:"post",
      data: {
         "id":0
      },
      success: function(res) {
       var genre = res.data.data.genre
         that.setData({ 
            genreImages:genre
          })
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
      }
    })


    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
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
