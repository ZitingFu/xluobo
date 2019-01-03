var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config.js');
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    usersItem:"",
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    page:1
  },
  details:function(e){
     var id = e.currentTarget.dataset.id
    wx.navigateTo({
        url: '../../details/ReleaseDetails/ReleaseDetails?id='+id
    })
  },
  onLoad: function (options) {
    that = this;
    wx.request({
      url:config.meFollow,
      method:"post",
      data:{
       "_t":wx.getStorageSync('_t'),
       "pn":1 
      },
      success:function(res){
       console.log(res)
       var users = res.data.data.users
       that.setData({
        usersItem:users
       })
      }
    })
  },
   // 上拉
  onReachBottom: function(){
    var that = this;
    var city = that.data.city
    var page = Number(that.data.page)+ 1
    setTimeout(function(){
        wx.request({
          url:config.meFollow,
          method:"post",
          data:{
           "_t":wx.getStorageSync('_t'),
           "pn":Page 
          },
          success:function(res){
           console.log(res)
           var users = res.data.data.users
           if(users.length<1){
              setTimeout(function(){
                wx.showModal({
                  content:"没有数据了"
                })
                wx.hideLoading()
              },1000)
            }
            var from = that.data.usersItem;
            for (var i = 0; i < users.length; i++) {
              from.push(users[i]);
            }
           that.setData({
            usersItem:from
           })
          }
        })
    },900)
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
