var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config.js');
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    info:"",
    city:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  UserName:function(){
    wx.navigateTo({
      url:'../UserName/UserName'
    })
  },
  comment:function(){
    wx.navigateTo({
      url:'../meComment/meComment'
    })
  },
  follow:function(){
    wx.navigateTo({
      url:'../meFollow/meFollow'
    })
  },
  collection:function(){
    wx.navigateTo({
      url:'../meCollection/meCollection'
    })
  },
  onLoad: function (options) {
    that = this
    setTimeout(function(){
        wx.request({
          url:config.melist,
          method:"post",
          data:{
           _t:app.data._t
          },
          success:function(res){
            console.log(res)
           var info = res.data.data.info;
            that.setData({
              info:info
            })
          }
        })

    },1500)
  },
  getUserInfo: function(e) {
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
