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
    usersItem:"",
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    page:1
  },
  details:function(e){
     var id = e.currentTarget.dataset.id
    wx.navigateTo({
        url: '../../details/ReleaseDetails/ReleaseDetails?id='+id
    })
  },
   //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
    if (v.isTouchMove)//只操作为true的
    v.isTouchMove = false;
    })
    this.setData({
    startX: e.changedTouches[0].clientX,
    startY: e.changedTouches[0].clientY,
    items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
      var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
      that.data.items.forEach(function (v, i) {
          v.isTouchMove = false
          //滑动超过30度角 return
          if (Math.abs(angle) > 30) return;
          if (i == index) {
          if (touchMoveX > startX) //右滑
          v.isTouchMove = false
          else //左滑
          v.isTouchMove = true
          }
      })
      //更新数据
      that.setData({
      items: that.data.items
      })
  },
  angle: function (start, end) {
    var _X = end.X - start.X,
    _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  // 删除
  del: function (e) {
    that = this 
    that.data.items.splice(e.currentTarget.dataset.index, 1)
   var idd = that.data.usersItem[e.currentTarget.dataset.index].id
    wx.request({
        url:config.follow,
        method:"post",
          data: {
              "id":idd,
              "_t":wx.getStorageSync('_t'),
              "type":3
          },
        success: function(res) {
          wx.showToast({
            title: '取消成功',
            icon: '',
            duration: 1000
          })
        }
    })
    that.setData({
      items: that.data.items
    })
  },
  onLoad: function (options) {
    that = this;
    wx.request({
      url:config.meFollow,
      method:"post",
      data:{
       "_t":wx.getStorageSync('_t'),
       "pn":1 
      },
      success:function(res){
       var users = res.data.data.users
        for (var i = 0; i < users.length; i++) {
            that.data.items.push({
            content: i + " 向左滑动删除哦",
            isTouchMove: false //默认隐藏删除
          })
        }
        if(users.length==0){
            that.setData({ 
              usersItem:"",
              activeIndex:1
            })
         }
        else{
            that.setData({
              usersItem:users,
              activeIndex:0,
              items:users
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
    setTimeout(function(){
      wx.request({
        url:config.meFollow,
        method:"post",
        data:{
         "_t":wx.getStorageSync('_t'),
         "pn":Page 
        },
        success:function(res){
         var users = res.data.data.users
          if(users.length<1){
            that.setData({ 
              usersItem:"",
              activeIndex:1
            })
          }
          else{
            that.setData({
              usersItem:users,
              activeIndex:0,
              items:users
            })
          }
          var from = that.data.usersItem;
          for (var i = 0; i < users.length; i++) {
            from.push(users[i]);
          }
         that.setData({
          usersItem:from
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
