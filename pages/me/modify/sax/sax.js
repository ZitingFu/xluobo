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
    radioItems: [
        {name: '男', value: '0'},
        {name: '女', value: '1'}
    ]
  },
  radioChange: function (e) {
      var radioItems = this.data.radioItems;
      for (var i = 0, len = radioItems.length; i < len; ++i) {
          radioItems[i].checked = radioItems[i].value == e.detail.value;
      }
      this.setData({
        radioItems: radioItems
      });
      wx.request({
        url:config.passportEdit,
        method:"post",
        data:{
         "_t":wx.getStorageSync('_t'),
         "sex":e.detail.value
        },
        success:function(res){
         if(res.data.flag == 0){
           feedbackApi.showToast({
              title:"您的用户名修改成功了哦~"
          })
          setTimeout(function () {
            that.onUnload()
              wx.navigateBack({
                delta: 1
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
  onUnload: function () {
  },
  onLoad: function (options) {
    that = this
    var city = that.setData.city
    wx.request({
      url:config.melist,
      method:"post",
      data:{
       "_t":wx.getStorageSync('_t')
      },
      success:function(res){
       var sex = res.data.data.info.sex
       if(sex==0){
         that.setData({
              radioItems: [
                  {name: '男', value: '0',checked: true},
                  {name: '女', value: '1' }
              ]
         })
       }
       else{
         that.setData({
              radioItems: [
                  {name: '男', value: '0'},
                  {name: '女', value: '1',checked: true}
              ]
         })
       }
       
      }
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
