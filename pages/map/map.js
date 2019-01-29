var amapFile = require('../../utils/amap-wx.js');
var that
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
      width:50,
      height:50
    }]
  },
  onLoad: function (options) {
    that = this
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
