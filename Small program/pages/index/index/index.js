var amapFile = require('../../../utils/amap-wx.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    bannerImages:"",
    genreImages:"",
    listItem:"",
    fromItem:"",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    xinxi:"https://img.qa.xluob.com/Small%20program/x.png",
    fexi:"https://img.qa.xluob.com/Small%20program/xxxq-icon_fenxiang%402x.png",
    jing:"https://img.qa.xluob.com/Small%20program/1.png",
    zhfa:"",
    one1:"https://img.qa.xluob.com/Small%20program/recognize_publi%402x.png",
    one2:"https://img.qa.xluob.com/Small%20program/renwu_public.png",
    one3:"https://img.qa.xluob.com/Small%20program/find_public%402x.png",
    one4:"https://img.qa.xluob.com/Small%20program/lookfor_public%402x.png",
    one5:"https://img.qa.xluob.com/Small%20program/goodperson_publicwelfare%402x.png",
    inputShowed: false,
    inputVal:"",
    indicatorColor:"#fda249",
    indicator:"#fff",
    page:1,
    none:false,
    block:true,
    navData:[
      {   
        id:0,
        text: '附近'
      },
      {
        id:1,
        text: '最新'
      },
    ],
    currentTab:0
  },
  all:function(){
    wx.switchTab ({
      url:'../../Release/Release/Release'
    })
  },
  //搜索页面
  search:function(){
    wx.navigateTo({
      url:'../search/search'
    })
  },
  //寻人，寻物
  // Latelytop:function(e){
  //   var id = e.currentTarget.dataset.late
  //   wx.navigateTo({
  //     url:'../details/details?id='+id
  //   })
  // },
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
  onLoad: function (options) {
    var that = this
    var city = that.data.city
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
            var city = data[0].regeocodeData.addressComponent.adcode
            that.setData({
              city:city
            })
            //请求轮播图数据
            wx.request({
              url: 'https://qb.xluob.com/mini/index/home',
              method:"post",
              data: {
                 "city":city
              },
              success: function(res) {
               var banner = res.data.data.banner
                 that.setData({ 
                    bannerImages:banner
                  })
              }
            })
            //请求一级分类数据
            wx.request({
              url: "https://qb.xluob.com/mini/genre/list",
              method:"post",
              data: {
                 "id":0
              },
              success: function(res) {
               var genre = res.data.data.genre
                 that.setData({ 
                    genreImages:genre
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
            // 附近列表
            wx.request({
              url: 'https://qb.xluob.com/mini/index/nearby',
              method:"post",
              data: {
                  "pn":page,
                  "area":city
              },
              success: function(res) {
                var from = res.data.data.list
                 that.setData({ 
                    fromItem:from
                  })
                 wx.hideLoading()
              }
            })
            wx.hideLoading()
          }
        });
      }
    })
  },
  //点击附近最新判断
  listtop:function(e){
    var that = this
    var city = that.data.city
    var page = Number(that.data.page)
    var current = e.currentTarget.dataset.currenttab
    // 附近
    if(current==0){
      wx.request({
        url: 'https://qb.xluob.com/mini/index/nearby',
        method:"post",
        data: {
            "pn":page,
            "area":city
        },
        success: function(res) {
          var from = res.data.data.list
          that.setData({ 
              fromItem:from,
              currentTab:current
          })
          wx.hideLoading()
        }
      })
    }
    //最新
    else if(current==1){
      wx.request({
        url: 'https://qb.xluob.com/mini/index/newquestion',
        method:"post",
        data: {
            "pn":page,
            "area":city
        },
        success: function(res) {
          var from = res.data.data.list
          that.setData({ 
              fromItem:from,
              currentTab:current

          })
          wx.hideLoading()
        }
      })
    }
  },
  // 上拉
  onReachBottom: function(){
    var that = this;
    var city = that.data.city
    var page = Number(that.data.page)
    page = page + 1
    // 显示加载图标
    wx.showLoading({
      title: '正在加载中'
    })
    if(that.data.currentTab==0){
     // 附近列表
      wx.request({
        url: 'https://qb.xluob.com/mini/index/nearby',
        method:"post",
        data: {
            "pn":page,
            "area":city
        },
        success: function(res) {
          var from = that.data.fromItem;
          for (var i = 0; i < res.data.data.list.length; i++) {
            from.push(res.data.data.list[i]);
          }
          that.setData({ 
              fromItem:from,
              page:page
          })
           wx.hideLoading()
        }
      })
    }
    else if(that.data.currentTab==1){
      // 最新列表
       wx.request({
        url: 'https://qb.xluob.com/mini/index/newquestion',
        method:"post",
        data: {
            "pn":page,
            "area":city
        },
        success: function(res) {
          var from = that.data.fromItem;
          for (var i = 0; i < res.data.data.list.length; i++) {
            from.push(res.data.data.list[i]);
          }
          that.setData({ 
              fromItem:from,
              page:page
          })
           wx.hideLoading()
        }
      })
    }
  },
  //下拉
  onPullDownRefresh: function(){
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
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
            var city = data[0].regeocodeData.addressComponent.adcode
            that.setData({
              city:city
            })
            wx.hideLoading()
          }
        });
      }
    })
    //请求轮播图数据
    wx.request({
      url: 'https://qb.xluob.com/mini/index/home',
      method:"post",
      data: {
         "city":city
      },
      success: function(res) {
       var banner = res.data.data.banner
         that.setData({ 
            bannerImages:banner
          })
          wx.hideLoading()
      }
    })
    //请求一级分类数据
    wx.request({
      url: "https://qb.xluob.com/mini/genre/list",
      method:"post",
      data: {
         "id":0
      },
      success: function(res) {
       var genre = res.data.data.genre
         that.setData({ 
            genreImages:genre
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
    // 附近列表
    wx.request({
      url: 'https://qb.xluob.com/mini/index/nearby',
      method:"post",
      data: {
          "pn":page,
          "area":city
      },
      success: function(res) {
        var from = res.data.data.list
         that.setData({ 
            fromItem:from
          })
         wx.hideLoading()
      }
    })
    
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
