var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config.js');
var that;
var name = wx.getStorageSync('_t')
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
  openConfirm: function (e) {
    that = this
    var dd = e.currentTarget.dataset.dd;
    wx.showModal({
        title: '',
        content: '是否确定要删除？',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
            if (res.confirm) {
                wx.request({
                  url:config.commentsDelete,
                  method:"post",
                  data:{
                    "_t":name,
                    "id":dd
                  },
                  success:function(res){
                    that.onLoad()
                    console.log(res)
                  }
                })
            }
        }
    });
  },
  onLoad: function (options) {
    var that = this
    console.log(app.data._t)
    wx.request({
      url:config.mycomments,
      method:"post",
      data:{
        "_t":name,
        "pn":1 
      },
      success:function(res){
        console.log(res)
         var list = res.data.data.comments
         console.log(list)
          that.setData({
            listItem:list
          })
      }
    })
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
        url:config.mycomments,
        method:"post",
        data:{
          "_t":name,
          "pn":page 
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
            wx.hideLoading()
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
