var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config.js');
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    code:"",
    info:"",
    city:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (options) {
    that = this
    wx.showLoading({
      title: '正在加载中'
    })
    wx.request({
      url:config.melist,
      method:"post",
      data:{
       "_t":wx.getStorageSync('_t')
      },
      success:function(res){
        console.log(res)
       var info = res.data.data.info;
        that.setData({
          info:info
        })
        wx.hideLoading()
      }
    })
  },
  getUserInfo: function(e) {
    that = this
    app.getUserInfo(e,that,app)
  }
})
