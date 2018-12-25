var amapFile = require('../../../utils/amap-wx.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    time1:"",
    infoItem:"",
    loge:""
  },
  UserNameTop:function(){
    var that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        // this.setData({
        //     loge:tempFilePaths
        // })
      }
    })
    
  },
  UserName:function(){
    wx.navigateTo({
      url:'../modify/UserName/UserName'
    })
  },
  sax:function(){
    wx.navigateTo({
      url:'../modify/sax/sax'
    })
  },
  bindDateChange: function(e) {
      this.setData({
          time1: e.detail.value
      })
      wx.request({
        url: 'https://qb.xluob.com/mini/passport/edit',
        method:"post",
        data:{
         "_t":app.data._t,
         "birthday":e.detail.value
        },
        success:function(res){
        }
      })
  },
  phone:function(){
    wx.navigateTo({
      url:'../modify/phone/phone'
    })
  },
  onLoad: function (options) {
    var that = this
    var city = that.setData.city
    var that = this;
       setTimeout(function(){
          wx.request({
            url: 'https://qb.xluob.com/mini/passport/center',
            method:"post",
            data:{
             _t:app.data._t
            },
            success:function(res){
             var info = res.data.data.info
             console.log(info)
             // var question = res.data.data.question
             that.setData({
              infoItem:info
             })
            }
          })
      },1000)
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
