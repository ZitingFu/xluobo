var amapFile = require('../../../utils/amap-wx.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    TypeItem:"",
    listItem:"",
    fromItem:"",
    sjx:"https://img.qa.xluob.com/Small%20program/icon_xia_nor.png",
    sjs:"https://img.qa.xluob.com/Small%20program/5.png",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    zhfa:"",
    inputShowed: false,
    inputVal:"",
    indicatorColor:"#fda249",
    indicator:"#fff",
    page:1,
    boolean:false,
    boolean3:false,
    currentTab:0,
    number:0,
    open_num:8,
  },
  //事件处理函数
  bindViewTap: function(options){
    wx.navigateTo({
      url: '../logs/logs'
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
  // 机构类型打开/关闭
  open:function(){
     var that = this
     that.setData({ 
          boolean:!that.data.boolean,
          boolean3:false
      })
     if(that.data.boolean == true){
        that.setData({
           open_num:0
        })
     }
     else{
        that.setData({
             open_num:99
          })
     }
  },
  open3:function(){
    var that = this
     that.setData({ 
          boolean:false,
          boolean3:!that.data.boolean3
      })
      if(that.data.boolean3 == true){
        that.setData({
           open_num:2
        })
     }
     else{
        that.setData({
             open_num:99
          })
     }
  },
  //排序
  Type_top_number:function(e){
      var that = this
      var number = e.currentTarget.dataset.number
      that.setData({ 
          number:number,
          boolean3:false,
      })
  },
  // 点击机构选项发送请求
  Type_top:function(e){
      var that = this
      var current = e.currentTarget.dataset.currenttab
      var type_id = e.currentTarget.dataset.type_id
      console.log(type_id)
      that.setData({ 
          currentTab:current,
          boolean:false
      })
    // 根据场所，出页面
    // wx.request({
    //   url: 'https://qb.xluob.com/mini/organization/index',
    //   method:"post",
    //   data: {
         
    //   },
    //   success: function(res) {
    //    // var site = res.data.data.site
    //    //   that.setData({ 
    //    //      TypeItem:site
    //    //    })
    //       wx.hideLoading()
    //   }
    // })
  },
  onLoad: function (options) {
    var that = this
    var city = that.setData.city
    var page = Number(that.data.page)
     // 引入高德地图
    wx.showLoading({
      title: '正在加载...',
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        var markersData = {
          latitude: latitude,//纬度
          longitude: longitude,//经度
          key: that.data.MapKey
        };
        var addArr = [];
        var myAmapFun = new amapFile.AMapWX({ key: that.data.MapKey});
        myAmapFun.getRegeo({
          success: function (data) {
            var city = data[0].regeocodeData.addressComponent.city
            that.setData({
              city:city
            })
            wx.hideLoading()
          }
        });
      }
    })
    //所有场所
    wx.request({
      url: 'https://qb.xluob.com/mini/site/list',
      method:"post",
      data: {
         
      },
      success: function(res) {
        console.log(res)
       var site = res.data.data.site
         that.setData({ 
            TypeItem:site
          })
          wx.hideLoading()
      }
    })
    //附近机构数据
    wx.request({
      url: 'https://qb.xluob.com/mini/organization/nearbyorg',
      method:"post",
      data: {
         "city":city
      },
      success: function(res) {
       var list = res.data.data.list
         that.setData({ 
            listItem:list
          })
          wx.hideLoading()
      }
    })
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
