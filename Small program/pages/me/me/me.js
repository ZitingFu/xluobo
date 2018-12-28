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
    _t:"",
    code:"",
    info:"",
    city:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (options) {
    that = this
    setTimeout(function(){
    console.log(app.data._t)
      that.setData({
        code:app.data.code
      })
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
    that = this
    app.getUserInfo(e,that,app)
  }
})
