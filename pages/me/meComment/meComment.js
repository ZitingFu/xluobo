var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config.js');
var feedbackApi=require('../../../showToast.js');
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    activeIndex:0,
    listItem:"",
    page:1,
    startTime:"",
    endTime:""
  },
  bindTouchStart: function(e) {
    this.startTime = e.timeStamp;
  },
  bindTouchEnd: function(e) {
    this.endTime = e.timeStamp;
  },
  details:function(e){
    var id = e.currentTarget.dataset.id
    if(this.endTime - this.startTime < 350) {
      wx.navigateTo({
           url:'../../details/details/details?id='+id
      })
    }
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
                    "_t":wx.getStorageSync('_t'),
                    "id":dd
                  },
                  success:function(res){
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 1000
                    })
                    that.onLoad()
                  }
                })
            }
        }
    });
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url:config.mycomments,
      method:"post",
      data:{
        "_t":wx.getStorageSync('_t'),
        "pn":1 
      },
      success:function(res){
        var list = res.data.data.comments
        if(list.length==0){
            that.setData({ 
               listItem:"",
              activeIndex:1
            })
         }
        else{
            that.setData({
              listItem:list,
              activeIndex:0
            })
        }
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
          "_t":wx.getStorageSync('_t'),
          "pn":page 
        },
        success:function(res){
           var list = res.data.data.comments
           if(list.length<1){
                feedbackApi.showToast({
                  title:"没有数据了.."
                })
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
