var amapFile = require('../../../utils/amap-wx.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    fromItem:"",
    followid:true,
    recent_post:"",
    clock:"https://img.qa.xluob.com/Small%20program/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20181214163845.png",
    fexi:"https://img.qa.xluob.com/Small%20program/xxxq-icon_fenxiang%402x.png",
    xinxi:"https://img.qa.xluob.com/Small%20program/x.png",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    jing:"https://img.qa.xluob.com/Small%20program/1.png",
    zan:"https://img.qa.xluob.com/Small%20program/xxxq_icon_dashang%402x.png",
    love:"https://img.qa.xluob.com/Small%20program/jgxq_icon_guanzhu.png",
    phone:"https://img.qa.xluob.com/Small%20program/jgxq_icon_tel.png",
    zhfa:"",
    page:1,
    _t:"",
    id:""
  },
  follow:function(){
    var that = this
    that.setData({
      followid:!that.data.followid
    })
    wx.request({
      url: 'https://qb.xluob.com/mini/favorite/fav',
      method:"post",
        data: {
            "id":that.data.id,
            "_t":app.data._t,
            "type":3
        },
      success: function(res) {
      }
    })
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
            console.log(res)
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
    that.setData({ 
        id:id
    })
    var _t = that.data._t
    wx.showLoading({
        title: '正在加载中'
    })
    setTimeout(function(){
      wx.request({
        url: 'https://qb.xluob.com/mini/passport/center',
        method:"post",
        data: {
            // "id":2740,
            id:id,
            "_t":app.data._t
        },
        success: function(res) {
          var from = res.data.data.info
          var recent_post = res.data.data.recent_post
          var fav = res.data.data.fav
           if(fav == 99){
              that.setData({ 
                  followid:true
              })
           }
           else{
              that.setData({ 
                  followid:false
              })
           }
          that.setData({ 
              fromItem:from,
              recent_post:recent_post
          })
          wx.hideLoading()
        }
      })
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
