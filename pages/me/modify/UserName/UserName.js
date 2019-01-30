var amapFile = require('../../../../utils/amap-wx.js');
const config = require('../../../../config.js');
var feedbackApi = require('../../../../showToast.js');
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    name:""
  },
  search:function(e){
    that = this
    var name = e.detail.value;
    this.setData({
      name:name,
    })
  },
  clockn:function(){
    that = this
    wx.request({
        url:config.passportEdit,
        method:"post",
        data:{
         "_t":wx.getStorageSync('_t'),
         "name":that.data.name
        },
        success:function(res){
         if(res.data.flag == 0){
          feedbackApi.showToast({
              title:"您的用户名修改成功了哦~"
          })
          setTimeout(function () {
            wx.navigateTo({
              url:'../../UserName/UserName'
            })
          },1000);
         }
         else{
            feedbackApi.showToast({
              title:"对不起，修改失败~"
            })
         }
        }
      })
  },
  onLoad: function (options) {
    var that = this
    var city = that.setData.city
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
