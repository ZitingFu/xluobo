var amapFile = require('../../utils/amap-wx.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    la:"",
    lo:"",
    markers: [{
      iconPath:"../../images/option.png",
      id: 0,
      latitude: 39.956403,
      longitude: 116.837359,
      width:22,
      height:20
    }]
  },
  onLoad: function (options) {
    var that = this
    var latitude = options.latitude
    var longitude = options.longitude
    that.data.markers[0].latitude = latitude
    that.data.markers[0].longitude = longitude
    that.setData({ 
        la:latitude,
        lo:longitude
    })
  }
})
