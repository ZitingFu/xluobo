var amapFile = require('../../../utils/amap-wx.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    fromItem:"",
    recent_post:"",
    clock:"https://img.qa.xluob.com/Small%20program/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20181214163845.png",
    fexi:"https://img.qa.xluob.com/Small%20program/xxxq-icon_fenxiang%402x.png",
    xinxi:"https://img.qa.xluob.com/Small%20program/x.png",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    jing:"https://img.qa.xluob.com/Small%20program/1.png",
    zan:"https://img.qa.xluob.com/Small%20program/xxxq_icon_dashang%402x.png",
    zhfa:"",
    page:1,
    _t:""
  },
  //图片放大
  imgtop:function(e){
    var imgList = e.currentTarget.dataset.list;//获取data-list
    var index = e.currentTarget.dataset.index
    var arry = []
    for(var a=0;a<imgList.length;a++){
      var imgList2 = imgList[a].s
      arry.push(imgList2)
    }
      wx.previewImage({
        current:arry[index].s,
        urls:arry
       })
  },
  onLoad: function (options) {
    wx.login({
      success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          wx.request({
            url: 'https://qb.xluob.com/mini/passport/auth', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
              code: res.code
            },
          success: function (res) {
              that.setData({  
                _t:res.data.data._t
              })
            }
          })
        }
      }
    })
    var that = this
    var city = that.setData.city
    var page = Number(that.data.page)
    var id = options.id
    var _t = that.data._t
    console.log(that.data)
      wx.request({
        url: 'https://qb.xluob.com/mini/passport/center',
        method:"post",
        data: {
            "id":id,
            "_t":_t
        },
        success: function(res) {
          var from = res.data.data.info
          var recent_post = res.data.data.recent_post
          that.setData({ 
              fromItem:from,
              recent_post:recent_post
          })
          wx.hideLoading()
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
