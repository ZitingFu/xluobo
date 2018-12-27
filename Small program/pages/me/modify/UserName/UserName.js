var amapFile = require('../../../../utils/amap-wx.js');
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
    var that = this
    var name = e.detail.value;
    this.setData({
      name:name,
    })
  },
  clockn:function(){
    var that = this
    console.log(that.data.name)
    wx.request({
        url: 'https://qb.xluob.com/mini/passport/edit',
        method:"post",
        data:{
         "_t":app.data._t,
         "name":that.data.name
        },
        success:function(res){
         if(res.data.flag == 0){
          wx.showModal({
            title:'',
            content:"您的用户名修改成功了哦~",
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
            content:"对不起，修改失败~",
            confirmText:"好哒~",
            cancelText:"取消"
          })
         }
         console.log(res)
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
