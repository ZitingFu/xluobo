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
    _t:"",
    listItem:"",
    page:1
  },
  details:function(e){
     var id = e.currentTarget.dataset.id
    wx.navigateTo({
         url:'../../details/details/details?id='+id
    })
  },
  openConfirm: function () {
    wx.showModal({
          title: '',
          content: '是否确定要删除？',
          confirmText: "确定",
          cancelText: "取消",
          success: function (res) {
              if (res.confirm) {
                  console.log(res.confirm)
              }else{
                  console.log(res.confirm)
              }
          }
    });
  },
  onLoad: function (options) {
    var that = this
    console.log(config)
    setTimeout(function(){
      wx.request({
        url:config.mycomments,
        method:"post",
        data:{
          _t:app.data._t,
          pn:1 
        },
        success:function(res){
           var list = res.data.data.comments
           console.log(list)
            that.setData({
              listItem:list
            })
        }
      })
    },1000)
  },
   // 上拉
  onReachBottom: function(){
    var that = this;
    var city = that.data.city
    var page = Number(that.data.page)+ 1
    wx.showLoading({
      title: '正在加载中'
    })
    setTimeout(function(){
      var page = Number(that.data.page)+ 1
      wx.request({
        url: 'https://qb.xluob.com/mini/passport/mycomments',
        method:"post",
        data:{
          _t:app.data._t,
          pn:page 
        },
        success:function(res){
           var list = res.data.data.comments
           if(list.length<1){
              setTimeout(function(){
                wx.showModal({
                  content:"没有数据了"
                })
                wx.hideLoading()
              },1000)
             }
           var from = that.data.listItem;
           for (var i = 0; i < list.length; i++) {
              from.push(list[i]);
            }
            that.setData({
              listItem:from
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
