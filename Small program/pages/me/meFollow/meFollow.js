// var amapFile = require('../../../utils/amap-wx.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    _t:"",
    usersItem:"",
    items: [],
    startX: 0, //开始坐标
    startY: 0
  },
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
  del: function (e) {
    console.log(e.currentTarget.dataset.index)
    this.data.items.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      items: this.data.items
    })
  },
  onLoad: function (options) {
      var that = this;
      //common是自己写的公共JS方法，可忽略
      // common.sys_main(app, that, e);
      for (var i = 0; i < 3; i++) {
          this.data.items.push({
          content: i + " 向左滑动删除哦",
          isTouchMove: false //默认隐藏删除
        })
      }
      this.setData({
        items: this.data.items
      });
      setTimeout(function(){
          wx.request({
            url: 'https://qb.xluob.com/mini/favorite/fav3',
            method:"post",
            data:{
             _t:app.data._t,
             pn:1 
            },
            success:function(res){
             console.log(res)
             var users = res.data.data.users
             that.setData({
              usersItem:users
             })
            }
          })
      },1000)
  },
   // 上拉
  onReachBottom: function(){
  
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
