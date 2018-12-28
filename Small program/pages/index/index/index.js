var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config.js');
var sliderWidth = 65.75;
const app = getApp();
var that;
//index.js
//获取应用实例
Page({
  data: {
    notime:"https://img.qa.xluob.com/Small%20program/Notime.png",
    boolean1:"",
    boolean2:"",
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    bannerImages:"",
    genreImages:"",
    listItem:"",
    fromItem1:"",
    fromItem2:"",
    init:"",
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
    currentTab:0,
    tabs: ["附近","最新"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    _t:"",
    create_time1:"",
    create_time2:""
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
  ckdetails:function(e){
    var id = e.currentTarget.dataset.usid;
      wx.navigateTo({
        url: '../../details/details/details?id='+id
      })
  },
  //寻人，寻物
  Latelytop:function(e){
    var id = e.currentTarget.dataset.id
    if(id==1){
      wx.navigateTo({
        url:'../peoplelist/peoplelist'
      })
    }
    else if(id==2){
      wx.navigateTo({
        url:'../matterlist/matterlist'
      })
    }
    else if(id==3){
      wx.navigateTo({
        url:'../Searchpeople/Searchpeople'
      })
    }
    else if(id==4){
      wx.navigateTo({
        url:'../Searchmatter/Searchmatter'
      })
    }
    else if(id==5){
      wx.navigateTo({
        url:'../Exhibition/Exhibition'
      })
    }
  },
  //事件处理函数
  bindViewTap: function(options){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  cktype:function(e){
     var stype = (e.currentTarget.dataset.stype)
      wx.navigateTo({
        url: '../../details/ReleaseDetails/ReleaseDetails?id='+stype
      })
  },
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
  //切换点击,请求当前页面页数,让page恢复到1逻辑
  //1.先把刚进来页面展示下标存入init
  //2.点击后先判断第一次跟现在点击是否是同一个
  //3.如果不是同一个page=1
  //4.如果是同一个page不变,把现在的下标存入到init里面
  tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
    // 第一次
    var ckinit = this.data.init
    // 点击之后
    var ckactiveIndex = this.data.activeIndex
    if(ckinit!=ckactiveIndex){
      this.setData({
        page:1,
        init:this.data.activeIndex
      })
    }
    else if(ckinit==ckactiveIndex){
      this.setData({
        page:this.data.page
      })
    }
  },
  onLoad: function (options) {
    console.log(app)
    that = this
    var city = that.data.city
    var page = Number(that.data.page)
    //之前
    var init =  that.data.activeIndex
    that.setData({  
      init:that.data.activeIndex
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
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
            console.log(config)
            //请求轮播图数据
            wx.request({
              url:config.Rotation,
              method:"post",
              data: {
                 "city":city,
                 "_t":app.data._t
              },
              success: function(res) {
                console.log(res)
               var banner = res.data.data.banner
                that.setData({ 
                    bannerImages:banner
                })
              }
            })
            //请求一级分类数据
            wx.request({
              url:config.Firstclassify,
              method:"post",
              data: {
                "id":0,
                "_t":app.data._t
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
              url:config.nearbyOutfit,
              method:"post",
              data: {
                 "city":city,
                  "_t":app.data._t
              },
              success: function(res) {
               var list = res.data.data.list
                 that.setData({ 
                    listItem:list
                  })
                 wx.hideLoading()
              }
            })
            // 附近
            wx.request({
              url:config.nearby,
              method:"post",
              data: {
                  "pn":1,
                  "area":city,
                   "_t":app.data._t
              },
              success: function(res) {
                var from = res.data.data.list
                
                if(from.length==0){
                    that.setData({ 
                      boolean1:0
                    })
                }
                else{
                  var d = []
                  var now = res.data.data.now
                  for(var a=0;a<from.length;a++){
                    var create_time = Number(from[a].create_time)
                    var expire = Number(from[a].expire*86400)
                    var end = Number(create_time+expire)
                    var difference = Math.ceil(Number(end-now)/86400)
                    d.push(difference)
                  }
                  that.setData({
                      create_time1:d,
                      fromItem1:from,
                      boolean1:1
                  })
                }
                wx.hideLoading()
              }
            })
            // 最近
            wx.request({
              url:config.LAtely,
              method:"post",
              data: {
                  "pn":1,
                  "area":city,
                   "_t":app.data._t
              },
              success: function(res) {
                console.log("最近")
                console.log(res)
                var from = res.data.data.list
                if(from.length==0){
                    that.setData({ 
                      boolean2:0
                    })
                }
                else{
                // 倒计时 = 发布时间+天数-现在的时间
                // 现在时间
                var d = []
                var now = res.data.data.now
                for(var a=0;a<from.length;a++){
                  var create_time = Number(from[a].create_time)
                  var expire = Number(from[a].expire*86400)
                  var end = Number(create_time+expire)
                  var difference = Math.ceil(Number(end-now)/86400)
                  d.push(difference)
                }
                  that.setData({ 
                      create_time2:d,
                      fromItem2:from,
                      boolean2:1
                  })
                }
                wx.hideLoading()
              }
            })
            wx.hideLoading()
          }
        });
      }
    })
  },
  // 上拉
  onReachBottom: function(){
    that = this;
    var city = that.data.city
    var page = Number(that.data.page)+ 1
    // 显示加载图标
    wx.showLoading({
      title: '正在加载中'
    })
    setTimeout(function(){
      var activeIndex = that.data.activeIndex
      if(activeIndex == 0){
        // 附近
        wx.request({
          url:config.nearby,
          method:"post",
          data: {
              "pn":page,
              "area":city
          },
          success: function(res) {
            var from = res.data.data.list
            if(from.length==0){
                that.setData({ 
                  boolean1:0
                })
            }
            else{
              for (var i = 0; i < res.data.data.list.length; i++) {
                from.push(res.data.data.list[i]);
              }
              that.setData({ 
                  fromItem1:from,
                  boolean1:1,
                  page:page,
                  init:activeIndex
              })
            }
            wx.hideLoading()
          }
        })
      }
      else if(activeIndex == 1){
        // 最近
        wx.request({
          url:config.LAtely,
          method:"post",
          data: {
              "pn":page,
              "area":city
          },
          success: function(res) {
            var from = res.data.data.list
            if(from.length==0){
                that.setData({ 
                  boolean2:0
                })
                wx.hideLoading()
            }
            else{
              var from = that.data.fromItem2;
              for (var i = 0; i < res.data.data.list.length; i++) {
                from.push(res.data.data.list[i]);
              }
              that.setData({ 
                  fromItem2:from,
                  boolean2:1,
                  page:page
              })
            }
            wx.hideLoading()
          }
        })
      }  
    },1500)
  },
  //下拉
  onPullDownRefresh: function(){
    that = this;
    that.onLoad()
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: false
    })
  }
})
