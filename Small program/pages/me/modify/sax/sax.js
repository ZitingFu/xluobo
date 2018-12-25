var amapFile = require('../../../../utils/amap-wx.js');
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
        url: 'https://qb.xluob.com/mini/passport/edit',
        method:"post",
        data:{
         "_t":app.data._t,
         "sex":e.detail.value
        },
        success:function(res){
         console.log(res)
        }
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
