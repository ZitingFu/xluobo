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
    name:"点击登录",
    img:"https://img.qa.xluob.com/Small%20program/img_touxiang.png",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showPhone:"绑定手机号码",
    Land:""
  },
  bindphone:function(){
    wx.navigateTo({
      url:'../modify/phone/phone'
    })
  },
  onLoad: function (options) {
    that = this
    wx.showLoading({
      title: '正在加载中'
    })
    if(wx.getStorageSync('_t').length != 0){
      that.setData({
        Land:true
      })
    }
    else{
      that.setData({
        Land:false
      })
    }
    wx.request({
      url:config.melist,
      method:"post",
      data:{
       "_t":wx.getStorageSync('_t')
      },
      success:function(res){
        if(res.data.flag==1){
          wx.hideLoading()
        }
        else{
          var info = res.data.data.info;
          var phone = info.phone
          var showPhone = phone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
         wx.hideLoading()
        }
        that.setData({
          info:info,
          showPhone:showPhone
        })
        wx.hideLoading()
      }
    })
  },
  getUserInfo: function(e) {
    that = this
    app.getUserInfo(e,that,app)
    wx.showLoading({
      title: '正在加载...',
    })
    setTimeout(function(){
      that.onLoad()
      wx.hideLoading() 
    },1500)  
  }
})
