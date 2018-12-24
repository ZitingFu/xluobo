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
  },
  openConfirm: function () {
    wx.showModal({
          title: '',
          content: '是否确定要删除？',
          confirmText: "确定",
          cancelText: "取消",
          success: function (res) {
              console.log(res);
              if (res.confirm) {
                  console.log(res.confirm)
              }else{
                  console.log(res.confirm)
              }
          }
    });
  },
  onLoad: function (options) {
    // setTimeout(function(){
       
    // },1500)
    // wx.hideLoading()
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
