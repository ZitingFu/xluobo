var amapFile = require('../../../../utils/amap-wx.js');
const config = require('../../../../config.js');
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    phone:"https://img.qa.xluob.com/logo/icon_plan.png",
    s:"https://img.qa.xluob.com/logo/icon_duanxin.png",
    name1:"",
    name2:"",
    bind:"获取验证码"
  },
  search1:function(e){
    var that = this
    var name1 = e.detail.value;
    this.setData({
      name1:name1,
    })
  },
  sub:function(){
    var that = this
    wx.request({
      url:config.editphone,
      method:"post",
      data: {
        "_t":wx.getStorageSync('_t'),
        "phone":that.data.name1,
        "code":that.data.name2
      },
      success: function(res) {
        if(res.data.flag == 0){
          wx.showModal({
            title:'',
            content:"修改成功",
            confirmText:"好哒~",
            cancelText:"取消",
            success: function (res) {
                if (res.confirm) {
                    wx.navigateTo({
                      url:'../../UserName/UserName'
                    })
                }
                else{
                    wx.navigateTo({
                      url:'../../UserName/UserName'
                    })
                }
            }
          })
        }
        else{
          wx.showModal({
            title:'',
            content:res.data.data.msg,
            confirmText:"好哒~",
            cancelText:"取消"
          })
        }
      }
    })
  },
  clickn:function(){
    var that = this
    var phe = that.data.name1
    if(!(/^1[34578]\d{9}$/.test(phe))){ 
        wx.showModal({
          title: '',
          content:'手机号码有误,请慎重!',
          confirmText:"确定",
          cancelText:"取消"
      })
    }
    else{
      wx.request({
          url:config.codephone,
          method:"post",
          data: {
              "_t":wx.getStorageSync('_t'),
              "phone":that.data.name1,
              "type":0
          },
          success: function(res) {
            if(res.data.flag == 0){
              var num = 108
              var set = setInterval(function(){
                          num = num-1
                          that.setData({
                            bind:"还剩"+num+"秒"
                          })
                          if(num<2){
                            clearInterval(set)
                            that.setData({
                              bind:"重新开始"
                            })
                          }
                        },1000)
            }
            else{
              wx.showModal({
                  title: '',
                  content:res.data.data.msg,
                  confirmText:"知道啦",
                  cancelText:"取消"
              })
            }
          }
      })
    }
  },
  search2:function(e){
    var that = this
    var name2 = e.detail.value;
    this.setData({
      name2:name2,
    })
  },
  onLoad: function (options) {
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
